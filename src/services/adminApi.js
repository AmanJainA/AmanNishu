import { ADMIN_ENDPOINT, SUPABASE_ANON_KEY } from './config';

const TOKEN_KEY = 'amanishu-admin-session';

export const getAdminToken = () => sessionStorage.getItem(TOKEN_KEY);
export const setAdminToken = (token) => token ? sessionStorage.setItem(TOKEN_KEY, token) : sessionStorage.removeItem(TOKEN_KEY);

export async function adminRequest(action, payload = {}, auth = true) {
  const headers = { 'Content-Type': 'application/json', apikey: SUPABASE_ANON_KEY };
  if (auth && getAdminToken()) headers.Authorization = `Bearer ${getAdminToken()}`;
  const response = await fetch(ADMIN_ENDPOINT, { method: 'POST', headers, body: JSON.stringify({ action, ...payload }) });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 401 && auth) setAdminToken(null);
    throw new Error(data.message || 'Request failed. Please try again.');
  }
  return data;
}
