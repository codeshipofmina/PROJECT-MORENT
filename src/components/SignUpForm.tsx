import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import "../styles/signup_page.css";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    full_name: "",
    username: "",
    phone: "",
    avatar: null as File | null,
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files) {
      setFormData((prev) => ({ ...prev, avatar: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password, full_name, username, phone, avatar } = formData;

    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError || !authData.user) {
      setError(signUpError?.message || "Sign up failed.");
      return;
    }

    let avatar_url = null;
    const BUCKET = "profile-pictures";

    if (avatar) {
      const fileExt = avatar.name.split(".").pop();
      const fileName = `${authData.user.id}.${fileExt}`;
      const filePath = `${BUCKET}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(filePath, avatar);

      if (uploadError) {
        console.error("Upload Error:", uploadError);
        setError("Photo could not be uploaded: " + uploadError.message);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(filePath, { download: false });

      avatar_url = publicUrl;
    }

    const { error: insertError } = await supabase
      .from("users")
      .insert([
        { id: authData.user.id, full_name, username, phone, avatar_url },
      ]);

    if (insertError) {
      setError("User information could not be saved.");
      return;
    }

    alert("Registration successful! Please check your email for verification.");
  };

  return (

    <article className="signup_page">
      <form className="register-form" onSubmit={handleSubmit} encType="multipart/form-data">

      <h2>Register</h2>
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
      <input
        type="text"
        name="full_name"
        placeholder="Fullname"
        required
        onChange={handleChange}
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        required
        onChange={handleChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
      />
      <label htmlFor="avatar">Profile-Image</label>
      <input
        type="file"
        name="avatar"
        accept="image/*"
        onChange={handleChange}
      />
      <button type="submit">Register</button>
      <p>
        Do you already have an account?? <br /><Link to="/login">Log in</Link>
      </p>
      {error && <p className="error">{error}</p>}
    </form>
    </article>
    
  );
}
