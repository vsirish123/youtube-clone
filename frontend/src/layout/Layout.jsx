import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [searchText, setSearchText] = useState("");
  return (
    <>
      <Header toggleSidebar={() => setCollapsed(!collapsed)} setSearchText={setSearchText}/>

      <div className="app-body">
        <Sidebar collapsed={collapsed} />
        <main className={`main ${collapsed ? "main-collapsed" : ""}`}>
          <Outlet context={{ searchText }}/>
        </main>
      </div>
    </>
  );
}

export default Layout;
