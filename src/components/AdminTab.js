import React, { useState } from 'react'
import { DashboardTab, OrderTab, ProductTab } from '../pages/admin-dashboard/index'
import { Link } from 'react-router-dom';

function AdminTab({elements}) {
    const data = [
        {
            id: 1,
            icon: 'dashboard',
            label: 'Dashboard',
            path:""
        },
        {
            id: 2,
            icon: 'assignment',
            label: 'Orders',
            path:'orders'
        },
        ,
        {
            id: 3,
            icon: 'info',
            label: 'Employee',
            path:'employee'
        },
        ,
        {
            id: 4,
            icon: 'info',
            label: 'Manager',
            path:'manager'
        },
        {
            id: 5,
            icon: 'production_quantity_limits',
            label: 'Products',
            path:'upload-company'
        },
        {
            id: 6,
            icon: 'apartment',
            label: 'Add Company',
            path:'add-company'
        },
        {
            id: 7,
            icon: 'supervisor_account',
            label: 'Add Manager',
            path:'add-manager'
        },
        {
            id: 8,
            icon: 'person_add',
            label: 'Add Employee',
            path:'add-employee'
        },
        {
            id: 9,
            icon: 'inventory',
            label: 'inventory',
            path:'inventory'
        },
        {
            id: 10,
            icon: 'production_quantity_limits',
            label: 'All Products',
            path: 'all-products'
        },
        {
            id: 11,
            icon: 'production_quantity_limits',
            label: ' All Companies',
            path: 'all-companies'
        },
    ];
    const [activeTab, setActiveTab] = useState(1);

    return (
        <div>
            <aside className="fixed top-14 left-0 z-40 whitespace-nowrap w-14 hover:w-64 h-screen transition-all duration-500 ease-in-out transform -translate-x-full sm:translate-x-0">
                <div className="h-full pl-3 py-4 overflow-y-auto bg-[#dfdfdf]">
                    <ul className="space-y-2 mt-7">
                        {/* Tabs Labels*/}
                        {data.map((item, index) => (
                         <Link to={item.path}>
                            <li key={index} className={activeTab === item.id ? `border-r-4 border-black` : ``}>
                                <span onClick={() => setActiveTab(item.id)} className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer`}>
                                    <span className="material-symbols-rounded w-6 h-6 text-gray-900 transition duration-75 ">
                                        {item.icon}
                                    </span>
                                    <span className="ml-3">{item.label}</span>
                                </span>
                            </li>
                         </Link>
                        ))}
                    </ul>
                </div>
            </aside>
            <main className="ml-14 mb-5 p-10  top-[56px] relative">
              {elements}
            </main>
        </div>
    )
}

export default AdminTab
