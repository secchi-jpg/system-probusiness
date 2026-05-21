import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Route, Navigation, CheckCircle, Clock, MapPin, Truck } from 'lucide-react';
import L from 'leaflet';

// Fix for default marker icon in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const deliveryIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function Tracking() {
  const [selectedRoute, setSelectedRoute] = useState<number | null>(1);

  const mockRoutes = [
    { 
      id: 1, 
      employee: 'Juan Pérez', 
      status: 'En Camino', 
      progress: 45,
      currentLoc: [-25.2968, -57.6255],
      stops: [
        { name: 'Cliente A', status: 'entregado' },
        { name: 'Cliente B', status: 'en_camino' },
        { name: 'Cliente C', status: 'pendiente' },
      ]
    },
    { 
      id: 2, 
      employee: 'Carlos Ruiz', 
      status: 'Pendiente de Aceptar', 
      progress: 0,
      currentLoc: null,
      stops: [
        { name: 'Cliente D', status: 'pendiente' },
      ]
    }
  ];

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-end shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Tracking de Rutas</h1>
          <p className="text-sm text-slate-500 mt-1">Asigne y monitoree en tiempo real con OpenStreetMap</p>
        </div>
        <button className="bg-[#1b2531] text-white px-4 py-2.5 rounded-lg font-bold text-sm shadow-sm flex items-center gap-2">
          <Route size={18} /> Nueva Asignación
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-[500px]">
        {/* Panel lateral de rutas */}
        <div className="w-full lg:w-1/3 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 font-bold text-slate-700">
            Rutas Activas
          </div>
          <div className="overflow-y-auto flex-1 p-2 space-y-2">
            {mockRoutes.map(route => (
              <div 
                key={route.id}
                onClick={() => setSelectedRoute(route.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedRoute === route.id ? 'border-[#12b8a6] bg-[#12b8a6]/5 ring-1 ring-[#12b8a6]' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="font-bold text-slate-800">{route.employee}</div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${route.status === 'En Camino' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                    {route.status}
                  </span>
                </div>
                
                <div className="w-full bg-slate-200 rounded-full h-1.5 mb-2 overflow-hidden">
                  <div className="bg-[#12b8a6] h-1.5 rounded-full" style={{ width: `${route.progress}%` }}></div>
                </div>
                
                <div className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin size={12} /> {route.stops.length} paradas asignadas
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mapa y Detalles */}
        <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col relative z-0">
          <div className="h-2/3 border-b border-slate-200 relative">
            <MapContainer 
              center={[-25.2968, -57.6255]} // Asunción, Paraguay
              zoom={13} 
              style={{ height: '100%', width: '100%', zIndex: 0 }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {selectedRoute === 1 && (
                <Marker position={[-25.2968, -57.6255]} icon={deliveryIcon}>
                  <Popup>
                    <div className="font-bold">Juan Pérez</div>
                    <div className="text-xs text-slate-500">En ruta a Cliente B</div>
                  </Popup>
                </Marker>
              )}
            </MapContainer>
            
            <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-lg border border-slate-200 z-[1000] flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
               <span className="text-xs font-bold text-slate-700">LIVE Rastreando</span>
            </div>
          </div>
          
          <div className="h-1/3 p-6 overflow-y-auto bg-slate-50">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Truck size={18} className="text-[#12b8a6]" /> 
              Estado de las entregas
            </h3>
            
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              {mockRoutes.find(r => r.id === selectedRoute)?.stops.map((stop, idx) => (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 bg-white z-10 shrink-0 ${stop.status === 'entregado' ? 'border-[#12b8a6] text-[#12b8a6]' : 'border-slate-300 text-slate-300'} md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2`}>
                    {stop.status === 'entregado' ? <CheckCircle size={14} /> : <Clock size={14} />}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-3 rounded-lg border border-slate-200 shadow-sm ml-4 md:ml-0">
                    <p className="font-bold text-slate-800 text-sm">{stop.name}</p>
                    <p className="text-xs text-slate-500 uppercase mt-0.5">{stop.status.replace('_', ' ')}</p>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
