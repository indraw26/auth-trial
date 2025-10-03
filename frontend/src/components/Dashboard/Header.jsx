import { useState } from "react";
import { Bell, ChevronDown, LogOut, Search, User } from "lucide-react";
import { logout, getMe } from "../../services/auth";
import { useNavigate } from "react-router-dom";

const Header = ({ children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useState(() => {
    getMe()
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md relative min-h-screen">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center flex-1 max-w-2xl">
          <div className="relative w-full">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4 ml-6 relative">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="relative">
            <button
              className="flex items-center p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <User size={20} className="text-gray-600 mr-2" />
              <span className="text-gray-700 text-sm font-medium">
                {user ? user.name : "Guest"}
              </span>
              <ChevronDown
                size={16}
                className={`ml-1 text-gray-500 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden animate-fade-in">
                <div className="py-1 hover:bg-blue-500 transition duration-200">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full h-full px-4 py-2 text-black hover:text-white transition-colors duration-200 text-sm"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="p-8">{children}</div>
    </header>
  );
};

export default Header;
