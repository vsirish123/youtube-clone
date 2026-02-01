import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Header toggleSidebar={() => setCollapsed(!collapsed)} />

      <div className="app-body">
        <Sidebar collapsed={collapsed} />
        <main className={`main ${collapsed ? "main-collapsed" : ""}`}>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Layout;
