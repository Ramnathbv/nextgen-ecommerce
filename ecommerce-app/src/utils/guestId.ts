const STORAGE_KEY = 'guest_id';

function generateFallbackId(): string {
  const randomPart = Math.random().toString(36).slice(2, 10);
  const timePart = Date.now().toString(36);
  return `${timePart}-${randomPart}`;
}

export function getOrCreateGuestId(): string {
  // Try localStorage first
  try {
    const existing = window.localStorage.getItem(STORAGE_KEY);
    if (existing) return existing;

    const id = (globalThis.crypto as any)?.randomUUID?.() ?? generateFallbackId();
    window.localStorage.setItem(STORAGE_KEY, id);
    return id;
  } catch {
    // Fallback to cookie when localStorage is unavailable (e.g., privacy mode)
    const match = document.cookie.match(/(?:^|; )guest_id=([^;]+)/);
    if (match?.[1]) return decodeURIComponent(match[1]);

    const id = generateFallbackId();
    const oneYear = 60 * 60 * 24 * 365;
    document.cookie = `guest_id=${encodeURIComponent(id)}; path=/; SameSite=Lax; max-age=${oneYear}`;
    return id;
  }
}

export function clearGuestId(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  // Clear cookie as well
  document.cookie = `guest_id=; path=/; SameSite=Lax; max-age=0`;
}
