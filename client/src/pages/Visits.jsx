import { useState, useEffect } from "react";

const Visits = () => {
    const [visits, setVisits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVisits();
    }, []);

    const fetchVisits = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API}/get-visits`);
            const data = await response.json();
            setVisits(data.visits);
            setLoading(false);
        } 
        catch (err) {
            console.error("Error fetching visits:", err);
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px", backgroundColor: "#111", color: "#fff", fontFamily: "sans-serif" }}>
            <h2>All Visits: </h2>
            {loading ? (
                <p>Loading...</p>
            ) 
            : (
                <table style={{ width: "100%",  borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th style={{ border: "1px solid #ccc", padding: "8px" }}>User ID</th>
                            <th style={{ border: "1px solid #ccc", padding: "8px" }}>IP Address</th>
                            <th style={{ border: "1px solid #ccc", padding: "8px" }}>User Agent</th>
                            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Visited At</th>
                            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Request Type</th>
                            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Progress</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visits.map((visit) => (
                            <tr key={visit._id}>
                                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{visit.userId.split("_")[0] === "AMG" ? "You" : visit.userId}</td>
                                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{visit.ipAddress}</td>
                                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{visit.userAgent}</td>
                                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{new Date(visit.visitedAt).toLocaleString()}</td>
                                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{visit.requestType}</td>
                                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{visit.progress || "UnAvailable"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Visits;
