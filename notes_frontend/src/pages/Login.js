import React, { useState } from "react";
import { useAuth } from "../AuthContext";

// PUBLIC_INTERFACE
export default function Login() {
  /** Login form for existing users. */
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      setErr(error?.data?.detail || error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={submit}>
        <div className="auth-title">Welcome back</div>
        <div className="auth-sub">Sign in to continue</div>
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {err && <div style={{ color: "#ef4444", fontSize: 14 }}>{err}</div>}
        <div className="auth-actions">
          <button type="submit" className="btn primary" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
          <a href="#/register" style={{ color: "var(--color-primary)" }}>Create account</a>
        </div>
      </form>
    </div>
  );
}
