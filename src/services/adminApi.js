const SUPABASE_URL = 'https://wrssvnvagpnvlwhnqqta.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indyc3N2bnZhZ3Budmx3aG5xcXRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzMDQ4ODMsImV4cCI6MjEwNjg4MDg4M30.c4yG-S54rHPRhuEeohnDoYOYzR7OvR_8CkUH8QRYNQ0';
const ENDPOINT = `${SUPABASE_URL}/functions/v1/amanishu-admin`;
const TOKEN_KEY = 'amanishu-admin-session';

export const getAdminToken = () => sessionStorage.getItem(TOKEN_KEY);
export const setAdminToken = (token) => token ? sessionStorage.setItem(TOKEN_KEY, token) : sessionStorage.removeItem(TOKEN_KEY);

export async function adminRequest(action, payload = {}, auth = true) {
  const headers = { 'Content-Type': 'application/json', apikey: SUPABASE_ANON_KEY };
  if (auth && getAdminToken()) headers.Authorization = `Bearer ${getAdminToken()}`;
  const response = await fetch(ENDPOINT, { method: 'POST', headers, body: JSON.stringify({ action, ...payload }) });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 401 && auth) setAdminToken(null);
    throw new Error(data.message || 'Request failed. Please try again.');
  }
  return data;
}
