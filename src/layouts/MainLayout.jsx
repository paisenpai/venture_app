import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const MainLayout = () => (
  <div className="flex min-h-screen w-full bg-gray-100">
    {/* Sidebar */}
    <Sidebar />
    {/* Content area */}
    <main
      className="flex-1 min-h-screen bg-[#ecf0f1] ml-[7rem] md:ml-[18rem] transition-all duration-300"
      style={{ paddingLeft: '10%', paddingRight: '0%' }}
    >
      <Outlet />
    </main>
  </div>
);

export default MainLayout;