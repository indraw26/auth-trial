import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Users, Menu, X, User } from "lucide-react";
import { getMe } from "../../services/auth";

let cachedUser = null; // state global sederhana agar hanya fetch sekali

const SidebarComponent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [user, setUser] = useState(cachedUser);
  const [loading, setLoading] = useState(!cachedUser);

  const navigate = useNavigate();
  const location = useLocation();

  const allMenuItems = [
    { id: "dashboard", name: "Dashboard", icon: Home, path: "/dashboard" },
    { id: "product", name: "Product Management", icon: Users, path: "/products" },
  ];

  const [menuItems, setMenuItems] = useState(allMenuItems);

  useEffect(() => {
    if (!cachedUser) {
      const fetchUser = async () => {
        try {
          setLoading(true);
          const userData = await getMe();
          if (userData) {
            const currentUser = { ...userData.user, role: userData.roleName };
            cachedUser = currentUser;
            setUser(currentUser);

            if (currentUser.role.toLowerCase() === "client") {
              setMenuItems(allMenuItems.filter((item) => item.id !== "product"));
            } else {
              setMenuItems(allMenuItems);
            }
          } else {
            setUser(null);
            setMenuItems(allMenuItems);
          }
        } catch (error) {
          console.error("Failed to fetch user:", error);
          setUser(null);
          setMenuItems(allMenuItems);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }
  }, []);

  useEffect(() => {
    const currentMenu = menuItems.find((item) =>
      location.pathname.startsWith(item.path)
    );
    if (currentMenu) {
      setActiveMenu(currentMenu.id);
    }
  }, [location.pathname, menuItems]);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleMenuClick = (item) => {
    setActiveMenu(item.id);
    if (item.path) {
      navigate(item.path);
    }
  };

  if (loading) {
    return (
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-blue-900 to-blue-800 text-white transition-all duration-300 shadow-2xl p-6 space-y-6`}
      >
        <div className="flex items-center justify-between">
          {sidebarOpen ? (
            <div className="h-8 w-32 bg-blue-700 rounded"></div>
          ) : (
            <div className="h-8 w-8 bg-blue-700 rounded-full"></div>
          )}
          <div
            className={`p-2 rounded-lg hover:bg-blue-700 transition-colors ${
              sidebarOpen ? "" : "mx-auto"
            }`}
          >
            <div className="h-6 w-6 bg-blue-700 rounded"></div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-700 rounded-full"></div>
          {sidebarOpen && (
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-blue-700 rounded"></div>
              <div className="h-3 bg-blue-700 rounded w-2/3"></div>
            </div>
          )}
        </div>

        <div className="mt-6 space-y-2">
          {Array(menuItems.length)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  sidebarOpen ? "w-full h-10" : "w-10 h-10 mx-auto"
                } bg-blue-700`}
              ></div>
            ))}
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } bg-gradient-to-b from-blue-900 to-blue-800 text-white transition-all duration-300 shadow-2xl`}
    >
      <div className="flex items-center justify-between p-6">
        {sidebarOpen && <h1 className="text-2xl font-bold">MyApp</h1>}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="px-4 pb-6 border-b border-blue-700">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-lg font-semibold shadow-lg">
            {user ? getInitials(user.name) : <User size={20} />}
          </div>
          {sidebarOpen && (
            <div className="flex-1">
              {user ? (
                <>
                  <h3 className="font-semibold text-sm">{user.name}</h3>
                  <p className="text-xs text-blue-300">{user.role}</p>
                </>
              ) : (
                <>
                  <h3 className="font-semibold text-sm text-red-300">
                    Not Logged In
                  </h3>
                  <p className="text-xs text-blue-300">Please login</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <nav className="mt-6 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                activeMenu === item.id
                  ? "bg-blue-600 shadow-lg"
                  : "hover:bg-blue-700"
              }`}
            >
              <Icon size={20} />
              {sidebarOpen && (
                <span className="text-sm font-medium">{item.name}</span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default SidebarComponent;
