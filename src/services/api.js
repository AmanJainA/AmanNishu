// Talks to the PHP endpoints in /api. With no VITE_API_URL it falls back to a
// localStorage "demo mode" in development so the UI can be tried without a server.
const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
const DEMO = !API_URL && import.meta.env.DEV;
const KEY = 'wedding-demo-entries';

export const PHONE_PATTERN = /^[6789][0-9]{9}$/;

const readDemo = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
const writeDemo = (d) => localStorage.setItem(KEY, JSON.stringify(d));

async function post(endpoint, body) {
  if (!API_URL) throw new Error('The server is not configured. Please contact the hosts.');
  let res;
  try {
    res = await fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error('Could not reach the server. Please check your connection and try again.');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || 'Something went wrong. Please try again.');
    err.status = res.status;
    throw err;
  }
  return data;
}

/** Returns the saved entry for a phone number, or null when none exists. */
export async function lookupEntry(contactno) {
  if (DEMO) return readDemo()[contactno] || null;
  const data = await post('lookup.php', { contactno });
  return data.entry || null;
}

/** Saves a new entry. Throws an error with status 409 if already submitted. */
export async function submitEntry(entry) {
  if (DEMO) {
    const all = readDemo();
    if (all[entry.contactno]) { const e = new Error('Already Submitted'); e.status = 409; throw e; }
    all[entry.contactno] = entry; writeDemo(all);
    return { message: 'Submitted Successfully' };
  }
  return post('submit.php', entry);
}

export async function updateEntry(entry) {
  if (DEMO) {
    const all = readDemo();
    all[entry.contactno] = { ...all[entry.contactno], ...entry }; writeDemo(all);
    return { message: 'Updated Successfully' };
  }
  return post('update.php', entry);
}
