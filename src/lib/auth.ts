import { User } from '@/types';

const STORAGE_KEY = 'vccp_users';
const SESSION_KEY = 'vccp_session';

function getUsers(): User[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: User[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function register(email: string, password: string, name: string, role: 'buyer' | 'seller' | 'both'): { success: boolean; error?: string; user?: User } {
  const users = getUsers();
  if (users.find(u => u.email === email)) {
    return { success: false, error: 'Email already registered' };
  }
  const user: User = {
    id: 'user_' + Date.now(),
    email,
    name,
    role,
    createdAt: new Date().toISOString(),
  };
  // Store password alongside (demo only — not production)
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY + '_pw') || '{}');
  stored[email] = password;
  localStorage.setItem(STORAGE_KEY + '_pw', JSON.stringify(stored));
  users.push(user);
  saveUsers(users);
  return { success: true, user };
}

export function login(email: string, password: string): { success: boolean; error?: string; user?: User } {
  const users = getUsers();
  const user = users.find(u => u.email === email);
  if (!user) return { success: false, error: 'User not found' };
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY + '_pw') || '{}');
  if (stored[email] !== password) return { success: false, error: 'Invalid password' };
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return { success: true, user };
}

export function logout(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession(): User | null {
  try {
    const s = localStorage.getItem(SESSION_KEY);
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
}
