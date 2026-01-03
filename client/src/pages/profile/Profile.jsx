import "./profile.scss";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="profilePage">
      <h2 className="title">Profile</h2>

      <div className="profileCard">
        <div className="row">
          <span className="label">Username</span>
          <span className="value">{user.username}</span>
        </div>

        <div className="row">
          <span className="label">Email</span>
          <span className="value">{user.email}</span>
        </div>

        <button onClick={handleLogout} className="logoutBtn">
          Logout
        </button>
      </div>
    </div>
  );
};
