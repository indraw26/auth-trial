import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Users, Menu, X, User } from "lucide-react";
import { getMe } from "../../services/auth";

let cachedUser = null;

const SidebarComponent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [user, setUser] = useState(cachedUser);
  const [loadingUser, setLoadingUser] = useState(!cachedUser);

  const navigate = useNavigate();
  const location = useLocation();

  const allMenuItems = [
    { id: "dashboard", name: "Dashboard", icon: Home, path: "/dashboard" },
    {
      id: "product",
      name: "Product Management",
      icon: Users,
      path: "/products",
    },
  ];

  const [menuItems, setMenuItems] = useState(allMenuItems);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setUser(null);
      setLoadingUser(false);
      return;
    }

    const fetchUser = async () => {
      try {
        setLoadingUser(true);
        const userData = await getMe();
        if (userData) {
          const currentUser = { ...userData.user, role: userData.roleName };
          setUser(currentUser);

          if (currentUser.role.toLowerCase() === "client") {
            setMenuItems(allMenuItems.filter((item) => item.id !== "product"));

            if (location.pathname.startsWith("/products")) {
              navigate("/dashboard", { replace: true });
            }
          } else {
            setMenuItems(allMenuItems);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, [location.pathname, navigate]);

  useEffect(() => {
    const currentMenu = menuItems.find((item) =>
      location.pathname.startsWith(item.path)
    );
    if (currentMenu) {
      setActiveMenu(currentMenu.id);
    }
  }, [location.pathname, menuItems]);

  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const handleMenuClick = (item) => {
    setActiveMenu(item.id);
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <aside
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-2xl`}
    >
      <div className="flex items-center justify-between p-6">
        {sidebarOpen && <h1 className="text-2xl font-bold">MyApp</h1>}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="px-4 pb-6 border-b border-blue-700">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-lg font-semibold shadow-lg">
            {loadingUser ? (
              <div className="w-6 h-6 bg-blue-300 rounded-full animate-pulse"></div>
            ) : user ? (
              getInitials(user.name)
            ) : (
              <User size={20} />
            )}
          </div>
          {sidebarOpen && (
            <div className="flex-1">
              {loadingUser ? (
                <>
                  <div className="h-4 w-24 bg-blue-300 rounded animate-pulse mb-1"></div>
                  <div className="h-3 w-16 bg-blue-300 rounded animate-pulse"></div>
                </>
              ) : user ? (
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
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 ${
                activeMenu === item.id ? "bg-blue-600" : ""
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
