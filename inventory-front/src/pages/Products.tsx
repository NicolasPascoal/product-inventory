import { useEffect, useState } from "react";
import { api } from "../services/api";
import "../pages.css"
import type { Product } from "../types/product";
import EditProductModal from "../components/ProductModal.tsx";


export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      await api.delete(`/products/${id}`);
      loadProducts();
    } catch (error) {
      console.error(error);
    }
  }


  async function handleSave(product: Product) {
    try {
      if (isCreating) {
        await api.post("/products", {
          name: product.name,
          price: product.price,
        });
      } else {
        await api.put(`/products/${product.id}`, {
          name: product.name,
          price: product.price,
        });
      }

      setIsModalOpen(false);
      setSelectedProduct(null);
      setIsCreating(false);
      loadProducts();
    } catch (error) {
      console.error(error);
    }
  }


  function handleOpenEdit(product: Product) {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }

  return (
      <div className="container">
        <h1>Products</h1>

        <button
            onClick={() => {
              setSelectedProduct({ id: 0, name: "", price: 0 });
              setIsCreating(true);
              setIsModalOpen(true);
            }}
        >
          Add Product
        </button>

        {loading ? (
            <p>Loading products...</p>
        ) : (
            <table>
              <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>R$ {p.price.toFixed(2)}</td>
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
        {isModalOpen && selectedProduct && (
            <EditProductModal
                product={selectedProduct}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                isCreating={isCreating}
            />
        )}

      </div>
  );
}


