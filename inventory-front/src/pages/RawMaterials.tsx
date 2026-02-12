import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { RawMaterials } from "../types/rawMaterials";
import "../pages.css";
import EditRawMaterialsModal from "../components/RawMaterialsModal.tsx";

export function RawMaterials() {
    const [rawMaterials, setRawMaterials] = useState<RawMaterials[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRawMaterials, setSelectedRawMaterials] = useState<RawMaterials | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        loadRawMaterials();
    }, []);
    async function loadRawMaterials() {
        try {
            const response = await api.get("/raw-materials");
            setRawMaterials(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    async function handleDelete(id: number) {
        if (!window.confirm("Are you sure you want to delete?")) return;

        try {
            await api.delete(`/raw-materials/${id}`);
            loadRawMaterials();
        } catch (error) {
            console.error(error);
        }
    }
    async function handleSave(rawMaterials: RawMaterials) {
        try {
            if (isCreating) {
                await api.post("/raw-materials", {
                    name: rawMaterials.name,
                    stock_quantity: rawMaterials.stock_quantity,
                });
            } else {
                await api.put(`/raw-materials/${rawMaterials.id}`, {
                    name: rawMaterials.name,
                    stock_quantity: rawMaterials.stock_quantity,
                });
            }

            setIsModalOpen(false);
            setSelectedRawMaterials(null);
            setIsCreating(false);
            loadRawMaterials();
        } catch (error) {
            console.error(error);
        }
    }


    function handleOpenEdit(rawMaterials: RawMaterials) {
        setSelectedRawMaterials(rawMaterials);
        setIsModalOpen(true);
    }

    return (
        <div className="container">
    <div className="header">
        <h1>Raw-Material</h1>
      <button
        onClick={() => {
          setSelectedRawMaterials({ id: 0, name: "", stock_quantity: 0 });
          setIsCreating(true);
          setIsModalOpen(true);
        }}
      >
        Add Product
      </button>
    </div>

            {loading ? (
                <p>Loading Raw-Materials...</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>quantity</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rawMaterials.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.stock_quantity.toFixed()}</td>
                            <td>
                                <button
                                    style={{ background: "#2563eb", marginRight: "8px" }}
                                    onClick={() => handleOpenEdit(p)}
                                >
                                    Edit
                                </button>
                                <button
                                    style={{ background: "#ef4444" }}
                                    onClick={() => handleDelete(p.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            {isModalOpen && selectedRawMaterials && (
                <EditRawMaterialsModal
                    rawMaterials={selectedRawMaterials}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                    isCreating={isCreating}
                />
            )}
        </div>
    );
}
