import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Dashboard() {
    interface ProductionItem {
        product: string;
        quantity: number;
        totalValue: number;
    }

    interface ProductionResponse {
        totalValue: number;
        productionPlan: ProductionItem[];
    }


    const [data, setData] = useState<ProductionResponse | null>(null);
    const [loading, setLoading] = useState(false);

    async function loadProduction() {
        try {
            setLoading(true);

            const res = await api.get<ProductionResponse>("/production/suggested");
            setData(res.data);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        loadProduction();
    }, []);

    if (loading) return <p>loading...</p>;

    return (
        <div className="container">
            <div className="header">
                <h1>Productions</h1>
                <button onClick={loadProduction}>
                    Update
                </button>
            </div>

            <h2>Total: {data?.totalValue}</h2>

            <table>
                <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {data?.productionPlan?.map((item: ProductionItem, index: number) => (
                    <tr key={index}>
                        <td>{item.product}</td>
                        <td>{item.quantity}</td>
                        <td>{item.totalValue}R$</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
