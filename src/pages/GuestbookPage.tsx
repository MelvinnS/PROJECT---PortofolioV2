import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  MessageSquare,
  Send,
  CornerDownRight,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Unlock,
  Sparkles,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { usePageTransition } from '../components/layout/PageTransition';
import './GuestbookPage.css';

interface CommentItem {
  id: number;
  name: string;
  message: string;
  created_at: string;
  reply_message: string | null;
  reply_at: string | null;
}

export const GuestbookPage: React.FC = () => {
  const { go } = usePageTransition();
  const [searchParams] = useSearchParams();
  const isAdminParam = searchParams.get('admin') === '1';

  // Form states
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formAlert, setFormAlert] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  // List states
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Admin states
  const [adminMode, setAdminMode] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [replyingId, setReplyingId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);

  // Format date helper
  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  // Fetch comments
  const fetchComments = async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    try {
      const res = await fetch('/api/guestbook');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setComments(data.data);
      } else {
        console.warn('API returned fallback or error:', data);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchComments();
  }, []);

  // Submit comment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormAlert(null);

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedMessage) {
      setFormAlert({ type: 'error', text: 'Nama dan pesan tidak boleh kosong.' });
      return;
    }

    if (trimmedName.length > 50) {
      setFormAlert({ type: 'error', text: 'Nama maksimal 50 karakter.' });
      return;
    }

    if (trimmedMessage.length > 500) {
      setFormAlert({ type: 'error', text: 'Pesan maksimal 500 karakter.' });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmedName, message: trimmedMessage }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setFormAlert({ type: 'success', text: 'Terima kasih! Pesan kamu berhasil dikirim.' });
        setName('');
        setMessage('');
        // Masukkan komentar baru di paling atas
        if (data.data) {
          setComments((prev) => [data.data, ...prev]);
        } else {
          fetchComments();
        }
      } else {
        setFormAlert({
          type: 'error',
          text: data.error || 'Gagal mengirim pesan. Silakan coba lagi.',
        });
      }
    } catch (err) {
      setFormAlert({
        type: 'error',
        text: 'Koneksi gagal. Jika sedang di lokal, jalankan dengan `vercel dev`.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Submit Admin Reply
  const handleReplySubmit = async (commentId: number) => {
    if (!replyText.trim()) return;

    setSubmittingReply(true);
    try {
      const res = await fetch('/api/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: commentId,
          reply: replyText.trim(),
          password: adminPassword,
        }),
      });
      const data = await res.json();

      if (res.ok && data.success && data.data) {
        setComments((prev) =>
          prev.map((c) => (c.id === commentId ? { ...c, ...data.data } : c))
        );
        setReplyingId(null);
        setReplyText('');
        alert('Balasan berhasil disimpan!');
      } else {
        alert(data.error || 'Gagal mengirim balasan. Periksa password admin.');
      }
    } catch (err) {
      alert('Gagal menghubungi server balasan.');
    } finally {
      setSubmittingReply(false);
    }
  };

  return (
    <div className="gb-page">
      <div className="gb-inner">

        {/* ── HEADER ── */}
        <header className="gb-header">
          <span className="gb-eyebrow">say hello &amp; leave a note ◜</span>
          <h1 className="gb-title">GUESTBOOK</h1>
          <p className="gb-desc">
            Tinggalkan pesan, salam, atau kesan santai di buku tamu digital ini. Semua komentar ditampilkan secara publik dengan balasan langsung dari saya.
          </p>

          {/* Admin Switch Bar - Only rendered if ?admin=1 in URL */}
          {isAdminParam && (
            <div className="gb-admin-toggle-bar">
              <div className="gb-admin-badge">
                <ShieldCheck className="w-4 h-4 text-[#8B5CF6]" />
                <span>Owner Space</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                {adminMode ? (
                  <>
                    <input
                      type="password"
                      placeholder="Enter Admin Password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      style={{
                        padding: '0.35rem 0.75rem',
                        border: '1.5px solid #141414',
                        borderRadius: '8px',
                        fontSize: '0.78rem',
                        fontFamily: 'inherit',
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (adminPassword.trim()) {
                          setAdminAuthenticated(true);
                          alert('Mode admin aktif! Tombol "Balas" kini tersedia di tiap komentar.');
                        } else {
                          alert('Masukkan password admin terlebih dahulu.');
                        }
                      }}
                      style={{
                        background: adminAuthenticated ? '#00C274' : '#141414',
                        color: '#fff',
                        border: '1.5px solid #141414',
                        borderRadius: '8px',
                        padding: '0.35rem 0.8rem',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                      }}
                    >
                      {adminAuthenticated ? 'Active' : 'Unlock'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAdminMode(false);
                        setAdminAuthenticated(false);
                        setAdminPassword('');
                      }}
                      style={{
                        background: '#fff',
                        border: '1.5px solid #141414',
                        borderRadius: '8px',
                        padding: '0.35rem 0.7rem',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                      }}
                    >
                      Exit
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setAdminMode(true)}
                    style={{
                      background: '#f3f4f6',
                      border: '1.5px solid #141414',
                      borderRadius: '8px',
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <Lock className="w-3.5 h-3.5" /> Admin Login
                  </button>
                )}
              </div>
            </div>
          )}
        </header>

        {/* ── FORM CARD ── */}
        <section className="gb-form-card">
          <div className="gb-tape" />

          <form onSubmit={handleSubmit}>
            <div className="gb-form-group">
              <label htmlFor="gb-name" className="gb-label">
                <span>Nama Lengkap / Panggilan</span>
                <span className="gb-counter">{name.length}/50</span>
              </label>
              <input
                id="gb-name"
                type="text"
                className="gb-input"
                placeholder="mis. Alex Pratama"
                maxLength={50}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={submitting}
                required
              />
            </div>

            <div className="gb-form-group">
              <label htmlFor="gb-message" className="gb-label">
                <span>Pesan Kamu</span>
                <span className="gb-counter">{message.length}/500</span>
              </label>
              <textarea
                id="gb-message"
                className="gb-textarea"
                placeholder="Tulis pesan, kesan, atau kritik membangun..."
                maxLength={500}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={submitting}
                required
              />
            </div>

            {formAlert && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1rem',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  marginBottom: '1.2rem',
                  background: formAlert.type === 'error' ? '#FFE5E5' : '#E6F9F0',
                  color: formAlert.type === 'error' ? '#D92D20' : '#027A48',
                  border: `1.5px solid ${formAlert.type === 'error' ? '#D92D20' : '#027A48'}`,
                }}
              >
                {formAlert.type === 'error' ? (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                )}
                <span>{formAlert.text}</span>
              </div>
            )}

            <button
              type="submit"
              className="gb-submit-btn"
              disabled={submitting || !name.trim() || !message.trim()}
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Mengirim...' : 'Kirim Pesan'}</span>
            </button>
          </form>
        </section>

        {/* ── COMMENTS LIST SECTION ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>
            Pesan Masuk ({comments.length})
          </h2>

          <button
            type="button"
            onClick={() => fetchComments(true)}
            disabled={refreshing}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: '#ffffff',
              border: '1.5px solid #141414',
              boxShadow: '2px 2px 0 #141414',
              borderRadius: '999px',
              padding: '0.35rem 0.85rem',
              fontFamily: 'Space Grotesk, monospace',
              fontSize: '0.75rem',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: '#666', fontFamily: 'Space Grotesk, monospace' }}>
            Memuat buku tamu...
          </div>
        ) : comments.length === 0 ? (
          <div
            style={{
              background: '#ffffff',
              border: '2px dashed #cccccc',
              borderRadius: '16px',
              padding: '3rem 2rem',
              textAlign: 'center',
            }}
          >
            <MessageSquare className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#666' }}>
              Belum ada pesan. Jadilah yang pertama mengisi guestbook ini!
            </p>
          </div>
        ) : (
          <div className="gb-list-section">
            {comments.map((comment) => (
              <div key={comment.id} className="gb-comment-card">
                <div className="gb-comment-header">
                  <div className="gb-comment-author">
                    <span className="gb-avatar-chip">
                      {comment.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="gb-author-name">{comment.name}</span>
                  </div>
                  <span className="gb-comment-date">{formatDate(comment.created_at)}</span>
                </div>

                {/* Body Message - Rendered as pure text, NEVER as HTML */}
                <div className="gb-comment-body">{comment.message}</div>

                {/* Balasan Pemilik (jika ada) */}
                {comment.reply_message && (
                  <div className="gb-reply-box">
                    <div className="gb-reply-head">
                      <span className="gb-reply-badge">
                        <Sparkles className="w-3 h-3" /> Melvin Andrea (Owner)
                      </span>
                      {comment.reply_at && (
                        <span style={{ fontSize: '0.68rem', color: '#666', fontFamily: 'Space Grotesk, monospace' }}>
                          {formatDate(comment.reply_at)}
                        </span>
                      )}
                    </div>
                    {/* Rendered as pure text */}
                    <p className="gb-reply-body">{comment.reply_message}</p>
                  </div>
                )}

                {/* Admin Mode: Balas Button & Form */}
                {isAdminParam && adminAuthenticated && (
                  <div className="gb-admin-reply-form">
                    {replyingId === comment.id ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <textarea
                          placeholder="Tulis balasan pemilik..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          maxLength={500}
                          style={{
                            width: '100%',
                            padding: '0.6rem 0.8rem',
                            border: '1.5px solid #141414',
                            borderRadius: '8px',
                            fontSize: '0.88rem',
                            fontFamily: 'inherit',
                            minHeight: '80px',
                            boxSizing: 'border-box',
                          }}
                        />
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            type="button"
                            onClick={() => handleReplySubmit(comment.id)}
                            disabled={submittingReply || !replyText.trim()}
                            style={{
                              background: '#141414',
                              color: '#fff',
                              border: '1.5px solid #141414',
                              borderRadius: '6px',
                              padding: '0.35rem 0.9rem',
                              fontSize: '0.78rem',
                              fontWeight: 800,
                              cursor: 'pointer',
                            }}
                          >
                            {submittingReply ? 'Menyimpan...' : 'Kirim Balasan'}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setReplyingId(null);
                              setReplyText('');
                            }}
                            style={{
                              background: '#fff',
                              border: '1.5px solid #141414',
                              borderRadius: '6px',
                              padding: '0.35rem 0.7rem',
                              fontSize: '0.78rem',
                              cursor: 'pointer',
                            }}
                          >
                            Batal
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setReplyingId(comment.id);
                          setReplyText(comment.reply_message || '');
                        }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          background: '#f3f4f6',
                          border: '1.5px solid #141414',
                          borderRadius: '6px',
                          padding: '0.3rem 0.75rem',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                        }}
                      >
                        <CornerDownRight className="w-3.5 h-3.5" />
                        <span>{comment.reply_message ? 'Edit Balasan' : 'Balas Komentar'}</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default GuestbookPage;
