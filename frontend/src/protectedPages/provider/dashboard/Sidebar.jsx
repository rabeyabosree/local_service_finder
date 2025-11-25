import React from 'react'
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineHomeRepairService, MdAttachMoney } from "react-icons/md";
import { IoBookmarkOutline, IoSettingsOutline } from "react-icons/io5";
import { FcServices } from "react-icons/fc";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/reducers/authReducer';

function Sidebar() {
  const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = ()=>{
    dispatch(logout())
    navigate("/login")
  }

  const sidebarMenu = [
    { menu: "Dashboard", icon: <LuLayoutDashboard size={20} />, path: '/dashboard' },
    { menu: "Service", icon: <MdOutlineHomeRepairService size={20} />, path: '/dashboard/service' },
    { menu: "Booking", icon: <IoBookmarkOutline size={20} />, path: '/dashboard/booking' },
    { menu: "Earning", icon: <MdAttachMoney size={20} />, path: '/dashboard/earning' },
    { menu: "Settings", icon: <IoSettingsOutline size={20} />, path: '/dashboard/settings' },
  ];

  return (
    <div className="h-screen text-white flex flex-col justify-between p-4">
      {/* Logo */}
      <div className="flex items-center gap-2 text-2xl font-bold mb-8">
        EasyFind <FcServices size={28} />
      </div>

      {/* Sidebar Menu */}
      <nav className="flex flex-col gap-3 flex-1">
        {sidebarMenu.map((item) => (
          <Link
            to={item.path}
            key={item.menu}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition 
              ${location.pathname === item.path
                ? "bg-DustyRose text-lavender"
                : "hover:bg-gray-700"
              }`}
          >
            {item.icon}
            <span>{item.menu}</span>
          </Link>
        ))}
      </nav>

      {/* Profile Section */}
      <button onClick={handleLogout} className="border-t border-gray-700 pt-4 ">
        Logout
      </button>
    </div>
  );
}

export default Sidebar;