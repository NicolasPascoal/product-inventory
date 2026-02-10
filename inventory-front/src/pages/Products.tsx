import { useEffect, useState } from "react";
import { api } from "../services/api";
import "../products.css"; // vamos criar esse CSS baseado no que você mandou

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(api.defaults.baseURL + "/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <h1>Produtos</h1>
      <button onClick={() => alert("Implementar função de adicionar produto")}>
        Adicionar Produto
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
              <th>Ações</th>
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
                    onClick={() => alert("Editar produto " + p.id)}
                  >
                    Editar
                  </button>
                  <button
                    style={{ background: "#ef4444" }}
                    onClick={() => alert("Excluir produto " + p.id)}
                  >
                    Excluir
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
