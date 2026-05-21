import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/authStore';
import { UserCircle, ClipboardList, Map, FileText, Share, Navigation } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function EmployeeLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen w-full bg-white text-gray-900 pb-[64px]">
      {/* Top Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shrink-0">
        <button 
          onClick={() => {}}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
        >
          {/* Menu icon matching Quasar standard back/menu */}
          <div className="w-5 h-0.5 bg-gray-700 relative before:absolute before:-top-1.5 before:w-5 before:h-0.5 before:bg-gray-700 after:absolute after:top-1.5 after:w-5 after:h-0.5 after:bg-gray-700"></div>
        </button>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/employee/visitas')} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#20295c] text-white shadow-md">
            <Navigation size={18} fill="currentColor" />
          </button>
          <button onClick={logout} className="ml-2 px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100">
            Cerrar Sesión
          </button>
        </div>
      </header>
      
      {/* Main Content Area */}
      <main className="flex-1 w-full overflow-y-auto bg-gray-50 relative">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full h-[64px] bg-white border-t border-gray-200 flex items-center justify-around z-50">
        <NavLink 
          to="/employee/clientes" 
          className={({ isActive }) => cn(
            "flex flex-col items-center justify-center w-full h-full text-xs gap-1 font-medium pb-2 pt-1 transition-colors",
            isActive ? "text-[#283593]" : "text-gray-500 hover:text-gray-900"
          )}
        >
          <UserCircle size={24} />
          Clientes
        </NavLink>
        
        <NavLink 
          to="/employee/pedidos" 
          className={({ isActive }) => cn(
            "flex flex-col items-center justify-center w-full h-full text-xs gap-1 font-medium pb-2 pt-1 transition-colors",
            isActive ? "text-[#283593]" : "text-gray-500 hover:text-gray-900"
          )}
        >
          <ClipboardList size={22} />
          Pedidos
        </NavLink>
        
        <NavLink 
          to="/employee/visitas" 
          className={({ isActive }) => cn(
            "flex flex-col items-center justify-center w-full h-full text-xs gap-1 font-medium pb-2 pt-1 transition-colors",
            isActive ? "text-[#283593]" : "text-gray-500 hover:text-gray-900"
          )}
        >
          <Map size={24} />
          Visitas
        </NavLink>
        
        <NavLink 
          to="/employee/facturas" 
          className={({ isActive }) => cn(
            "flex flex-col items-center justify-center w-full h-full text-xs gap-1 font-medium pb-2 pt-1 transition-colors",
            isActive ? "text-[#283593]" : "text-gray-500 hover:text-gray-900"
          )}
        >
          <FileText size={24} />
          Facturas
        </NavLink>
      </nav>
    </div>
  );
}
