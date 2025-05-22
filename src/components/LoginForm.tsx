import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password } = formData;

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("Email or password is incorrect.");
    } else {
      setError("");
      alert("Login successful!");
      navigate("/");
    }
  };

  return (
    <article className="login_page">
      <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        name="email"
        placeholder="E-mail"
        required
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        onChange={handleChange}
      />
      <button  type="submit">Login</button>
      <p>
        Don't have an account? <br /><Link to="/signup">Sign up</Link>
      </p>
      {error && <p className="error">{error}</p>}
    </form>
    </article>
    
  );
}
