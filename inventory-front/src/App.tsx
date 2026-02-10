import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import { Products } from "./pages/Products";
import { RawMaterials } from "./pages/RawMaterials";
import { Links } from "./pages/Links";
import { Production } from "./pages/Production";

export default function App() {
    return (
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/raw-materials" element={<RawMaterials />} />
                    <Route path="/links" element={<Links />} />
                    <Route path="/production" element={<Production />} />
                </Route>
            </Routes>
    );
}
