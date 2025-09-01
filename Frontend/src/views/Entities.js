import React, { useEffect, useState, useRef } from "react";
import Modal from 'react-modal'
import 'boxicons'
import axios from "axios";
import * as XLSX from 'xlsx'
import { useMutation } from "@tanstack/react-query";
import $, { error } from 'jquery'
import TextField from "@mui/material/TextField";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";
import 'datatables.net-dt/css/dataTables.dataTables.css'
import 'datatables.net'
import './Entities.css'
import { toast } from "react-hot-toast";
import { use } from "react";
import { FaPlus } from 'react-icons/fa';


const Entities = ({ setTriggerModal }) => {
    const [entityName, setEntityName] = useState('');   // Holds Entity Name
    const [dimensionName, setDimensionName] = useState(''); //Holds Dimension Name
    const [uploadType, setUploadType] = useState('');   // Holds Upload Type Selection
    const [isModalOpen, setIsModalOpen] = useState(false); // Handles displaying modal
    const [isDisabled, setIsDisabled] = useState(true);    // Handles Next button disable attr of upload select
    const [isDisabled1, setIsDisabled1] = useState(true);    // Handles Next button disable attr of upload select
    const [isValid, setIsValid] = useState(true);    // Handles Next button disable attr of upload select
    const [isPage, setIsPage] = useState('uploadSelect');   // Holds which modal should be displayed
    const [fileStep, setFileStep] = useState(1);   // handles which steps of file upload displays
    const [fileName, setFileName] = useState("");   // Holds uploaded file name
    const [data, setData] = useState([]);           // Holds the table data
    const [viewData, setViewData] = useState([]);           // Holds the table data
    const [headers, setHeaders] = useState([]);      // Holds the headers for editing
    const [file, setFile] = useState(null); // Store the actual file
    const [isDragOver, setIsDragOver] = useState(false); // State to track drag over
    const tableRef = useRef(null);  // Holds Dimension Details table ref
    const [selectedRowName, setSelectedRowName] = useState();
    const [totalRows, setTotalRows] = useState();
    const [files, setFiles] = useState([]);
    const [newName, setNewName] = useState();
    const [datatypes, setDatatypes] = useState();
    const [host, setHost] = useState('');
    const [port, setPort] = useState('');
    const [dbName, setDbName] = useState('');
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    const [db, setDb] = useState('mysql');
    const [sql, setSql] = useState('');
    const [sqlData, setSqlData] = useState([]);
    const [sqlDataHeaders, setSqlDataHeaders] = useState([]);
    const [reUploadDisable, setReUploadDisable] = useState(false);

    const notify = () => toast.success('Here is your toast.');

    // Triggers next button disable property
    useEffect(() => {
        if (dimensionName != '' && uploadType != '') {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [dimensionName, uploadType]);

    useEffect(() => {
        if (host != '' && port != '' && db != '' && dbName != '' && username != '' && pwd != '' && sql != '') {
            setIsDisabled1(false);
        } else {
            setIsDisabled1(true);
        }

    }, [host, port, db, dbName, username, pwd, sql])

    useEffect(() => {
        if (fileName != '') {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    }, [fileName]);

    // Logic for upload type selection
    const setUpload = (type) => {
        if (type == 'File' && (uploadType == '' || uploadType == 'SQL')) {
            setUploadType('File')
        } else if (type == 'SQL' && (uploadType == '' || uploadType == 'File')) {
            setUploadType('SQL')
        } else {
            setUploadType('')
        }
    }

    // Mutation to save data to backend
    const saveDataMutation = useMutation({
        mutationFn: (formData) =>
            axios.post("http://localhost:8083/api/upload-file", formData),
        // axios.get('http://localhost:8083/entity/getAll'),
        onSuccess: (response) => {
            console.log("Data successfully saved:", response.data);
            toast.success('Data successfully saved.');
            closeModal();
            setIsPage('uploadSelect');
        },
        onError: (error) => {
            console.error("Error saving data:", error);
            // alert("Failed to save data.");
        },
    });

    // console.log(saveDataMutation);

    // Initialize or reinitialize DataTable when data changes
    useEffect(() => {
        if (data.length && tableRef.current && fileStep == 2 & uploadType != 'SQL') {
            console.log(data);
            console.log(headers);
            console.log(headers.map(header => ({ title: header.customName, data: header.customName })));
            $(tableRef.current).DataTable({
                data: data,
                columns: headers.map((header) => ({ title: header.customName, data: header.customName })),
                destroy: true, // Allows reinitializing DataTable
                scrollX: true,
                autoWidth: false
            });
        } else if (data.length && fileStep == 4) {
            // console.log(selectedRowName);
            if (selectedRowName) {

                const fetchData = async () => {
                    try {
                        const response = await axios.get('http://localhost:8083/entity/data', {
                            params: {
                                tableName: selectedRowName,
                                page: 1,
                                size: 10
                            },
                        });

                        setViewData(response.data.data);
                        setTotalRows(response.data.totalRows);

                        const headerColumns = Object.keys(response.data.data[0] || {}).map((key) => ({
                            title: key.replace(/_/g, ' ').toUpperCase(),
                            data: key,
                        }));

                        setHeaders(headerColumns);
                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }
                };

                fetchData();
            }
        } else if (uploadType == 'SQL' && fileStep == 2) {
            const payload = {
                dbType: db,
                host: host,
                port: port,
                dbName: dbName,
                username: username,
                password: pwd,
                sql: sql
            }
            console.log(payload)
            const fetchResp = async () => {
                try {
                    const response = await axios.post('http://localhost:8083/api/database/executeSql', payload);
                    console.log(response)
                    setSqlData(response.data.data);

                    // setTotalRows(response.data.totalRows);

                    const headerColumns = Object.keys(response.data.data[0] || {}).map((key) => ({
                        title: key.replace(/_/g, ' ').toUpperCase(),
                        data: key,
                    }));
                    console.log(headerColumns)
                    setSqlDataHeaders(headerColumns);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }

            fetchResp();

        } else if (fileStep == 1) {
            if (fileStep == 1) {
                $('#fileTable').DataTable();
            }
        }
    }, [fileStep, isPage]);

    useEffect(() => {
        if (sqlDataHeaders.length > 0) {
            const table = $('#sqlDataView').DataTable({
                columns: sqlDataHeaders,
                scrollX: true,
                data: sqlData
            });
            // Cleanup on component unmount
            return () => {
                table.destroy();
            };
        }
    }, [sqlDataHeaders])

    useEffect(() => {
        if (headers.length > 0) {
            // Destroy previous instance if exists
            console.log(viewData)
            const containerHeight = $('#TableContainer').height();
            const table = $('#viewEntity').DataTable({
                serverSide: true,
                processing: true,
                scrollX: true,
                scrollY: containerHeight - 140,
                searching: false,
                ajax: async (data, callback) => {
                    try {
                        const response = await axios.get('http://localhost:8083/entity/data', {
                            params: {
                                tableName: selectedRowName,
                                page: data.start + 1, // Start index for pagination
                                size: data.length, // Number of records per page
                            },
                        });

                        callback({
                            draw: data.draw,
                            recordsTotal: response.data.totalRows,
                            recordsFiltered: response.data.totalRows,
                            data: response.data.data,
                        });
                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }
                },
                columns: headers,
                pageLength: 10,
            });

            // Cleanup on component unmount
            return () => {
                table.destroy(true);
            };
        }
    }, [headers, totalRows]);

    // Validate uploaded file extension and sets file, file name and file data in state variable
    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile && (uploadedFile.type === "application/vnd.ms-excel" ||
            uploadedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
            uploadedFile.type === "text/csv")) {
            readExcel(uploadedFile);
            setFile(uploadedFile); // Store the actual file
            setFileName(uploadedFile.name)
        } else {
            alert("Please upload only Excel or CSV files.");
        }
    };


    const readExcel = (file) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const binaryStr = event.target.result;
            let jsonData = [];

            if (file.type === "text/csv") {
                const csvData = XLSX.read(binaryStr, { type: "string" });
                jsonData = XLSX.utils.sheet_to_json(csvData.Sheets[csvData.SheetNames[0]]);
            } else {
                const workbook = XLSX.read(binaryStr, { type: "binary" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                jsonData = XLSX.utils.sheet_to_json(worksheet, {
                    raw: true,
                    cellDates: true
                });
            }

            // Process each row, converting any detected date serials to Date objects
            jsonData = jsonData.map(row => {
                const convertedRow = {};
                for (const key in row) {
                    const value = row[key];
                    convertedRow[key] = detectAndConvertDate(value);
                }
                return convertedRow;
            });


            // Extract headers and determine data types
            const initialHeaders = jsonData.length ? Object.keys(jsonData[0]) : [];
            const headersWithDataTypes = initialHeaders.map((header) => {
                const columnData = jsonData.map(row => row[header]);
                return {
                    originalName: header,
                    customName: header,
                    dataType: deduceDataType(columnData)
                };
            });

            const formattedData = prepareDataForDisplay(jsonData);
            setData(formattedData);
            setHeaders(headersWithDataTypes);
        };

        if (file.type === "text/csv") {
            reader.readAsText(file);
        } else {
            reader.readAsBinaryString(file);
        }
    };

    // For display in the table or export, use `formatDateForDisplay`
    function prepareDataForDisplay(data) {
        console.log(data)
        return data.map(row => {
            const formattedRow = {};
            for (const key in row) {
                const value = row[key];
                formattedRow[key] = value instanceof Date ? formatDateForDisplay(value) : value;
            }
            return formattedRow;
        });
    }

    // Detect date values and retain Date objects internally
    function detectAndConvertDate(value) {
        if (typeof value === 'number' && isExcelDateSerial(value)) {
            return convertExcelDateToDateObject(value);
        }
        if (typeof value === 'string' && isValidDate(value)) {
            return new Date(value);
        }
        return value;
    }

    // Keep date as Date object
    function convertExcelDateToDateObject(serial) {
        const excelEpoch = new Date(1899, 11, 30);
        const daysOffset = serial - 1;
        return new Date(excelEpoch.getTime() + daysOffset * 86400000);
    }

    // Helper function for formatting to "dd/mm/yyyy" on display
    function formatDateForDisplay(date) {
        if (date instanceof Date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }
        return date;
    }

    // deduceDataType function remains the same
    function deduceDataType(columnData) {
        const typeCounts = { number: 0, string: 0, date: 0, boolean: 0 };
        columnData.forEach((value) => {
            if (typeof value === 'number') {
                typeCounts.number++;
            } else if (value instanceof Date) {
                typeCounts.date++;
            } else if (typeof value === 'string') {
                typeCounts.string++;
            } else if (typeof value === 'boolean') {
                typeCounts.boolean++;
            }
        });

        return Object.keys(typeCounts).reduce((a, b) =>
            typeCounts[a] > typeCounts[b] ? a : b
        );
    }


    // Function to identify Excel date serial numbers
    function isExcelDateSerial(value) {
        const dateThreshold = 60; // Excel dates start from 1900-03-01
        const maxDateSerial = 73000; // Corresponds to the year 2099 approx
        return value >= dateThreshold && value <= maxDateSerial;
    }

    // Function to validate date-like strings
    function isValidDate(dateString) {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
    }


    // Handle the drag-and-drop functionality
    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragOver(false);
        const uploadedFile = event.dataTransfer.files[0];
        if (uploadedFile) {
            handleFileChange({ target: { files: [uploadedFile] } });
        }
    };


    // saves header and data type change
    const handleHeaderChange = (oldName, newname) => {
        setNewName({
            ...newName,
            [oldName]: newname
        })
    };

    const handleDataTypeChange = (column, dataType) => {
        setHeaders({
            ...headers,
            [column]: dataType
        })
    };

    const handleSave2 = async () => {
        const payload = {
            dbType: db,
            host: host,
            port: port,
            dbName: dbName,
            username: username,
            password: pwd,
            sql: sql,
            targetTableName: dimensionName
        }

        try {
            const response = await axios.post('http://localhost:8083/api/database/transferData', payload);

            if (response.data.message == 'success') {
                toast.success('Data Saved Sucessfully');
                closeModal();
                setIsPage('uploadSelect');
            }
        } catch (error) {
            toast.error('Failed to save data:- ' + error);
        }
    }

    // handle payload creation and invoke api call function
    const handleSave = async () => {
        // Prepare data for API
        // const renamedData = data.map((row) => {
        //     const updatedRow = {};
        //     headers.forEach((header) => {
        //         updatedRow[header.customName] = row[header.originalName];
        //     });
        //     return updatedRow;
        // });

        // Create FormData to send
        // const formData = new FormData();
        // formData.append("file", file); // Include the actual file
        // formData.append("columns", JSON.stringify(headers)); // Send headers
        // formData.append("data", JSON.stringify(renamedData)); // Send renamed data
        // formData.append("tableName", dimensionName);
        const columnMappings = {};
        for (const key of Object.keys(headers)) {
            columnMappings[key] = {
                newName: newName[key],
                dataType: headers[key]
            };
        }
        const result = {
            fileName: fileName,
            tableName: dimensionName,
            columnMappings
        }

        console.log(result);
        // Log each key-value pair in FormData
        // for (const [key, value] of formData.entries()) {
        //     console.log(`${key}:`, value);
        // }

        // Trigger the mutation and await its completion
        try {
            await saveDataMutation.mutateAsync(result); // Trigger the mutation
        } catch (error) {
            toast.error('Failed to save data:- ' + error);
        }
    };

    // Function to trigger the modal open
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal and clear state
    const closeModal = () => {
        console.log('modal close')
        setEntityName('');
        setUploadType('');
        setDimensionName('')
        setReUploadDisable(false);
        // setData([]);
        setFile(null);
        setFileName('');
        setHeaders([]);
        setIsPage('uploadselect');
        setFileStep(1);
        setIsModalOpen(false);
    };

    const customStyles = {
        content: {
            padding: 0,
            borderRadius: '15px'
        },
    };

    // When this component mounts, pass the modal trigger to Page1
    useEffect(() => {
        console.log(setTriggerModal)
        if (setTriggerModal) {
            setTriggerModal(() => openModal);
        }
    }, [setTriggerModal]);
    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await axios.get('http://localhost:8083/entity/getAll');
                console.log(response.data);
                const result = response.data;
                if (Array.isArray(result)) {
                    setData(result);

                } else {
                    console.error("Expected array but got:", result);
                    toast.error("Received unexpected data from backend");
                    setData([]);
                }

            }
            fetchData();
        } catch (error) {
            toast.error(error);
        }
    }, [isModalOpen]);

    useEffect(() => {
        // Reinitialize DataTable with new data
        if (data.length > 0) {
            console.log('DataTable initialization with new data');

            // Destroy the existing DataTable instance if it exists
            if ($.fn.DataTable.isDataTable('#entityTable')) {
                $('#entityTable').DataTable().destroy();
            }

            // Initialize DataTable with data
            $('#entityTable').DataTable({
                data: data.map(item => [
                    item.dimensionTableName,
                    item.dimensionType === 1 ? 'File Upload' : 'SQL Upload',
                    '03-01-2024', // Static date or use dynamic if available
                    item.dimensionTableName
                ]),
                columns: [
                    { title: "Dimension Table Name" },
                    { title: "Dimension Type" },
                    { title: "Date" },
                    {
                        title: "Action",
                        render: function (data, type, row) {
                            // Create a container div to hold both buttons
                            const container = $('<div>', {
                                class: 'flex justify-center items-center space-x-2' // Add some spacing between buttons
                            });

                            // Create the Edit button
                            const reUpload = $('<button>', {
                                class: 'text-blue-500 hover:text-blue-700 flex items-center view-button reUpload',
                                'data-id': data,
                                'data-tooltip-id': "my-tooltip",
                                'data-tooltip-content': "Re-upload"
                            }).append('Re-Upload');

                            // Append both buttons to the container
                            container.append(reUpload);

                            // Return the container's outer HTML
                            return container.prop('outerHTML');
                        }
                    }
                ],
                destroy: true, // Allows reinitialization
            });

            $('#entityTable tbody').on('click', 'button', function () {
                const reUpload = $(this).data('id');
                if ($(this).hasClass('reUpload')) {
                    // viewElement(dimesnionID);
                    setReUploadDisable(true);
                    setDimensionName(reUpload);
                    setIsModalOpen(true);
                }
            });

            // Attach click event listener with delegation
            $('#entityTable tbody').off('click', 'td:first-child').on('click', 'td:first-child', function () {
                const table = $('#entityTable').DataTable();
                const rowData = table.row($(this).closest('tr')).data();
                // const rowData = table.row(this).data();

                console.log('Row Data:', rowData);

                // Example of using the fetched data
                if (rowData.length > 0) {
                    setSelectedRowName(rowData[0]);
                    setIsPage('fileUpload');
                    openModal();
                    setFileStep(4);
                }
            });

            // Cleanup function to remove event listeners on component unmount
            return () => {
                $('#entityTable tbody').off('click', 'tr');
            };
        }
    }, [data]);

    useEffect(() => {
        if (fileStep == 1 && uploadType != 'SQL') {
            const fetchFiles = async () => {
                const response = await axios.get('http://localhost:8083/api/files');
                setFiles(response.data);
            }
            fetchFiles();
        } else if (fileStep == 2 && uploadType != 'SQL') {
            const fetchColumnData = async () => {
                try {
                    const response = await axios.get('http://localhost:8083/api/file-headers', {
                        params: {
                            fileName: fileName
                        },
                    }
                    );
                    setHeaders(response.data);
                    setDatatypes(response.data);
                    // Transform the data into the desired format
                    const transformedData = {};
                    for (const key of Object.keys(response.data)) {
                        transformedData[key] = key;
                    }

                    // Store the transformed data in the state variable
                    setNewName(transformedData);
                }
                catch (error) {
                    toast.error(error.status);
                }
            }
            fetchColumnData();
        }
    }, [fileStep]);

    useEffect(() => {
        console.log(headers);
        // console.log(newName)
    }, [headers, newName])

    function handleReqClose() {
        closeModal();
        setIsPage('uploadSelect');
    }

    function setIsPageValue() {
        if (uploadType == 'SQL') {
            setIsPage('SQL');
        } else {
            setIsPage('fileUpload')
        }
    }
    return (
        <>
            {/* <div>

        </div> */}
            <div className="w-full h-screen bg-gray-50">
                {/* Navbar */}
                <nav className="flex items-center px-4 py-3 bg-white shadow-md">
                    {/* Plus Icon and Label */}
                    <button
                        onClick={openModal}
                        className="flex items-center space-x-2 text-white bg-[#32bef0] hover:bg-blue-700 px-3 py-2 rounded-full"
                    >
                        <FaPlus />
                        <span className="text-sm  font-medium">Add Entities</span>
                    </button>
                </nav>

                {/* Main Content */}
                <div className={`h-[calc(100dvh-96px)] w-[calc(100dvw-185px)] overflow-y-auto`}>
                    <div className="p-3 border-t h-full">

                        <table id="entityTable" className="w-full hover cell-border custom-headers"></table>
                        {/* <h1><box-icon onClick={openModal} type='solid' size='sm' color='orange' name='plus-circle'></box-icon></h1>  */}
                        <Modal
                            isOpen={isModalOpen}
                            // onAfterOpen={afterOpenModal}
                            onRequestClose={handleReqClose}
                            style={customStyles}
                            contentLabel="Entity Modal"
                        >
                            {isPage == "uploadSelect" && (
                                <div className={`w-full h-full grid grid-rows-[auto_1fr_auto] ${saveDataMutation.isPending ? 'cursor-wait pointer-events-none' : ''}`}>
                                    <div className="flex flex-row justify-between px-4 border-b mb-2 w-full h-12">
                                        <div className="flex flex-row">
                                            <span className="flex items-center h-full">
                                                <box-icon size='sm' name='rename'></box-icon>
                                            </span>
                                            <span className="flex items-center h-full ml-2 font-semibold">
                                                Data Reader
                                            </span>
                                        </div>
                                        <div className="flex items-center h-full w-fit">
                                            <button onClick={() => { closeModal(); setIsPage('uploadSelect') }}>
                                                <box-icon name='x'></box-icon>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="px-4 overflow-y-auto">
                                        <div className="grid grid-rows-[repeat(5,auto)] grid-cols-[1fr_1fr]  gap-3">
                                            <div className="col-span-full">
                                                General Info
                                            </div>
                                            <div className="inlne-block">
                                                <div className="pb-5">
                                                    <div className="px-2 inline-flex items-baseline box-border w-full">
                                                        <div className="">
                                                            <TextField disabled={reUploadDisable} value={dimensionName} id="standard-basic" autoComplete="manual_entity_name" label="Entity Name" onChange={(e) => { setDimensionName(e.target.value) }} variant="standard" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-[16px] col-span-full">
                                                Choose data reader type
                                            </div>
                                            <button onClick={() => { setUpload('File') }} className={`${uploadType == 'File' ? 'border-sky-400 border-2 shadow-sky-200' : ''} grid grid-rows-[auto_1fr] grid-cols-[auto_1fr] gap-y-[1.6em] box-border rounded-sm cursor-pointer border-[1px] shadow-md p-4 h-40 `}>
                                                <span className="row-[1] col-[1] pr-8">
                                                    <box-icon size='sm' className='' name='file-blank' ></box-icon>
                                                </span>
                                                <h1 className="text-xl text-left mb-[16px] row-[1] col-[2]">
                                                    File
                                                </h1>
                                                <div className="row-[2] text-left text-sm col-span-full">
                                                    Select the data set to load and analyse a local file on the machine where this Platform is installed or an Http file.
                                                </div>
                                            </button>
                                            <button onClick={() => { setUpload('SQL') }} className={`${uploadType == 'SQL' ? 'border-sky-400 border-2 shadow-sky-200' : ''} grid grid-rows-[auto_1fr] grid-cols-[auto_1fr] gap-y-[1.6em] box-border rounded-sm cursor-pointer border-[1px] shadow-md p-4 h-40 `}>
                                                <span className="row-[1] col-[1] pr-8">
                                                    <box-icon size='sm' className='' name='file-blank' ></box-icon>
                                                </span>
                                                <h1 className="text-xl text-left mb-[16px] row-[1] col-[2]">
                                                    SQL
                                                </h1>
                                                <div className="row-[2] text-left text-sm col-span-full">
                                                    Select the data set to load and analyse a local file on the machine where this Platform is installed or an Http file.
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full h-12 border-t">
                                        <div className="flex justify-between h-full w-full p-2">
                                            <div></div>
                                            <div className="flex flex-row h-full">
                                                <button onClick={() => { closeModal(); setIsPage('uploadSelect') }} className="p-2 rounded-md red-button flex h-full items-center">
                                                    <box-icon color='red' name='x'></box-icon>  CANCEL
                                                </button>
                                                <button disabled={isDisabled} onClick={() => setIsPageValue()} className="ml-3 primary-button rounded-md flex h-full items-center px-4 disabled:bg-gray-200 disabled:text-gray-500">
                                                    NEXT
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {(uploadType == "File" && fileStep != 4 && isPage == 'fileUpload') && (
                                <div className={`w-full h-full grid grid-rows-[auto_1fr_auto] ${saveDataMutation.isPending ? 'cursor-wait' : ''}`}>
                                    <div className="flex flex-row justify-between px-4 border-b mb-2 w-full h-12">
                                        <div className="flex flex-row">
                                            <span className="flex items-center h-full">
                                                <box-icon size='sm' name='rename'></box-icon>
                                            </span>
                                            <span className="flex items-center h-full ml-2 text font-semibold">
                                                Data Reader File
                                            </span>
                                        </div>
                                        <div className="flex items-center h-full w-fit">
                                            <button onClick={() => { closeModal(); setIsPage('uploadSelect') }}>
                                                <box-icon name='x'></box-icon>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="px-4 overflow-y-auto">
                                        <div className="flex flex-col">
                                            <div className="text-xs col-span-full mb-2">
                                                Fill up the data reader properties
                                            </div>
                                            <div className="mb-4">
                                                <Box sx={{ width: '100%' }}>
                                                    <Stepper activeStep={fileStep - 1} alternativeLabel>
                                                        <Step key={'Select file to process'}>
                                                            <StepLabel>{'Select File to process'}</StepLabel>
                                                        </Step>
                                                        <Step key={'Define Datatype'}>
                                                            <StepLabel>{'Define Datatype'}</StepLabel>
                                                        </Step>
                                                        <Step key={'Submit Data'}>
                                                            <StepLabel>{'Submit Data'}</StepLabel>
                                                        </Step>
                                                    </Stepper>
                                                </Box>
                                            </div>
                                            {fileStep == 1 && (
                                                <>
                                                    <div className="mb-[16px] text-sm block col-span-full">
                                                        Choose File to process
                                                    </div>
                                                    <div className="flex w-full">
                                                        {/* <div
                                                className={`file-upload-container ${isDragOver ? "drag-over" : ""}`} // Add className based on drag state
                                                onDragOver={handleDragOver}
                                                onDragLeave={handleDragLeave}
                                                onDrop={handleDrop}
                                            >
                                                <input
                                                    type="file"
                                                    id="file-upload"
                                                    className="file-upload-input"
                                                    onChange={handleFileChange}
                                                    accept=".xls,.xlsx, .csv" // Restrict to Excel files
                                                />
                                                <label htmlFor="file-upload" className="file-upload-label">
                                                    <span className="block w-full">Drag & drop files here or click to upload</span>
                                                    <span className="icon">📂</span>
                                                </label> */}

                                                        {/* Display the file name if a file has been selected */}
                                                        {/* {fileName && <p className="file-name">Selected File: {fileName}</p>} */}
                                                        {/* </div> */}
                                                        <div className="w-full">
                                                            {/* <form name='fileName' onSubmit={fileNameSetter}> */}
                                                            <table id="fileTable" className="w-full hover cell-border custom-headers">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Select</th>
                                                                        <th>File Name</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {files.map((file, index) => (
                                                                        <tr key={index}>
                                                                            <td><input type="radio" className="w-full h-3" name="file" onChange={() => { setFileName(file) }} /></td>
                                                                            <td>{file}</td>
                                                                        </tr>
                                                                    ))}

                                                                </tbody>
                                                            </table>
                                                            {/* </form> */}
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                            {fileStep == 2 && (
                                                <>
                                                    <div className="mb-[16px] block col-span-full text-sm">
                                                        Uploaded File Name : {fileName && <span className="file-name">{fileName}</span>}
                                                        <p className="flex items-center mt-2"> Dimension Name: &nbsp;<TextField variant="outlined" autoComplete="Entity_Dimension_Name" size="small" value={dimensionName} disabled /></p>
                                                    </div>
                                                    <div className="flex w-full flex-col">
                                                        <table>
                                                            <thead>
                                                                <tr className="border-b-[1px] border-solid text-sm text-center">
                                                                    <th className="py-2" width='40%'>Column Name</th>
                                                                    <th className="py-2" width='40%'>Field Name</th>
                                                                    <th className="py-2" width='20%'>Field Data Type</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {Object.entries(headers).map(([column, datatype, index]) => (
                                                                    <tr key={index} className="border-b-[1px] border-solid text-sm text-center">
                                                                        {/* <label>{header.originalName}</label> */}
                                                                        <td className="py-2" width='40%'>
                                                                            <input
                                                                                type="text"
                                                                                disabled
                                                                                value={column}
                                                                                className="w-3/4 border-[1px] focus:border-sky-400 border-solid py-1 px-1 rounded-md"
                                                                            />
                                                                        </td>
                                                                        <td className="py-2" width='40%'>
                                                                            <input
                                                                                type="text"
                                                                                value={newName[column]}
                                                                                onChange={(e) => handleHeaderChange(column, e.target.value)}
                                                                                className="w-3/4 border-[1px] outline-none focus:border-sky-400 border-solid py-1 px-1 rounded-md"
                                                                            />
                                                                        </td>
                                                                        <td className="py-2" width='20%'>
                                                                            <select
                                                                                value={datatype}
                                                                                onChange={(e) => handleDataTypeChange(column, e.target.value)}
                                                                                className="w-3/4 border-[1px] outline-none focus:border-sky-400 border-solid py-1 px-1 rounded-md"
                                                                            >
                                                                                <option value="">Select Data Type</option>
                                                                                <option value="VARCHAR">VARCHAR</option>
                                                                                <option value="DOUBLE">DOUBLE</option>
                                                                                <option value="DATE">DATE</option>
                                                                                <option value="INT">INT</option>
                                                                                <option value="TIMESTAMP">TIMESTAMP</option>
                                                                            </select>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </>
                                            )}

                                        </div>
                                    </div>
                                    <div className="w-full h-12 border-t">
                                        <div className="flex justify-between h-full w-full p-2">
                                            <div></div>
                                            <div className="flex flex-row h-full">
                                                <button onClick={() => { closeModal(); setIsPage('uploadSelect') }} className="p-2 rounded-md red-button flex h-full items-center">
                                                    <box-icon color='red' name='x'></box-icon>  CANCEL
                                                </button>
                                                {fileStep != 2 ? (
                                                    <button disabled={isValid} onClick={() => setFileStep(fileStep + 1)} className="ml-3 primary-button rounded-md flex h-full items-center px-4 disabled:bg-gray-200 disabled:text-gray-500">
                                                        NEXT
                                                    </button>
                                                ) : (
                                                    <button disabled={saveDataMutation.isPending} className="ml-3 primary-button rounded-md flex h-full items-center px-4 disabled:bg-gray-200 disabled:text-gray-500" onClick={handleSave} >
                                                        {saveDataMutation.isPending ? "Saving..." : "Save Changes"}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {fileStep == 4 && (
                                <>
                                    <div className="w-full h-full grid grid-rows-[auto_1fr_auto]">
                                        <div className="flex flex-row justify-between border-b px-4 w-full h-12">
                                            <div className="flex flex-col">
                                                {/* <span className="flex items-center h-full ml-2 text-lg font-semibold">
                                        Data Reader
                                    </span> */}
                                                <div className="my-[16px] block col-span-full font-semibold text-lg">
                                                    Entity Name : {selectedRowName && <span className="file-name font-semibold text-lg">{selectedRowName}</span>}
                                                </div>
                                            </div>
                                            <div className="flex items-center h-full w-fit">
                                                <button onClick={() => { closeModal(); setIsPage('uploadSelect') }}>
                                                    <box-icon name='x'></box-icon>
                                                </button>
                                            </div>
                                        </div>
                                        <div id='TableContainer' className="w-full px-4 overflow-x-auto">
                                            <table id='viewEntity' className="row-border w-full text-xs nowrap">
                                            </table>
                                            {/* <button onClick={handleNext}>Next</button> */}
                                        </div>
                                        <div className="w-full border-t h-12">
                                            <div className="flex justify-between h-full w-full p-2">
                                                <div></div>
                                                <div className="flex flex-row h-full">
                                                    <button onClick={() => { closeModal(); setIsPage('uploadSelect') }} className="p-2 rounded-md red-button flex h-full items-center">
                                                        <box-icon color='red' name='x'></box-icon>  CANCEL
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            {(uploadType == "SQL" && isPage == 'SQL') && (
                                <div className="w-full h-full grid grid-rows-[auto_1fr_auto]">
                                    <div className="flex flex-row justify-between px-4 w-full h-14">
                                        <div className="flex flex-row">
                                            <span className="flex items-center h-full">
                                                <box-icon size='md' name='rename'></box-icon>
                                            </span>
                                            <span className="flex items-center h-full ml-2 text-lg font-semibold">
                                                Data Reader File
                                            </span>
                                        </div>
                                        <div className="flex items-center h-full w-fit">
                                            <button onClick={() => { closeModal(); setIsPage('uploadSelect') }}>
                                                <box-icon name='x'></box-icon>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="px-4 overflow-y-auto">
                                        <div className="flex flex-col">
                                            <div className="text-xs col-span-full">
                                                Fill up the data reader properties
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="flex pb-2 items-start">
                                                    <button onClick={() => setFileStep(1)} className={`flex flex-col box-border p-[24px] w-[20%] process1 relative cursor-pointer hover:bg-gray-100 ${fileStep == 1 && ('bg-gray-100')}`}>
                                                        <div className="flex box-border px-4 justify-center w-full flex-row items-center">
                                                            <a className='flex h-[1.6rem] w-[1.6rem] relative items-center justify-center bg-gray-500  text-white rounded-[50%] text-lg pb-[1.5px]'>
                                                                1
                                                            </a>
                                                        </div>
                                                        <div className="text-center pt-[16px] w-full inline-block  ">
                                                            Fill Connection Details
                                                        </div>
                                                    </button>
                                                    <div className="flex flex-col box-border pt-[24px] w-[20%] process relative cursor-pointer ">

                                                    </div>
                                                    <button onClick={() => setFileStep(2)} className={`flex flex-col box-border p-[24px] w-[20%] process2 relative cursor-pointer hover:bg-gray-100 ${fileStep == 2 && ('bg-gray-100')}`}>
                                                        <div className="flex box-border px-4 justify-center w-full flex-row items-center">
                                                            <a className='flex h-[1.6rem] w-[1.6rem] relative items-center justify-center bg-gray-500 text-white rounded-[50%] text-lg pb-[1.5px]'>
                                                                2
                                                            </a>
                                                        </div>
                                                        <div className="text-center pt-[16px] w-full inline-block  ">
                                                            Dimension Data
                                                        </div>
                                                    </button>
                                                    <div className="flex flex-col box-border pt-[24px] w-[20%] process relative cursor-pointer ">

                                                    </div>
                                                    <button onClick={() => setFileStep(3)} className={`flex flex-col box-border p-[24px] w-[20%] process3 relative cursor-pointer hover:bg-gray-100 ${fileStep == 3 && ('bg-gray-100')}`}>
                                                        <div className="flex box-border px-4 justify-center w-full flex-row items-center">
                                                            <a className='flex h-[1.6rem] w-[1.6rem] relative items-center justify-center bg-gray-500  text-white rounded-[50%] text-lg pb-[2.5px]'>
                                                                3
                                                            </a>
                                                        </div>
                                                        <div className="text-center pt-[16px] w-full inline-block  ">
                                                            Execute Upload
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                            {fileStep == 1 && (
                                                <>
                                                    <div className="mb-[16px] block col-span-full">
                                                        Fill configuration data to process
                                                    </div>
                                                    <div className="flex w-full">
                                                        {/* <div
                                            className={`file-upload-container ${isDragOver ? "drag-over" : ""}`} // Add className based on drag state
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                        >
                                            <input
                                                type="file"
                                                id="file-upload"
                                                className="file-upload-input"
                                                onChange={handleFileChange}
                                                accept=".xls,.xlsx, .csv" // Restrict to Excel files
                                            />
                                            <label htmlFor="file-upload" className="file-upload-label">
                                                <span className="block w-full">Drag & drop files here or click to upload</span>
                                                <span className="icon">📂</span>
                                            </label> */}

                                                        {/* Display the file name if a file has been selected */}
                                                        {/* {fileName && <p className="file-name">Selected File: {fileName}</p>} */}
                                                        {/* </div> */}
                                                        <div className="w-full">
                                                            {/* <form name='fileName' onSubmit={fileNameSetter}> */}
                                                            {/* <table id="fileTable" className="w-full">
                                                        <thead>
                                                            <tr>
                                                                <td>Select</td>
                                                                <td>File Name</td>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {files.map((file, index) => (
                                                                <tr key={index}>
                                                                    <td><input type="radio" name="file" onChange={() => { setFileName(file) }} /></td>
                                                                    <td>{file}</td>
                                                                </tr>
                                                            ))}

                                                        </tbody>
                                                    </table> */}
                                                            <table className="row-border w-full">
                                                                <tr>
                                                                    <td width="20%">
                                                                        <label for="db">Select Database</label>
                                                                    </td>
                                                                    <td>
                                                                        <select name="db" onChange={(e) => { setDb(e.target.value) }} className="w-3/4 border p-1 mb-2 outline-none rounded focus:border-blue">
                                                                            <option value="mysql">MYSQL</option>
                                                                            <option value="postgresql">POSTGRESQL</option>
                                                                            <option value="oracle">ORACLE</option>
                                                                            <option value="mssql">MSSQL</option>
                                                                        </select>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="20%">
                                                                        <label for="host">Host</label>
                                                                    </td>
                                                                    <td>
                                                                        <input autoComplete="manual_entity_sql_host" type="text" onChange={(e) => { setHost(e.target.value) }} name="host" required placeholder="Enter Host" className=" p-1 rounded mb-2 w-3/4 border outline-none focus:border-blue" />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="20%">
                                                                        <label for="port">PORT</label>
                                                                    </td>
                                                                    <td>
                                                                        <input autoComplete="manual_entity_sql_port" type="text" name="port" onChange={(e) => { setPort(e.target.value) }} required placeholder="Enter Port Number" className=" p-1 rounded mb-2 w-3/4 border outline-none focus:border-blue" />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="20%">
                                                                        <label for="dbName">Database Name</label>
                                                                    </td>
                                                                    <td>
                                                                        <input autoComplete="manual_entity_sql_dbname" type="text" name="dbName" onChange={(e) => { setDbName(e.target.value) }} required placeholder="Enter Database Name" className=" p-1 rounded mb-2 w-3/4 border outline-none focus:border-blue" />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="20%">
                                                                        <label for="username">User Name</label>
                                                                    </td>
                                                                    <td>
                                                                        <input autoComplete="manual_entity_sql_dbusername" type="text" name="isername" onChange={(e) => { setUsername(e.target.value) }} required placeholder="Enter your User Name" className=" p-1 rounded mb-2 w-3/4 border outline-none focus:border-blue" />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="20%">
                                                                        <label for="password">Password</label>
                                                                    </td>
                                                                    <td>
                                                                        <input autoComplete="manual_entity_sql_dbpassword" type="text" name="password" onChange={(e) => { setPwd(e.target.value) }} required placeholder="Enter your password" className=" p-1 rounded mb-2 w-3/4 border outline-none focus:border-blue" />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="20%">
                                                                        <label for="sql">Sql Query</label>
                                                                    </td>
                                                                    <td>
                                                                        <textarea autoComplete="manual_entity_sql_sql" rows={4} onChange={(e) => { setSql(e.target.value) }} required placeholder="Type your query here.." className=" p-1 rounded mb-2 w-3/4 border outline-none focus:border-blue" />
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            {/* </form> */}
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                            {fileStep == 2 && (
                                                <>
                                                    <div className="mb-[16px] block col-span-full text-sm">
                                                        Uploaded File Name : {fileName && <span className="file-name">{fileName}</span>}
                                                        <p> Dimension Name: <input type="text" autoComplete="dimension_name" onChange={(e) => setDimensionName(e.target.value)} className="w-1/3 border-[1px] m-1 focus:border-sky-400 focus:outline-none border-solid py-1 px-1 rounded-md" required /></p>
                                                    </div>
                                                    <div className="flex w-full flex-col">
                                                        <table id='sqlDataView' className="row-border w-full text-xs nowrap">
                                                        </table>
                                                    </div>
                                                </>
                                            )}

                                        </div>
                                    </div>
                                    <div className="w-full h-14">
                                        <div className="flex justify-between h-full w-full p-4">
                                            <div></div>
                                            <div className="flex flex-row h-full">
                                                <button onClick={() => { closeModal(); setIsPage('uploadSelect') }} className="hover:bg-red-50 p-2 rounded-md text-red-600 font-semibold text-xs flex h-full items-center">
                                                    <box-icon color='red' name='x'></box-icon>  CANCEL
                                                </button>
                                                {fileStep != 2 ? (
                                                    <button disabled={isDisabled1} onClick={() => setFileStep(fileStep + 1)} className="ml-3 text-xs text-white bg-[#32bef0] rounded-md flex h-full items-center px-4 disabled:bg-gray-200 disabled:text-gray-500">
                                                        Proceed
                                                    </button>
                                                ) : (
                                                    <button disabled={saveDataMutation.isPending} className="ml-3 text-xs text-white bg-[#32bef0] rounded-md flex h-full items-center px-4 disabled:bg-gray-200 disabled:text-gray-500" onClick={handleSave2} >
                                                        {saveDataMutation.isPending ? "Saving..." : "Save Changes"}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Entities;