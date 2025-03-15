import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [data, setData] = useState([]);
    const [sortConfig, setSortConfig] = useState({
        by: "date",
        order: "desc"
    });

    useEffect(() => {
        // Fetch data whenever sort configuration changes
        fetch(`https://jsonmodel-production.up.railway.app/members/sort?by=${sortConfig.by}&order=${sortConfig.order}`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error("Error fetching data:", error));
    }, [sortConfig]); // Re-fetch when sort config changes

    // Function to handle column header clicks
    const handleSort = (column) => {
        setSortConfig(prevState => {
            // If clicking the same column, toggle the sort order
            if (prevState.by === column) {
                return {
                    by: column,
                    order: prevState.order === "asc" ? "desc" : "asc"
                };
            }
            // If clicking a different column, default to ascending
            return {
                by: column,
                order: "asc"
            };
        });
    };

    // Function to render sort direction indicators
    const getSortIndicator = (column) => {
        if (sortConfig.by === column) {
            return sortConfig.order === "asc" ? " ↑" : " ↓";
        }
        return "";
    };

    return (
        <div>
            <h1>Stock Market Data</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th onClick={() => handleSort("date")} >
                            Date {getSortIndicator("date")}
                        </th>
                        <th onClick={() => handleSort("trade_code")} >
                            Trade Code {getSortIndicator("trade_code")}
                        </th>
                        <th onClick={() => handleSort("high")} >
                            High {getSortIndicator("high")}
                        </th>
                        <th onClick={() => handleSort("low")} >
                            Low {getSortIndicator("low")}
                        </th>
                        <th onClick={() => handleSort("open")} >
                            Open {getSortIndicator("open")}
                        </th>
                        <th onClick={() => handleSort("close")} >
                            Close {getSortIndicator("close")}
                        </th>
                        <th onClick={() => handleSort("volume")} >
                            Volume {getSortIndicator("volume")}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.date}</td>
                            <td>{item.trade_code}</td>
                            <td>{item.high}</td>
                            <td>{item.low}</td>
                            <td>{item.open}</td>
                            <td>{item.close}</td>
                            <td>{item.volume}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;