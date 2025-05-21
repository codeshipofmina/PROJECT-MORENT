import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import "../styles/profile.css";

export default function Profile() {
  const [profile, setProfile] = useState({
    full_name: "",
    username: "",
    phone: "",
    avatar_url: "",
  });
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("User not found.");
        return;
      }

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        setError("Profile could not be loaded.");
      } else {
        setProfile({
          full_name: data.full_name || "",
          username: data.username || "",
          phone: data.phone || "",
          avatar_url: data.avatar_url || "",
        });
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files) {
      setNewAvatar(files[0]);
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("User not found.");
      return;
    }

    let avatar_url = profile.avatar_url;

    if (newAvatar) {
      const ext = newAvatar.name.split(".").pop();
      const fileName = `${user.id}.${ext}`;
      const filePath = `profil-pictures/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, newAvatar, { upsert: true });

      if (uploadError) {
        setError("Photo could not be uploaded.");
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("profil-pictures").getPublicUrl(filePath);

      avatar_url = publicUrl;
    }

    const { error: updateError } = await supabase
      .from("users")
      .update({ ...profile, avatar_url })
      .eq("id", user.id);

    if (updateError) {
      setError("Profile could not be updated.");
    } else {
      alert("Profile updated successfully!");
    }
  };

  return (
    <form className="profile-form" onSubmit={handleUpdate}>
      <h2>My Profile</h2>

      {profile.avatar_url && (
        <div className="avatar-preview">
          <img src={profile.avatar_url} alt="Avatar" />
        </div>
      )}

      <input
        type="text"
        name="full_name"
        value={profile.full_name}
        onChange={handleChange}
        placeholder="Name Surname"
      />
      <input
        type="text"
        name="username"
        value={profile.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        type="text"
        name="phone"
        value={profile.phone}
        onChange={handleChange}
        placeholder="Telephone"
      />
      <input
        type="file"
        name="avatar"
        accept="image/*"
        onChange={handleChange}
      />
      <button type="submit">Update Profile</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
