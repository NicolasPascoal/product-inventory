import { useState, useEffect } from "react";
import type { Product } from "../types/product.ts"

interface Props {
    product: Product;
    onClose: () => void;
    onSave: (product: Product) => void;
    isCreating: boolean;
}

export default function EditProductModal({
                                             product,
                                             onClose,
                                             onSave,
                                             isCreating
                                         }: Props)
 {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);

    useEffect(() => {
        setName(product.name);
        setPrice(product.price);
    }, [product]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        onSave({
            ...product,
            name,
            price
        });
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{isCreating ? "Create Product" : "Edit Product"}</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome"
                    />

                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        placeholder="Preço"
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
