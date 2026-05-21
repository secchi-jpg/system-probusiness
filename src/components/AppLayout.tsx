import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../store/authStore';
import { 
  Menu, Bell, Settings, Languages, Sun, LogOut, Package, Users, 
  Map as MapIcon, ClipboardList, HelpCircle, ChevronLeft, ChevronRight, LayoutDashboard, Box
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function AppLayout() {
  const { role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const adminLinks = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/empleados', icon: Users, label: 'Empleados' },
    { to: '/admin/inventario', icon: Box, label: 'Inventario & Precios' },
    { to: '/admin/tracking', icon: MapIcon, label: 'Tracking Rutas' },
  ];

  const employeeLinks = [
    { to: '/empleado/historial', icon: ClipboardList, label: 'Historial Pedidos' },
    { to: '/empleado/mapa', icon: MapIcon, label: 'Mapa y Pedidos' },
    { to: '/empleado/soporte', icon: HelpCircle, label: 'Soporte' },
  ];

  const links = role === 'admin' ? adminLinks : employeeLinks;

  return (
    <div className="flex h-screen w-full bg-[#f4f5fa] overflow-hidden font-sans">
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white border-r border-slate-200 transition-all duration-300 flex flex-col z-20 shadow-sm",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        <div className="h-16 flex items-center px-4 border-b border-slate-100 justify-between shrink-0">
          {sidebarOpen ? (
            <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
              <div className="bg-[#12b8a6] text-white p-1.5 rounded">
                <Package size={20} />
              </div>
              <span className="font-bold text-slate-800 tracking-tight">Probusiness</span>
            </div>
          ) : (
            <div className="bg-[#12b8a6] text-white p-1.5 rounded mx-auto">
              <Package size={20} />
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-3">
          {sidebarOpen && <p className="text-xs font-semibold text-slate-400 mb-2 px-2 uppercase tracking-wider">Menú Principal</p>}
          
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname.startsWith(link.to);
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium text-sm",
                  isActive 
                    ? "bg-[#666cff]/10 text-[#666cff]" 
                    : "text-slate-600 hover:bg-slate-50"
                )}
                title={!sidebarOpen ? link.label : undefined}
              >
                <Icon size={20} className={cn("shrink-0", isActive ? "text-[#666cff]" : "text-slate-500")} />
                {sidebarOpen && <span className="whitespace-nowrap">{link.label}</span>}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-8 h-8 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 transition-colors"
            >
              <Menu size={20} />
            </button>
            
            <div className="hidden md:flex items-center bg-slate-100 px-3 py-1.5 rounded-full">
              <span className="text-sm text-slate-500">Filtrar tabla...</span>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button className="text-slate-500 hover:text-slate-700 p-2"><Languages size={20} /></button>
            <button className="text-slate-500 hover:text-slate-700 p-2"><Sun size={20} /></button>
            <div className="relative">
              <button className="text-slate-500 hover:text-slate-700 p-2">
                <Bell size={20} />
              </button>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </div>
            
            <div className="w-px h-6 bg-slate-200 mx-1"></div>

            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end hidden md:flex">
                <span className="text-sm font-semibold text-slate-800">
                  {role === 'admin' ? 'Administrador' : 'Empleado'}
                </span>
                <span className="text-xs text-slate-500">{role === 'admin' ? 'admin@probusiness.com' : 'empleado@probusiness.com'}</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-white shadow-sm ring-2 ring-transparent cursor-pointer group relative">
                {role === 'admin' ? 'A' : 'E'}
                
                {/* Simple dropdown mock */}
                <div className="hidden group-hover:flex absolute top-full right-0 mt-2 bg-white border border-slate-200 shadow-lg rounded-lg py-2 w-48 flex-col z-50">
                  <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left w-full">
                    <LogOut size={16} /> Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 relative">
          <Outlet />
        </main>
        
        {/* Footer */}
        <footer className="py-3 px-6 text-xs text-slate-400 flex justify-between shrink-0 bg-[#f4f5fa]">
          <span>Copyright © 2026 Probusiness.</span>
        </footer>
      </div>
    </div>
  );
}
