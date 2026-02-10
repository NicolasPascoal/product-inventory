import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Dashboard() {

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    function loadProduction() {
        setLoading(true);

        api.get("/production/suggested")
            .then(res => setData(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        loadProduction();
    }, []);

    if (loading) return <p>loading...</p>;

    return (
        <div className="container">
            <h1>Productions</h1>

            <button onClick={loadProduction}>
                Update
            </button>

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
                {data?.productionPlan?.map((item: any, index: number) => (
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
