import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import "../styles/profile.css";
import { useAuthContext } from "../contexts/auth-context";

const rotateSound = new Audio("/audio/pedro_rotation.mp3");

export default function Profile() {
  const { setAvatarUrl } = useAuthContext();

  const [profile, setProfile] = useState({
    full_name: "",
    username: "",
    phone: "",
    avatar_url: "",
  });

  const [clickCount, setClickCount] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const BUCKET_NAME = "profile-pictures";

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError("");

      try {
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
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Unexpected error loading the profile.");
      } finally {
        setLoading(false);
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
    setLoading(true);
    setError("");

    if (!profile.full_name.trim()) {
      setError("Name Surname field cannot be left blank.");
      setLoading(false);
      return;
    }
    if (!profile.username.trim()) {
      setError("The username field cannot be left blank.");
      setLoading(false);
      return;
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("User not found.");
        setLoading(false);
        return;
      }

      let avatar_url = profile.avatar_url;

      if (newAvatar) {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!allowedTypes.includes(newAvatar.type)) {
          setError("Only JPEG, PNG or GIF images are allowed.");
          setLoading(false);
          return;
        }

        const ext = newAvatar.name.split(".").pop();
        const fileName = `${user.id}.${ext}`;
        const filePath = `${BUCKET_NAME}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(filePath, newAvatar, { upsert: true });

        if (uploadError) {
          setError("Upload failed: " + uploadError.message);
          setLoading(false);
          return;
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

        avatar_url = publicUrl;
        setNewAvatar(null);
      }

      const { error: updateError } = await supabase
        .from("users")
        .update({ ...profile, avatar_url })
        .eq("id", user.id);

      if (updateError) {
        setError("Profile update failed: " + updateError.message);
      } else {
        alert("Profile updated successfully!");
        setProfile((prev) => ({ ...prev, avatar_url }));
        setAvatarUrl(avatar_url); // 🔥 Header'ı otomatik güncelle
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Unexpected error updating the profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="profile">
      <form className="profile-form" onSubmit={handleUpdate}>
        <h2>My Profile</h2>
        {loading && <p>Loading...</p>}
        {!loading && profile.avatar_url && (
          <div className="avatar-preview">
            <img
              src={profile.avatar_url}
              alt="Avatar"
              className={isRotating ? "rotate-animation" : ""}
              onClick={() => {
                const newCount = clickCount + 1;
                setClickCount(newCount);

                if (newCount === 5) {
                  setIsRotating(false);
                  void rotateSound.play();

                  setTimeout(() => {
                    setIsRotating(true);
                    setClickCount(0);

                    setTimeout(() => {
                      setIsRotating(false);
                    }, 15000);
                  }, 50);
                }
              }}
            />
          </div>
        )}
        {!loading && (
          <>
            <input
              type="text"
              name="full_name"
              value={profile.full_name}
              onChange={handleChange}
              placeholder="Name Surname"
              disabled={loading}
            />
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleChange}
              placeholder="Username"
              disabled={loading}
            />
            <input
              type="text"
              name="phone"
              pattern="[0-9]*"
              value={profile.phone}
              onChange={handleChange}
              placeholder="Phone"
              disabled={loading}
            />
            <input
              type="file"
              name="avatar"
              accept="image/jpeg, image/png, image/gif"
              onChange={handleChange}
              disabled={loading}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </article>
  );
}
