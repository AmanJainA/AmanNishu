import { useCallback, useEffect, useState } from 'react';
import { adminRequest, getAdminToken, setAdminToken } from '../services/adminApi';
import '../admin.css';

const emptyCard = { function_name: '', timing: '', url: '', date: '', venue_name: '' };
const emptyUser = { username: '', password: '', is_active: true };
const dateLabel = (value) => value ? new Date(value + (String(value).length === 10 ? 'T00:00:00' : '')).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
const timeLabel = (value) => value ? String(value).slice(0, 5) : '—';

function Login({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const submit = async (e) => {
    e.preventDefault(); setBusy(true); setError('');
    try {
      const result = await adminRequest(mode === 'setup' ? 'bootstrap' : 'login', { username, password }, false);
      if (mode === 'setup') { setMode('login'); setPassword(''); setError('Admin account created. Please sign in.'); }
      else { setAdminToken(result.token); onLogin(result.user); }
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };
  return (
    <main className="am-admin-login">
      <div className="am-login-art">
        <span className="am-kicker">AMAN & NISHU</span>
        <div className="am-login-flower">✿</div>
        <h1>Every moment,<br /><em>beautifully arranged.</em></h1>
        <p>Wedding administration portal</p>
      </div>
      <form className="am-login-card" onSubmit={submit}>
        <span className="am-kicker">PRIVATE ACCESS</span>
        <h2>{mode === 'setup' ? 'Create admin account' : 'Welcome back'}</h2>
        <p>{mode === 'setup' ? 'Set up the first administrator account.' : 'Sign in to manage your wedding website.'}</p>
        {error && <div className="am-alert">{error}</div>}
        <label>Username</label>
        <input value={username} onChange={e => setUsername(e.target.value)} autoComplete="username" required />
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete={mode === 'setup' ? 'new-password' : 'current-password'} minLength={mode === 'setup' ? 10 : 1} required />
        {mode === 'setup' && <small>Use at least 10 characters. Your password is stored as a secure hash.</small>}
        <button className="am-primary" disabled={busy}>{busy ? 'Please wait…' : mode === 'setup' ? 'Create admin' : 'Sign in'}</button>
        <button type="button" className="am-link-button" onClick={() => { setMode(mode === 'setup' ? 'login' : 'setup'); setError(''); }}>
          {mode === 'setup' ? 'Back to sign in' : 'First-time admin setup'}
        </button>
        <a className="am-back-link" href="/">← Back to wedding website</a>
      </form>
    </main>
  );
}

export default function Admin() {
  const [user, setUser] = useState(null);
  const [section, setSection] = useState('dashboard');
  const [stats, setStats] = useState({ cards: 0, arrangements: 0, users: 0 });
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState('');
  const [editing, setEditing] = useState(null);
  const [cardForm, setCardForm] = useState(emptyCard);
  const [userForm, setUserForm] = useState(emptyUser);

  const loadStats = useCallback(async () => {
    const data = await adminRequest('dashboard');
    setStats(data);
  }, []);
  const loadRows = useCallback(async (table) => {
    setLoading(true);
    try { const data = await adminRequest('list', { table }); setRows(data.rows || []); }
    catch (err) { setNotice(err.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    if (!getAdminToken()) return;
    adminRequest('dashboard').then(data => { setStats(data); setUser({ username: 'Administrator' }); }).catch(() => setAdminToken(null));
  }, []);
  useEffect(() => {
    if (!user) return;
    if (section === 'dashboard') loadStats().catch(err => setNotice(err.message));
    if (['card', 'arrangement', 'users'].includes(section)) loadRows(section);
  }, [section, user, loadStats, loadRows]);

  const logout = () => { setAdminToken(null); setUser(null); setRows([]); setSection('dashboard'); };
  const openCard = (row = null) => { setEditing(row); setCardForm(row ? { function_name: row.function_name || '', timing: row.timing || '', url: row.url || '', date: row.date || '', venue_name: row.venue_name || '' } : emptyCard); setModal('card'); };
  const openUser = (row = null) => { setEditing(row); setUserForm(row ? { username: row.username, password: '', is_active: row.is_active } : emptyUser); setModal('user'); };
  const saveCard = async (e) => {
    e.preventDefault();
    try { await adminRequest('save-card', { ...cardForm, id: editing?.id }); setModal(''); setNotice('Card saved successfully.'); await loadRows('card'); await loadStats(); }
    catch (err) { setNotice(err.message); }
  };
  const saveUser = async (e) => {
    e.preventDefault();
    try { await adminRequest('save-user', { ...userForm, id: editing?.id }); setModal(''); setNotice('User saved successfully.'); await loadRows('users'); await loadStats(); }
    catch (err) { setNotice(err.message); }
  };
  const remove = async (table, row) => {
    const label = table === 'card' ? row.function_name : row.username;
    if (!window.confirm(`Delete "${label}"? This cannot be undone.`)) return;
    try { await adminRequest('delete', { table, id: row.id }); setNotice('Record deleted.'); await loadRows(table); await loadStats(); }
    catch (err) { setNotice(err.message); }
  };
  const filtered = rows.filter(row => Object.values(row).join(' ').toLowerCase().includes(search.toLowerCase()));

  if (!user) return <Login onLogin={u => { setUser(u); setNotice(''); }} />;

  const nav = [
    { id: 'dashboard', label: 'Dashboard', icon: '⌂' },
    { id: 'card', label: 'Manage Cards', icon: '▦' },
    { id: 'arrangement', label: 'Manage Arrangements', icon: '▤' },
    { id: 'users', label: 'Manage Users', icon: '♙' },
  ];
  const title = nav.find(item => item.id === section)?.label || 'Dashboard';

  return (
    <div className="am-admin">
      <aside className="am-sidebar">
        <a className="am-brand" href="/"><span className="am-brand-mark">A<span>&</span>N</span><span>Aman & Nishu<small>WEDDING ADMIN</small></span></a>
        <div className="am-side-label">WORKSPACE</div>
        <nav>{nav.map(item => <button key={item.id} className={section === item.id ? 'active' : ''} onClick={() => { setSection(item.id); setSearch(''); setNotice(''); }}><span>{item.icon}</span>{item.label}</button>)}</nav>
        <div className="am-sidebar-bottom"><a href="/" target="_blank" rel="noreferrer">↗ View website</a><button onClick={logout}>⇥ Sign out</button></div>
      </aside>
      <main className="am-main">
        <header className="am-topbar"><div><span className="am-kicker">AMAN & NISHU / ADMIN</span><h1>{title}</h1></div><div className="am-user-chip"><span className="am-avatar">A</span><span>Administrator<small>Admin panel</small></span></div></header>
        <div className="am-content">
          {notice && <div className="am-toast"><span>{notice}</span><button onClick={() => setNotice('')}>×</button></div>}
          {section === 'dashboard' && <>
            <div className="am-welcome"><div><span className="am-kicker">OVERVIEW</span><h2>Welcome to your wedding dashboard</h2><p>Manage your event cards, guest arrangements and admin access from one place.</p></div><div className="am-welcome-flower">✿</div></div>
            <div className="am-stats">
              {[['Wedding cards', stats.cards, 'card', '▦'], ['Guest arrangements', stats.arrangements, 'arrangement', '▤'], ['Admin users', stats.users, 'users', '♙']].map(([label, value, target, icon]) => <button className="am-stat" key={target} onClick={() => setSection(target)}><span className="am-stat-icon">{icon}</span><span>{label}</span><strong>{value}</strong><small>View details →</small></button>)}
            </div>
            <div className="am-panel am-quick"><div><h3>Quick actions</h3><p>Keep your wedding information up to date.</p></div><button className="am-primary" onClick={() => openCard()}>＋ Add wedding card</button><button className="am-secondary" onClick={() => setSection('arrangement')}>View guest arrangements</button></div>
          </>}
          {section !== 'dashboard' && <>
            <div className="am-table-head"><div><h2>{section === 'card' ? 'Wedding cards' : section === 'arrangement' ? 'Guest arrangements' : 'Administrator accounts'}</h2><p>{section === 'card' ? 'Add and update the functions displayed on your wedding page.' : section === 'arrangement' ? 'Guest stay and travel details submitted through the arrangement form.' : 'Manage access to the admin panel.'}</p></div>{section !== 'arrangement' && <button className="am-primary" onClick={() => section === 'card' ? openCard() : openUser()}>＋ Add {section === 'card' ? 'card' : 'user'}</button>}</div>
            <div className="am-panel am-table-panel">
              <div className="am-table-tools"><span>{filtered.length} records</span><input placeholder="Search records…" value={search} onChange={e => setSearch(e.target.value)} /></div>
              {loading ? <div className="am-empty">Loading records…</div> : section === 'card' ? (
                <div className="am-table-scroll"><table><thead><tr><th>Function</th><th>Date</th><th>Timing</th><th>Venue</th><th>Image URL</th><th>Actions</th></tr></thead><tbody>{filtered.map(row => <tr key={row.id}><td><strong>{row.function_name}</strong></td><td>{dateLabel(row.date)}</td><td>{row.timing || '—'}</td><td>{row.venue_name || '—'}</td><td className="am-url">{row.url || '—'}</td><td><div className="am-actions"><button onClick={() => openCard(row)}>Edit</button><button className="danger" onClick={() => remove('card', row)}>Delete</button></div></td></tr>)}</tbody></table>{!filtered.length && <div className="am-empty">No cards found. Add your first wedding card.</div>}</div>
              ) : section === 'users' ? (
                <div className="am-table-scroll"><table><thead><tr><th>Username</th><th>Status</th><th>Created</th><th>Last login</th><th>Actions</th></tr></thead><tbody>{filtered.map(row => <tr key={row.id}><td><strong>{row.username}</strong></td><td><span className={row.is_active ? 'am-status active' : 'am-status'}>{row.is_active ? 'Active' : 'Inactive'}</span></td><td>{dateLabel(row.created_at)}</td><td>{row.last_login_at ? new Date(row.last_login_at).toLocaleString('en-IN') : 'Never'}</td><td><div className="am-actions"><button onClick={() => openUser(row)}>Edit</button><button className="danger" onClick={() => remove('users', row)}>Delete</button></div></td></tr>)}</tbody></table>{!filtered.length && <div className="am-empty">No users found.</div>}</div>
              ) : (
                <div className="am-table-scroll"><table><thead><tr><th>Guest</th><th>Contact</th><th>Stay</th><th>Side</th><th>Arrival</th><th>Travel</th><th>Members</th><th>Coming from</th></tr></thead><tbody>{filtered.map(row => <tr key={row.id}><td><strong>{row.name}</strong></td><td>{row.contactno}</td><td>{row.arrangement === 'Yes' ? 'Required' : 'Not required'}</td><td>{row.side || '—'}</td><td>{row.arrivaldate ? dateLabel(row.arrivaldate) : '—'}<small className="am-cell-sub">{timeLabel(row.arrivaltime)}</small></td><td>{row.mode || '—'}<small className="am-cell-sub">{row.flightno || row.trainname || ''}</small></td><td>{row.adult} adults, {row.children} children</td><td>{row.comingfrom || '—'}</td></tr>)}</tbody></table>{!filtered.length && <div className="am-empty">No guest arrangements found.</div>}</div>
              )}
            </div>
          </>}
        </div>
      </main>

      {modal && <div className="am-modal-backdrop" onMouseDown={e => e.target === e.currentTarget && setModal('')}><form className="am-modal" onSubmit={modal === 'card' ? saveCard : saveUser}>
        <div className="am-modal-head"><div><span className="am-kicker">ADMINISTRATION</span><h2>{modal === 'card' ? editing ? 'Edit wedding card' : 'Add wedding card' : editing ? 'Edit admin user' : 'Add admin user'}</h2></div><button type="button" onClick={() => setModal('')}>×</button></div>
        {modal === 'card' ? <>
          <label>Function name *</label><input required value={cardForm.function_name} onChange={e => setCardForm({ ...cardForm, function_name: e.target.value })} placeholder="e.g. Haldi & Mehendi" />
          <div className="am-form-grid"><div><label>Date</label><input type="date" value={cardForm.date} onChange={e => setCardForm({ ...cardForm, date: e.target.value })} /></div><div><label>Timing</label><input value={cardForm.timing} onChange={e => setCardForm({ ...cardForm, timing: e.target.value })} placeholder="At 11:00 am" /></div></div>
          <label>Venue name</label><input value={cardForm.venue_name} onChange={e => setCardForm({ ...cardForm, venue_name: e.target.value })} placeholder="Venue and address" />
          <label>Image URL</label><input value={cardForm.url} onChange={e => setCardForm({ ...cardForm, url: e.target.value })} placeholder="/assets/images/story/..." />
        </> : <>
          <label>Username *</label><input required minLength={3} value={userForm.username} onChange={e => setUserForm({ ...userForm, username: e.target.value })} />
          <label>{editing ? 'New password (leave blank to keep current)' : 'Password *'}</label><input type="password" minLength={10} required={!editing} value={userForm.password} onChange={e => setUserForm({ ...userForm, password: e.target.value })} placeholder="At least 10 characters" />
          <label className="am-check"><input type="checkbox" checked={userForm.is_active} onChange={e => setUserForm({ ...userForm, is_active: e.target.checked })} /> Account active</label>
        </>}
        <div className="am-modal-actions"><button type="button" className="am-secondary" onClick={() => setModal('')}>Cancel</button><button className="am-primary">Save changes</button></div>
      </form></div>}
    </div>
  );
}
