import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { generateAvatar } from "../../utils/GenerateAvatar";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Profile() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const { currentUser, updateUserProfile, setError } = useAuth();

  useEffect(() => {
    setUsername(currentUser?.displayName || "");
    const res = generateAvatar();
    setAvatars(res);
  }, [currentUser]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (selectedAvatar === null) {
      return setError("Please select an avatar");
    }

    try {
      setError("");
      setLoading(true);
      await updateUserProfile(currentUser, {
        displayName: username,
        photoURL: avatars[selectedAvatar],
      });
      navigate("/");
    } catch (e) {
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-4 text-3xl text-center tracking-tight font-light dark:text-white">
            Pick an avatar
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div className="flex flex-wrap justify-center gap-4">
            {avatars.map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt="avatar"
                className={classNames(
                  "w-24 h-24 rounded-full object-cover cursor-pointer transition border-4",
                  index === selectedAvatar
                    ? "border-blue-700 dark:border-blue-500"
                    : "border-transparent hover:border-blue-400"
                )}
                onClick={() => setSelectedAvatar(index)}
              />
            ))}
          </div>

          <input
            id="username"
            name="username"
            type="text"
            required
            placeholder="Enter a Display Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="appearance-none rounded-md relative block w-full px-3 py-2 placeholder-gray-500 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-sm"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
