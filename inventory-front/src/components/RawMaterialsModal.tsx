import { useState, useEffect } from "react";
import type { RawMaterials } from "../types/rawMaterials"

interface Props {
    rawMaterials: RawMaterials;
    onClose: () => void;
    onSave: (rawMaterials: RawMaterials) => void;
    isCreating: boolean;
}

export default function EditRawMaterialsModal({
                                                  rawMaterials,
                                                  onClose,
                                                  onSave,
                                                  isCreating
                                         }: Props) {
    const [name, setName] = useState("");
    const [stock_quantity, setQuantity] = useState(0);

    useEffect(() => {
        setName(rawMaterials.name);
        setQuantity(rawMaterials.stock_quantity);
    }, [rawMaterials]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        onSave({
            ...rawMaterials,
            name,
            stock_quantity
        });
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{isCreating ? "Create Raw-Materials" : "Edit Raw-Materials"}</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                    />

                    <input
                        type="number"
                        value={stock_quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        placeholder="Quantity in stock"
                    />

                    <div className="modal-actions">
                        <button type="submit">Salvar</button>
                        <button type="button" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
