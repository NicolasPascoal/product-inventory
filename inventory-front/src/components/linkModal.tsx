import { useState, useEffect } from "react";
import type { Link } from "../types/link";
import type { Product } from "../types/product";
import type { RawMaterials } from "../types/rawMaterials";

interface Props {
    link: Link;
    products: Product[];
    rawMaterials: RawMaterials[];
    onClose: () => void;
    onSave: (link: Link) => void;
    isCreating: boolean;
}

export default function EditLinkModal({
    link,
    products,
    rawMaterials,
    onClose,
    onSave,
    isCreating
}: Props) {

    const [productId, setProductId] = useState<number>(0);
    const [rawMaterialId, setRawMaterialId] = useState<number>(0);
    const [quantityRequired, setQuantityRequired] = useState<number>(1);

    useEffect(() => {
        setProductId(link.product?.id ?? 0);
        setRawMaterialId(link.rawMaterial?.id ?? 0);
        setQuantityRequired(link.quantityRequired ?? 1);
    }, [link]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        onSave({
            ...link,
            product: { id: productId } as any,
            rawMaterial: { id: rawMaterialId } as any,
            quantityRequired
        });
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>
                    {isCreating ? "Create Link" : (
                    <>
                Edit Link <span style={{ opacity: .6 }}>#{link.id}</span>
                </>
                 )}
                </h2>

                <form onSubmit={handleSubmit}>

                    {/* PRODUCT SELECT */}
                    <select
                        value={productId}
                        onChange={(e) => setProductId(Number(e.target.value))}
                    >
                        <option value={0}>Select product</option>
                        {products.map(p => (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}
                    </select>

                    {/* RAW MATERIAL SELECT */}
                    <select
                        value={rawMaterialId}
                        onChange={(e) => setRawMaterialId(Number(e.target.value))}
                    >
                        <option value={0}>Select raw material</option>
                        {rawMaterials.map(r => (
                            <option key={r.id} value={r.id}>
                                {r.name}
                            </option>
                        ))}
                    </select>

                    {/* QUANTITY */}
                    <input
                        type="number"
                        value={quantityRequired}
                        onChange={(e) => setQuantityRequired(Number(e.target.value))}
                        placeholder="Quantity"
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