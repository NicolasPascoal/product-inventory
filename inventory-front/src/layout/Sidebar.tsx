import { NavLink } from "react-router-dom";
import "../sidebar.css";

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <h2>ERP</h2>

            <nav>
                <NavLink to="/">Dashboard</NavLink>
                <NavLink to="/products">Produtos</NavLink>
                <NavLink to="/raw-materials">Matérias-primas</NavLink>
                <NavLink to="/links">Vínculos</NavLink>
                <NavLink to="/production">Produção</NavLink>
            </nav>
        </aside>
    );
}
