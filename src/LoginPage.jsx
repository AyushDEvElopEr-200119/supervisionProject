import React, { useState } from "react";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "Ayush@123";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setError("");
      onLogin();
      return;
    }
    setError("Wrong email or password. Please try again.");
  };

  return <main className="login-page"><div className="login-atmosphere login-atmosphere-one" /><div className="login-atmosphere login-atmosphere-two" /><section className="login-layout"><div className="login-intro"><div className="login-logo">Blo<span>o</span>m</div><div className="login-intro-copy"><span className="login-kicker"><ShieldCheck size={14} /> Secure admin workspace</span><h1>Everything your store needs, in one calm place.</h1><p>Manage products, content, customers, and performance with confidence.</p></div><div className="login-intro-footer"><span>Bloom Admin</span><span>v1.0.0</span></div></div><div className="login-card"><div className="login-card-heading"><div className="login-lock"><LockKeyhole size={20} /></div><div><h2>Welcome back</h2><p>Sign in to continue to your dashboard.</p></div></div><form onSubmit={submit} noValidate><label className="login-field"><span>Email address</span><div className="login-input"><Mail size={17} /><input type="email" value={email} onChange={(event) => { setEmail(event.target.value); setError(""); }} placeholder="Enter your email" autoComplete="username" /></div></label><label className="login-field"><span>Password</span><div className="login-input"><LockKeyhole size={17} /><input type={showPassword ? "text" : "password"} value={password} onChange={(event) => { setPassword(event.target.value); setError(""); }} placeholder="Enter your password" autoComplete="current-password" /><button type="button" className="password-toggle" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>{error && <p className="login-error" role="alert">{error}</p>}<div className="login-options"><label><input type="checkbox" /> <span>Remember me</span></label><button type="button">Forgot password?</button></div><button className="login-submit" type="submit">Sign in <ArrowRight size={17} /></button></form><p className="login-security"><ShieldCheck size={14} /> Your account is protected with secure access.</p></div></section></main>;
}
