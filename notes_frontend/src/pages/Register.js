import React, { useState } from "react";
import { useAuth } from "../AuthContext";

// PUBLIC_INTERFACE
export default function Register() {
  /** Registration form for new users. */
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await register(email, password);
    } catch (error) {
      setErr(error?.data?.detail || error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={submit}>
        <div className="auth-title">Create your account</div>
        <div className="auth-sub">Start organizing your notes</div>
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
            {loading ? "Creating..." : "Create account"}
          </button>
          <a href="#/login" style={{ color: "var(--color-primary)" }}>Sign in</a>
        </div>
      </form>
    </div>
  );
}
