import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net";

const OutputTables = () => {
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);
    const [headers, setHeaders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalRows, setTotalRows] = useState(0);

    // Fetch list of *_output tables
    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await axios.get("http://localhost:8083/api/output-tables");
                setTables(response.data);

                if ($.fn.DataTable.isDataTable("#outputTableList")) {
                    $("#outputTableList").DataTable().destroy();
                }

                $("#outputTableList").DataTable({
                    data: response.data.map((t) => [t]),
                    columns: [{ title: "Output Table Name" }],
                    destroy: true,
                });

                // Click handler on rows
                $("#outputTableList tbody").off("click").on("click", "tr", function () {
                    const table = $("#outputTableList").DataTable();
                    const rowData = table.row(this).data();
                    if (rowData && rowData[0]) {
                        setSelectedTable(rowData[0]);
                        setIsModalOpen(true);
                    }
                });
            } catch (err) {
                console.error("Error fetching output tables:", err);
            }
        };

        fetchTables();
    }, []);

    // When modal opens with a selected table, fetch its data
    useEffect(() => {
        if (selectedTable && isModalOpen) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(
                        "http://localhost:8083/api/output-tables/data",
                        {
                            params: { tableName: selectedTable, page: 1, size: 10 },
                        }
                    );

                    const { data, columns, totalRows } = response.data;
                    setTotalRows(totalRows);

                    const formattedColumns = columns.map((col) => ({
                        title: col.replace(/_/g, " ").toUpperCase(),
                        data: col,
                    }));

                    setHeaders(formattedColumns);

                    if ($.fn.DataTable.isDataTable("#viewOutputTable")) {
                        $("#viewOutputTable").DataTable().destroy();
                    }

                    $("#viewOutputTable").DataTable({
                        data: data,
                        columns: formattedColumns,
                        scrollX: true,
                        pageLength: 10,
                        destroy: true,
                    });
                } catch (err) {
                    console.error("Error fetching table data:", err);
                }
            };

            fetchData();
        }
    }, [selectedTable, isModalOpen]);

    return (
        <div className="p-4 w-full h-screen bg-gray-50">
            <h2 className="text-xl font-bold mb-4">Output Tables</h2>

            {/* Main Table List */}
            <table
                id="outputTableList"
                className="display w-full hover cell-border custom-headers"
            ></table>

            {/* Modal for viewing table data */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={{
                    content: { padding: 0, borderRadius: "15px", width: "90%", height: "90%", margin: "auto" },
                }}
            >
                <div className="w-full h-full grid grid-rows-[auto_1fr_auto]">
                    {/* Header */}
                    <div className="flex flex-row justify-between border-b px-4 w-full h-12">
                        <div className="flex flex-col justify-center">
                            <span className="font-semibold text-lg">
                                {selectedTable} ({totalRows} rows)
                            </span>
                        </div>
                        <div className="flex items-center h-full w-fit">
                            <button onClick={() => setIsModalOpen(false)}>
                                <box-icon name="x"></box-icon>
                            </button>
                        </div>
                    </div>

                    {/* DataTable */}
                    <div id="TableContainer" className="w-full px-4 overflow-x-auto">
                        <table
                            id="viewOutputTable"
                            className="row-border w-full text-xs nowrap"
                        ></table>
                    </div>

                    {/* Footer */}
                    <div className="w-full border-t h-12">
                        <div className="flex justify-end h-full w-full p-2">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 rounded-md red-button flex h-full items-center"
                            >
                                <box-icon color="red" name="x"></box-icon> CLOSE
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default OutputTables;
