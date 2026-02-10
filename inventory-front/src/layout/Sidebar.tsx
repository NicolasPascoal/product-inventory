import { NavLink } from "react-router-dom";
import "../sidebar.css";

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <h2>ERP</h2>

            <nav>
                <NavLink to="/">Dashboard</NavLink>
                <NavLink to="/products">Products</NavLink>
                <NavLink to="/raw-materials">Raw-Materials</NavLink>
                <NavLink to="/links">Link</NavLink>
                <NavLink to="/production">Production</NavLink>
            </nav>
        </aside>
    );
}
