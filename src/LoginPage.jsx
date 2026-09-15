import React, { useState } from "react";
import { ArrowRight, Eye, EyeOff, Loader2, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { login, getRememberedEmail, setRememberedEmail } from "./services/api";

export default function LoginPage({ onLogin }) {
  const initialEmail = getRememberedEmail();
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(Boolean(initialEmail));
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    if (loading) return;

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { user, token } = await login(email, password);

      if (rememberMe) {
        setRememberedEmail(email.trim());
      } else {
        setRememberedEmail("");
      }

      if (onLogin) {
        onLogin(user, token);
      }
    } catch (err) {
      setError(err.message || "Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-atmosphere login-atmosphere-one" />
      <div className="login-atmosphere login-atmosphere-two" />
      <section className="login-layout">
        <div className="login-intro">
          <div className="login-logo">
            Blo<span>o</span>m
          </div>
          <div className="login-intro-copy">
            <span className="login-kicker">
              <ShieldCheck size={14} /> Secure admin workspace
            </span>
            <h1>Everything your store needs, in one calm place.</h1>
            <p>Manage products, content, customers, and performance with confidence.</p>
          </div>
          <div className="login-intro-footer">
            <span>Bloom Admin</span>
            <span>v1.0.0</span>
          </div>
        </div>

        <div className="login-card">
          <div className="login-card-heading">
            <div className="login-lock">
              <LockKeyhole size={20} />
            </div>
            <div>
              <h2>Welcome back</h2>
              <p>Sign in to continue to your dashboard.</p>
            </div>
          </div>

          <form onSubmit={submit} noValidate>
            <label className="login-field">
              <span>Email address</span>
              <div className="login-input">
                <Mail size={17} />
                <input
                  type="email"
                  value={email}
                  disabled={loading}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter your email"
                  autoComplete="username"
                  required
                />
              </div>
            </label>

            <label className="login-field">
              <span>Password</span>
              <div className="login-input">
                <LockKeyhole size={17} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  disabled={loading}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </label>

            {error && (
              <p className="login-error" role="alert">
                {error}
              </p>
            )}

            <div className="login-options">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  disabled={loading}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <button type="button" tabIndex={-1}>
                Forgot password?
              </button>
            </div>

            <button className="login-submit" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 size={17} className="login-spinner" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          <p className="login-security">
            <ShieldCheck size={14} /> Your account is protected with secure access.
          </p>
        </div>
      </section>
    </main>
  );
}

