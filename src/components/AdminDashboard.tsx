import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import { LogOut } from 'lucide-react';


import './AdminDashboard.css';

interface Props {
    isLoggedIn: boolean;
    handleLogout: () => void;
}

const AdminDashboard: React.FC<Props> = ({ isLoggedIn, handleLogout }) => {
    const [loggedIn, setLoggedIn] = React.useState(false);

    useEffect(() => {
        // Simulate an API call or some logic to determine login status
        const checkLoginStatus = () => {
            setLoggedIn(isLoggedIn);
        };
        checkLoginStatus();
    }, [isLoggedIn]);

    return (
      
   
         
<div className=" mt-2 bg-gray-100 text-gray-900 h-screen px-4 fixed w-16 md:w-64 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white">
 			<h1 className='text-2xl font-bold hidden md:block mt-4 text-center italic'>Citi Offers</h1>
 			<ul className='flex flex-col mt-5 text-xl'>
 				<li className='flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
         hover:bg-blue-600 hover:text-white'>
 					{/* <FaTachometerAlt /> */}
 					<span className='hidden md:inline'>Dashboard</span>
 				</li>
 				<li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
         hover:text-white hover:bg-blue-600">
 					{/* <FaShoppingCart /> */}
 					<Link to="/user-list">
                    <button className="btn-list">List</button>
                </Link>
 				</li>
 				<li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
         hover:text-white hover:bg-blue-600">
 					{/* <FaUsers /> */}
                     <Link to="/admin/categories">
                    <button className="btn-categories">Categories</button>
                </Link>
 				</li>
 				<li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
         hover:text-white hover:bg-blue-600">
 					{/* <FaUser /> */}
 					<span className="hidden md:inline ">Users</span>
 				</li>
 				<li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
         hover:text-white hover:bg-blue-600">
 					{/* <FaBox /> */}
                     <Link to="/owner/shops">
                    <button className="btn-shops">Shops</button>
                </Link>
 				</li>
 				<li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
         hover:text-white hover:bg-blue-600">
 					{/* <FaCog /> */}
 					<span className="hidden md:inline ">Settings</span>
 				</li>
 			</ul>
 		</div>


      

           

            
            
       
    );
};

export default AdminDashboard;