import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Link } from "../types/link";
import type { Product } from "../types/product";
import type { RawMaterials } from "../types/rawMaterials";

export function Links() {
    const [links, setLinks] = useState<Link[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [rawMaterials, setRawMaterials] = useState<RawMaterials[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const [linksRes, productsRes, rawRes] = await Promise.all([
                api.get("/product-raw-material"),
                api.get("/products"),
                api.get("/raw-materials"),
            ]);

            console.log("LINKS:", linksRes.data);
            console.log("PRODUCTS:", productsRes.data);
            console.log("RAW:", rawRes.data);

            setLinks(linksRes.data);
            setProducts(productsRes.data);
            setRawMaterials(rawRes.data);
        } catch (error) {
            console.error("ERRO COMPLETO:", error);
        } finally {
            setLoading(false);
        }
    }

    const productMap = Object.fromEntries(
        products.map(p => [p.id, p.name])
    );

    const rawMaterialMap = Object.fromEntries(
        rawMaterials.map(r => [r.id, r.name])
    );

    /*async function handleDelete(id: number) {
        if (!window.confirm("Delete this link?")) return;

        try {
            await api.delete(`/product-raw-material/${id}`);
            loadData();
        } catch (error) {
            console.error(error);
        }
    }*/

    return (
        <div className="container">
            <h1>Product Composition</h1>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product</th>
                        <th>Raw Material</th>
                        <th>Quantity Needed</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {links.map((link, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{productMap[link.product.id] || "Unknown"}</td>
                            <td>{rawMaterialMap[link.rawMaterial.id] || "Unknown"}</td>
                            <td>{link.quantityRequired}</td>
                            <td>
                                <button
                                    style={{ background: "#ef4444" }}
                                    onClick={() => console.log("Cannot delete without id")}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
