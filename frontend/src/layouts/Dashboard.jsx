import SidebarComponent from "../components/Dashboard/Sidebar";
import Header from "../components/Dashboard/Header";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <SidebarComponent />

      <main className="flex-1 overflow-auto">
        <Header>{children}</Header>
      </main>
    </div>
  );
};

export default DashboardLayout;
