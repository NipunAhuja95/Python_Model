import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie,
    XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer
} from "recharts";

const VisualizeTables = () => {
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState("");
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [xAxis, setXAxis] = useState("");
    const [yAxis, setYAxis] = useState("");
    const [chartType, setChartType] = useState("Bar");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    // 1) Load tables list
    useEffect(() => {
        let mounted = true;
        axios.get("http://localhost:8083/api/output-tables")
            .then(res => { if (mounted) setTables(res.data || []); })
            .catch(e => { if (mounted) setErr("Failed to load tables"); console.error(e); });
        return () => { mounted = false; };
    }, []);

    // 2) When a table is selected → fetch its columns (use existing data endpoint with size=1)
    useEffect(() => {
        if (!selectedTable) { setColumns([]); setXAxis(""); setYAxis(""); setData([]); return; }
        setErr("");
        setLoading(true);
        axios.get("http://localhost:8083/api/output-tables/data", {
            params: { tableName: selectedTable, page: 1, size: 1 }
        })
            .then(res => {
                const cols = res?.data?.columns || [];
                setColumns(cols);
                setXAxis("");
                setYAxis("");
                setData([]); // clear any old plotted data
            })
            .catch(e => { setErr("Failed to load table columns"); console.error(e); })
            .finally(() => setLoading(false));
    }, [selectedTable]);

    // 3) Fetch chart data when user clicks Visualize
    const handleVisualize = () => {
        if (!selectedTable || !xAxis || !yAxis) { setErr("Select table, X and Y"); return; }
        setErr("");
        setLoading(true);
        axios.get("http://localhost:8083/api/visualize/data", {
            params: { tableName: selectedTable, xColumn: xAxis, yColumn: yAxis, chartType }
        })
            .then(res => {
                const rows = res?.data?.data || [];
                setData(rows);
            })
            .catch(e => { setErr("Failed to load chart data"); console.error(e); })
            .finally(() => setLoading(false));
    };

    const disabledVisualize = useMemo(
        () => !selectedTable || !xAxis || !yAxis || loading,
        [selectedTable, xAxis, yAxis, loading]
    );

    const renderChart = () => {
        if (!data?.length) {
            return <p className="text-gray-500">Pick X, Y and click “Visualize”.</p>;
        }
        switch (chartType) {
            case "Line":
                return (
                    <ResponsiveContainer width="100%" height={420}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={xAxis} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey={yAxis} />
                        </LineChart>
                    </ResponsiveContainer>
                );
            case "Pie":
                return (
                    <ResponsiveContainer width="100%" height={420}>
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey={yAxis}
                                nameKey={xAxis}
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                label
                            />
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                );
            default: // Bar
                return (
                    <ResponsiveContainer width="100%" height={420}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={xAxis} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey={yAxis} />
                        </BarChart>
                    </ResponsiveContainer>
                );
        }
    };

    return (
        <div className="p-6 w-full h-screen bg-gray-50">
            <h2 className="text-xl font-bold mb-4">Visualize Tables</h2>

            {/* Controls */}
            <div className="flex flex-wrap gap-4 mb-4 items-center">
                <select
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">Select a table</option>
                    {tables.map((t, i) => (
                        <option key={i} value={t}>{t}</option>
                    ))}
                </select>

                <select
                    value={xAxis}
                    onChange={(e) => setXAxis(e.target.value)}
                    className="border p-2 rounded"
                    disabled={!columns.length}
                >
                    <option value="">Select X Axis</option>
                    {columns.map((col, i) => (
                        <option key={i} value={col}>{col}</option>
                    ))}
                </select>

                <select
                    value={yAxis}
                    onChange={(e) => setYAxis(e.target.value)}
                    className="border p-2 rounded"
                    disabled={!columns.length}
                >
                    <option value="">Select Y Axis</option>
                    {columns.map((col, i) => (
                        <option key={i} value={col}>{col}</option>
                    ))}
                </select>

                <select
                    value={chartType}
                    onChange={(e) => setChartType(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="Bar">Bar</option>
                    <option value="Line">Line</option>
                    <option value="Pie">Pie</option>
                </select>

                <button
                    onClick={handleVisualize}
                    disabled={disabledVisualize}
                    className={`px-4 py-2 rounded text-white ${disabledVisualize ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
                >
                    {loading ? "Loading..." : "Visualize"}
                </button>

                {err && <span className="text-red-600">{err}</span>}
            </div>

            {/* Chart */}
            <div className="bg-white rounded shadow p-4">
                {renderChart()}
            </div>
        </div>
    );
};

export default VisualizeTables;
