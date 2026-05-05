
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function ProviderDashboard() {
    return (
        <div className='h-screen flex'>
            {/* sidebar */}
            <div className='w-64 bg-gray-500 text-white'>
                < Sidebar />
            </div>

            {/* main content */}
            <div className='flex-1'>
                <Outlet />
            </div>
        </div>
    )
}

export default ProviderDashboard