import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../../api/axios";
const Navbar = () => {
  const { auth, setAuthState } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
  clearAuth();
  setAuthState({ username: null, role: null });
  navigate("/");
};

  return (
    <header className="bg-slate-900 border-b border-slate-800 px-8 py-4 flex justify-between items-center">
      <div className="text-lg font-semibold">
        Welcome, {auth.username}
      </div>

      <div className="flex items-center gap-4">
        <span className="px-3 py-1 text-sm rounded-full bg-blue-600">
          {auth.role}
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;