import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

const Sidebar = ({ setActivePage, activePage }) => {
    const [openMenu, setOpenMenu] = useState({
        masters: true,
        config: true
    });

    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); // ✅ Valid hook usage

    const toggleMenu = (menu) => {
        setOpenMenu(prev => ({ ...prev, [menu]: !prev[menu] }));
    };

    const handleLogout = () => {
        navigate('/');
    };

    const handleResetPage = () => {
        setActivePage('Master');
    };

    // List of menu items for dynamic filtering
    const menuItems = {
        Masters: [
            { label: 'User', key: 'UserCreate' },
            { label: 'Entities', key: 'Entities' },
            { label: 'OutputTables', key: 'OutputTables' },
            { label: 'Visualize Tables', key: 'VisualizeTables' }
        ],
        Config: [
            { label: 'Run Configuration', key: 'UserInput' }
        ]
    };

    // Filter function based on searchTerm
    const filteredMenuItems = Object.entries(menuItems).reduce((acc, [section, items]) => {
        const filtered = items.filter(item =>
            item.label.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filtered.length > 0) acc[section] = filtered;
        return acc;
    }, {});

    return (
        <aside className="w-64 min-w-[16rem] bg-gray-800 text-white h-screen flex flex-col shadow-lg">
            {/* Header with title and close button */}
            <div className="flex justify-between items-center p-4 font-bold text-xl border-b border-gray-700">
                <span>Rule Engine</span>
                <button onClick={handleResetPage}>
                    <IoMdClose className="text-white hover:text-red-400" />
                </button>
            </div>

            {/* Search Bar */}
            <div className="px-4 py-2">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-2 py-1 rounded bg-gray-700 text-white placeholder-gray-400"
                />
            </div>

            {/* Menu List */}
            <div className="flex-1 overflow-y-auto px-2">
                {/* Masters Menu */}
                {filteredMenuItems.Masters && (
                    <div>
                        <button
                            onClick={() => toggleMenu('masters')}
                            className="w-full flex justify-between items-center px-2 py-2 hover:bg-gray-700 rounded"
                        >
                            <span className="flex items-center space-x-2">
                                <i className="bx bx-layer"></i>
                                <span>Masters</span>
                            </span>
                            {openMenu.masters ? <FaChevronDown /> : <FaChevronRight />}
                        </button>

                        {openMenu.masters && (
                            <div className="ml-6 mt-1 space-y-1">
                                {filteredMenuItems.Masters.map(item => (
                                    <button
                                        key={item.key}
                                        onClick={() => setActivePage(item.key)}
                                        className={`w-full text-left px-2 py-1 rounded hover:bg-gray-700 ${activePage === item.key ? 'bg-gray-700' : ''}`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Config Menu */}
                {filteredMenuItems.Config && (
                    <div className="mt-4">
                        <button
                            onClick={() => toggleMenu('config')}
                            className="w-full flex justify-between items-center px-2 py-2 hover:bg-gray-700 rounded"
                        >
                            <span className="flex items-center space-x-2">
                                <i className="bx bx-cog"></i>
                                <span>Config</span>
                            </span>
                            {openMenu.config ? <FaChevronDown /> : <FaChevronRight />}
                        </button>

                        {openMenu.config && (
                            <div className="ml-6 mt-1 space-y-1">
                                {filteredMenuItems.Config.map(item => (
                                    <button
                                        key={item.key}
                                        onClick={() => setActivePage(item.key)}
                                        className={`w-full text-left px-2 py-1 rounded hover:bg-gray-700 ${activePage === item.key ? 'bg-gray-700' : ''}`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Logout */}
            <div
                className="p-4 border-t border-gray-700 hover:bg-red-600 cursor-pointer"
                onClick={handleLogout}
            >
                <span className="flex items-center space-x-2">
                    <i className="bx bx-log-out"></i>
                    <span>Logout</span>
                </span>
            </div>
        </aside>
    );
};

export default Sidebar;
