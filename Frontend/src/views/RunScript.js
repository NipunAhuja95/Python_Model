import React, { useState } from 'react';
import Sidebar from './SideBar';
import Master from './Master';
import UserInput from './UserInput';
import Entities from './Entities';
import OutputTables from './OutputTables';
import VisualizeTables from './VisualizeTables';
import UserCreate from './UserCreate';
import './RunScript.css';
import { toast, ToastContainer } from 'react-toastify'; // Importing Toastify components
import 'react-toastify/dist/ReactToastify.css';

const RunScript = () => {
    // Set to null to show blank screen initially
    const [activePage, setActivePage] = useState(null);

    const renderPage = () => {
        switch (activePage) {
            case 'Master':
                return <Master />;
            case 'OutputTables':
                return <OutputTables />;
            case 'UserInput':
                return <UserInput />;
            case 'Entities':
                return <Entities />;
            case 'UserCreate':
                return <UserCreate />;
            case 'VisualizeTables':
                return <VisualizeTables />;
            default:
                return <Master />;; // blank screen
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar setActivePage={setActivePage} activePage={activePage} />
            <div id="mainContainer" className="flex-1 flex flex-col h-full">
                {renderPage()}
            </div>
        </div>
    );
};

export default RunScript;
