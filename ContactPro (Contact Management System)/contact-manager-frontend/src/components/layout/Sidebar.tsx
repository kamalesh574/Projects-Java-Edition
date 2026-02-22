import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { 
  FaTachometerAlt, 
  FaAddressBook, 
  FaChartBar, 
  FaHistory, 
  
} from "react-icons/fa";

const Sidebar = () => {
  const { auth } = useAuth();

  // Navigation link helper to keep the JSX clean
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
      isActive 
        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col min-h-screen">
      {/* Brand Identity */}
      <div className="mb-10 px-4">
        <h1 className="text-2xl font-bold text-blue-400 tracking-tight">
          ContactPro
        </h1>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">
          Management Suite
        </p>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col gap-2">
        <NavLink to="/dashboard" className={navLinkClass}>
          <FaTachometerAlt className="text-lg" />
          <span className="font-medium">Dashboard</span>
        </NavLink>

        {/* Conditional ADMIN Link */}
        {auth.role === "ADMIN" && (
          <NavLink to="/contacts" className={navLinkClass}>
            <FaAddressBook className="text-lg" />
            <span className="font-medium">Contacts</span>
          </NavLink>
        )}

        {/* Secondary Links (Placeholders) */}
        <NavLink to="/analytics" className={navLinkClass}>
          <FaChartBar className="text-lg" />
          <span className="font-medium">Analytics</span>
        </NavLink>

        <NavLink to="/activity" className={navLinkClass}>
          <FaHistory className="text-lg" />
          <span className="font-medium">Activity Log</span>
        </NavLink>

        

        
      </nav>

      {/* Footer Info */}
      <div className="mt-auto pt-6 border-t border-slate-800">
        <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 rounded-xl border border-slate-700">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <div>
            <p className="text-[10px] text-slate-500 uppercase font-bold">Active Role</p>
            <p className="text-xs text-white font-semibold">{auth.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
