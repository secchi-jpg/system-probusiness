import { useNavigate } from 'react-router-dom';
import { RefreshCw, Map as MapIcon, Plus, Truck } from 'lucide-react';

export default function Visitas() {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full relative flex flex-col">
      {/* Fake Map Background */}
      <div className="absolute inset-0 bg-[#e5e3df] overflow-hidden">
        {/* Simplified conceptual map drawing */}
        <div className="w-[150%] h-[150%] -rotate-12 translate-x-[-10%] translate-y-[-10%] opacity-60">
          <div className="w-full h-8 bg-white my-10 flex items-center px-10 text-xs font-semibold text-gray-400">Avenida San Martin</div>
          <div className="w-full h-10 bg-white my-32 flex items-center justify-center text-xs font-semibold text-gray-500">Profesor Ingeniero Francisco Fernández</div>
          <div className="w-full h-6 bg-white my-20"></div>
          
          {/* Plot shapes */}
          <div className="absolute top-1/4 left-1/4 w-32 h-20 bg-[#d4cbc1] rounded-sm"></div>
          <div className="absolute top-1/3 left-1/2 w-40 h-24 bg-[#d4cbc1] rounded-sm"></div>
          <div className="absolute top-2/3 left-1/3 w-24 h-24 bg-[#d4cbc1] rounded-sm"></div>
          
          {/* Marker MapPin */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="bg-gray-600 rounded-full w-12 h-12 flex items-center justify-center text-white shadow-xl rotate-12">
              <Truck size={24} />
            </div>
            <div className="w-3 h-3 bg-black/20 rounded-full blur-sm mt-1"></div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons over Map */}
      <div className="absolute bottom-[200px] left-4 flex gap-2">
        <button className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full shadow-lg text-sm font-semibold text-gray-800">
          <MapIcon size={18} />
          Abrir en Google Maps
        </button>
      </div>
      
      <div className="absolute bottom-[200px] right-4 flex gap-2">
        <button className="w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700">
          <RefreshCw size={20} />
        </button>
      </div>

      {/* Bottom Sheet */}
      <div className="absolute bottom-0 w-full bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-5 z-10 min-h-[180px] flex flex-col">
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div>
        
        <h3 className="text-sm font-medium text-gray-500 mb-3">Pedidos (0)</h3>
        
        <div className="border border-gray-200 rounded-xl p-4 mb-4 bg-white text-sm text-gray-400">
          No hay pedidos pendientes
        </div>
        
        <div className="flex gap-3 mt-auto">
          <button 
            onClick={() => navigate('/employee/nueva-venta')}
            className="flex-1 bg-[#20295c] text-white py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-sm"
          >
            <Plus size={20} />
            NUEVA VENTA
          </button>
          <button className="flex-1 bg-gray-200 text-gray-700 py-3.5 rounded-2xl font-semibold shadow-sm">
            TERMINAR VISITA
          </button>
        </div>
      </div>
    </div>
  );
}
