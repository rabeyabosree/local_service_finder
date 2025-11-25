
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function ProviderDashboard() {
    return (
        <div className='h-screen flex'>
            {/* Sidebar */}
            <div className='w-64 bg-gray-500 text-white'>
                < Sidebar />
            </div>

            {/* Main Content */}
            <div className='flex-1'>
                <Outlet />
            </div>
        </div>
    )
}

export default ProviderDashboard