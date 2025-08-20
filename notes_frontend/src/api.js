const API_BASE = process.env.REACT_APP_API_URL || "";

// Helper to get and set tokens in localStorage
const TOKEN_KEY = "notes_jwt";

// PUBLIC_INTERFACE
export function getToken() {
  /** Returns the saved JWT token (string | null). */
  return localStorage.getItem(TOKEN_KEY);
}

// PUBLIC_INTERFACE
export function setToken(token) {
  /** Saves JWT token to localStorage. */
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

// PUBLIC_INTERFACE
export function clearToken() {
  /** Removes JWT token from localStorage. */
  localStorage.removeItem(TOKEN_KEY);
}

async function request(path, { method = "GET", body, auth = true, headers = {} } = {}) {
  const h = {
    "Content-Type": "application/json",
    ...headers,
  };
  if (auth) {
    const token = getToken();
    if (token) {
      h.Authorization = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: h,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) return null;

  let data;
  const text = await res.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const error = new Error(data?.detail || data?.message || "Request failed");
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

// PUBLIC_INTERFACE
export const api = {
  // Auth
  async register({ email, password }) {
    /** Registers a new user; expects {access_token} response. */
    return request("/auth/register", { method: "POST", body: { email, password }, auth: false });
  },
  async login({ email, password }) {
    /** Logs in a user; expects {access_token}. */
    return request("/auth/login", { method: "POST", body: { email, password }, auth: false });
  },
  async me() {
    /** Returns current user profile. */
    return request("/auth/me", { method: "GET" });
  },

  // Notes
  async listNotes({ q } = {}) {
    /** Lists notes, optionally filtered by search query q. */
    const query = q ? `?q=${encodeURIComponent(q)}` : "";
    return request(`/notes${query}`, { method: "GET" });
  },
  async getNote(id) {
    /** Gets a single note by id. */
    return request(`/notes/${id}`, { method: "GET" });
  },
  async createNote({ title, content, folder }) {
    /** Creates a note; returns created note. */
    return request("/notes", { method: "POST", body: { title, content, folder } });
  },
  async updateNote(id, { title, content, folder }) {
    /** Updates a note; returns updated note. */
    return request(`/notes/${id}`, { method: "PUT", body: { title, content, folder } });
  },
  async deleteNote(id) {
    /** Deletes a note by id. */
    return request(`/notes/${id}`, { method: "DELETE" });
  },
  async listFolders() {
    /** Lists distinct folders. If backend lacks this, compute in frontend. */
    return request("/folders", { method: "GET" });
  },
};

// PUBLIC_INTERFACE
export function authLoginAndStoreToken({ access_token }) {
  /** Stores token and returns true. */
  setToken(access_token);
  return true;
}
