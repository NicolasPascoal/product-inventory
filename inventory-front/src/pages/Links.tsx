import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Link } from "../types/link";
import "../pages.css"
import type { Product } from "../types/product";
import type { RawMaterials } from "../types/rawMaterials";
import EditLinkModal from "../components/linkModal.tsx";

export function Links() {
    const [links, setLinks] = useState<Link[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [rawMaterials, setRawMaterials] = useState<RawMaterials[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLink, setSelectedLink] = useState<Link | null>(null);
    const [isCreating, setIsCreating] = useState(false);

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

    async function handleDelete(id: number) {
        if (!window.confirm("Are you sure you want to delete?")) return;

        try {
            await api.delete(`/product-raw-material/${id}`);
            loadData();
        } catch (error) {
            console.error(error);
        }
    }

   async function handleSave(link: Link) {
    try {
        const payload = {
            product: { id: link.product.id },
            rawMaterial: { id: link.rawMaterial.id },
            quantityRequired: link.quantityRequired,
        };

        console.log("PAYLOAD:", payload);

        if (isCreating) {
            await api.post("/product-raw-material", payload);
        } else {
            await api.put(`/product-raw-material/${link.id}`, payload);
        }

        setIsModalOpen(false);
        setSelectedLink(null);
        setIsCreating(false);
        loadData();
    } catch (error) {
        console.error("SAVE ERROR:", error);
    }
}
 function handleOpenEdit(link: Link) {
    setSelectedLink(link);
    setIsModalOpen(true);
  }

    return (
        <div className="container">
            <h1>Product Composition</h1>
            <button
    onClick={() => {
        setSelectedLink({
            id: 0,
            product: { id: 0, name: "" },
            rawMaterial: { id: 0, name: "" },
            quantityRequired: 1,
            });

        setIsCreating(true);
        setIsModalOpen(true);
    }}
>
    Add Link
</button>
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
                            <td>{link.product?.name}</td>
                            <td>{link.rawMaterial?.name}</td>
                            <td>{link.quantityRequired}</td>
                            <td>
                                <button
                          style={{ background: "#2563eb", marginRight: "8px" }}
                          onClick={() => handleOpenEdit(link)}
                      >
                        Edit
                      </button>
                        <button
                          style={{ background: "#ef4444" }}
                          onClick={() => handleDelete(link.id)}
                      >
                        Delete
                      </button>    
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            {isModalOpen && selectedLink && (
        <EditLinkModal
            link={selectedLink}
            products={products}
            rawMaterials={rawMaterials}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
            isCreating={isCreating}
    />
)}
        </div>
    );
}
