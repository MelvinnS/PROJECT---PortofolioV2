import type { IncomingMessage, ServerResponse } from 'http';
import {
  getDatabaseConnection,
  ensureGuestbookTable,
  sanitizeText,
  checkRateLimit,
  getClientIp,
  jsonResponse,
  parseJsonBody,
} from './_db.js';

export default async function handler(req: IncomingMessage & { method?: string; url?: string }, res: ServerResponse) {
  if (req.method === 'OPTIONS') {
    jsonResponse(res, 200, { ok: true });
    return;
  }

  if (req.method !== 'POST') {
    jsonResponse(res, 405, { success: false, error: 'Method not allowed' });
    return;
  }

  const clientIp = getClientIp(req);
  // Rate limit for admin replies: 20 per minute
  if (!checkRateLimit(clientIp, 20, 60 * 1000)) {
    jsonResponse(res, 429, {
      success: false,
      error: 'Terlalu banyak percobaan. Silakan coba lagi nanti.',
    });
    return;
  }

  try {
    const body = await parseJsonBody(req);
    const { id, reply, password } = body;

    const serverAdminPassword = process.env.ADMIN_PASSWORD;
    if (!serverAdminPassword) {
      jsonResponse(res, 500, {
        success: false,
        error: 'ADMIN_PASSWORD environment variable belum dikonfigurasi di server.',
      });
      return;
    }

    if (!password || String(password) !== serverAdminPassword) {
      jsonResponse(res, 401, {
        success: false,
        error: 'Password admin tidak valid.',
      });
      return;
    }

    if (!id || typeof id !== 'number') {
      jsonResponse(res, 400, {
        success: false,
        error: 'ID komentar tidak valid.',
      });
      return;
    }

    const rawReply = String(reply || '').trim();
    if (!rawReply) {
      jsonResponse(res, 400, {
        success: false,
        error: 'Pesan balasan wajib diisi.',
      });
      return;
    }

    if (rawReply.length > 500) {
      jsonResponse(res, 400, {
        success: false,
        error: 'Balasan maksimal 500 karakter.',
      });
      return;
    }

    const cleanReply = sanitizeText(rawReply);
    const sql = getDatabaseConnection();
    await ensureGuestbookTable(sql);

    const [updated] = await sql`
      UPDATE guestbook
      SET reply_message = ${cleanReply}, reply_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING id, name, message, created_at, reply_message, reply_at;
    `;

    if (!updated) {
      jsonResponse(res, 404, {
        success: false,
        error: 'Komentar tidak ditemukan.',
      });
      return;
    }

    jsonResponse(res, 200, {
      success: true,
      data: updated,
    });
  } catch (err: any) {
    console.error('Guestbook reply error:', err);
    jsonResponse(res, 500, {
      success: false,
      error: err.message || 'Gagal membalas komentar.',
    });
  }
}
