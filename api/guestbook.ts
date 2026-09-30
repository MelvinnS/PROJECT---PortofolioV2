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
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    jsonResponse(res, 200, { ok: true });
    return;
  }

  const clientIp = getClientIp(req);

  // GET: Ambil semua komentar (terbaru di atas)
  if (req.method === 'GET') {
    try {
      const sql = getDatabaseConnection();
      await ensureGuestbookTable(sql);

      const rows = await sql`
        SELECT id, name, message, created_at, reply_message, reply_at
        FROM guestbook
        ORDER BY created_at DESC
        LIMIT 100;
      `;

      jsonResponse(res, 200, { success: true, data: rows });
    } catch (err: any) {
      console.error('Guestbook fetch error:', err);
      jsonResponse(res, 500, { success: false, error: err.message || 'Failed to fetch comments' });
    }
    return;
  }

  // POST: Kirim komentar baru
  if (req.method === 'POST') {
    // Rate limit check: 5 komentar per menit per IP
    if (!checkRateLimit(clientIp, 5, 60 * 1000)) {
      jsonResponse(res, 429, {
        success: false,
        error: 'Terlalu banyak permintaan. Silakan tunggu 1 menit sebelum mengirim pesan lagi.',
      });
      return;
    }

    try {
      const body = await parseJsonBody(req);
      const rawName = String(body.name || '').trim();
      const rawMessage = String(body.message || '').trim();

      // Validasi input
      if (!rawName || !rawMessage) {
        jsonResponse(res, 400, { success: false, error: 'Nama dan pesan wajib diisi.' });
        return;
      }

      if (rawName.length > 50) {
        jsonResponse(res, 400, { success: false, error: 'Nama maksimal 50 karakter.' });
        return;
      }

      if (rawMessage.length > 500) {
        jsonResponse(res, 400, { success: false, error: 'Pesan maksimal 500 karakter.' });
        return;
      }

      // Sanitasi input (hapus bracket HTML, cegah injeksi)
      const name = sanitizeText(rawName);
      const message = sanitizeText(rawMessage);

      const sql = getDatabaseConnection();
      await ensureGuestbookTable(sql);

      const [newEntry] = await sql`
        INSERT INTO guestbook (name, message)
        VALUES (${name}, ${message})
        RETURNING id, name, message, created_at, reply_message, reply_at;
      `;

      jsonResponse(res, 201, { success: true, data: newEntry });
    } catch (err: any) {
      console.error('Guestbook post error:', err);
      jsonResponse(res, 500, { success: false, error: err.message || 'Failed to submit comment' });
    }
    return;
  }

  jsonResponse(res, 405, { success: false, error: 'Method not allowed' });
}
