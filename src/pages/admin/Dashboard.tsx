import { useAuth } from '../../store/authStore';
import { Package, Users, Route, LogOut, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function AdminDashboard() {
  const { logout } = useAuth();
  
  // Mock logic to "assign route to employee"
  const [assigned, setAssigned] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1e233a] text-white flex flex-col">
        <div className="p-6 text-xl font-bold tracking-tight border-b border-[#2d3454] flex gap-2 items-center">
          <Package className="text-pink-500" />
          LogisticsAdmin
        </div>
        
        <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-[#2d3454] rounded-lg text-white font-medium">
            <Route size={20} />
            Despacho y Rutas
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-[#2d3454] rounded-lg font-medium transition-colors">
            <Users size={20} />
            Empleados
          </a>
        </nav>

        <div className="p-4 border-t border-[#2d3454]">
          <button 
            onClick={logout}
            className="flex items-center gap-2 text-rose-400 hover:text-rose-300 w-full px-4 py-2 font-medium transition-colors"
          >
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          <p className="text-gray-500 mt-2">Gestiona rutas y asignaciones de empleados.</p>
        </header>

        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 max-w-4xl">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Asignación de Rutas (Despacho)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600">Seleccionar Empleado</label>
                <select className="border border-gray-300 rounded-lg p-3 bg-gray-50 outline-none focus:ring-2 focus:ring-pink-500">
                  <option>Empleado 1 (Repartidor)</option>
                  <option>Empleado 2 (Vendedor)</option>
                </select>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600">Seleccionar Ruta / Pedido</label>
                <select className="border border-gray-300 rounded-lg p-3 bg-gray-50 outline-none focus:ring-2 focus:ring-pink-500">
                  <option>Ruta Norte - 15 Pedidos</option>
                  <option>Ruta Sur - 8 Pedidos</option>
                  <option>Pedido Especial: Cliente VIP</option>
                </select>
              </div>

              <button 
                onClick={() => setAssigned(true)}
                className="mt-4 bg-[#20295c] hover:bg-[#1a214e] text-white font-bold py-3 px-6 rounded-lg shadow-sm transition-colors w-full flex justify-center items-center gap-2"
              >
                {assigned ? <><CheckCircle size={20} /> Ruta Asignada</> : 'Asignar Ruta'}
              </button>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
               <h3 className="font-bold text-gray-700 mb-2">Instrucciones</h3>
               <p className="text-sm text-gray-600 mb-4">
                 Al asignar una ruta, el empleado recibirá de inmediato las coordenadas y la lista de pedidos en su aplicación móvil.
               </p>
               <div className="h-32 bg-[#e5e3df] rounded-lg overflow-hidden flex items-center justify-center text-gray-400">
                 [Vista Previa del Mapa]
               </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
