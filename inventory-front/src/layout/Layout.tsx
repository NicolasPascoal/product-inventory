import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "../layout.css";

export default function Layout() {
    return (
        <div className="layout">
            <Sidebar />
            <main className="content">
                <Outlet />
            </main>
        </div>
    );
}
