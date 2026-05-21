import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { CheckCircle, XCircle, Navigation, MapPin, Package, Phone } from 'lucide-react';
import L from 'leaflet';

// Fix for default marker icon in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

type StopStatus = 'pending_accept' | 'accepted' | 'arrived' | 'delivered';

export default function MapaPedidos() {
  const [currentStatus, setCurrentStatus] = useState<StopStatus>('pending_accept');

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6">
      
      {/* Columna Izquierda: Información del Pedido Actual */}
      <div className="w-full lg:w-96 flex flex-col shrink-0 space-y-4">
        
        <div className="bg-[#1b2531] text-white p-5 rounded-xl shadow-lg relative overflow-hidden">
          {/* Deco circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#12b8a6] rounded-full mix-blend-multiply filter blur-2xl opacity-40 -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10">
            <span className="bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded inline-block mb-3">Nuevo Pedido Asignado</span>
            <h2 className="text-xl font-bold mb-1">Cliente VIP Corp.</h2>
            <p className="text-slate-300 text-sm flex items-center gap-1"><MapPin size={14}/> Av. Aviadores del Chaco 2050</p>
            
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Total a Combrar</p>
                <p className="font-bold text-lg text-[#12b8a6]">Gs 1.450.000</p>
              </div>
              <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Phone size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Acciones principales workflow */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 flex-1">
          <h3 className="font-bold text-slate-800 text-sm mb-4 uppercase tracking-wider">Acciones de Ruta</h3>
          
          {currentStatus === 'pending_accept' && (
            <div className="space-y-3">
              <p className="text-sm text-slate-600 mb-4 font-medium">¿Acepta tomar este pedido en su ruta actual?</p>
              <button 
                onClick={() => setCurrentStatus('accepted')}
                className="w-full bg-[#12b8a6] hover:bg-[#0e9485] text-white py-3.5 rounded-lg flex items-center justify-center gap-2 font-bold shadow-sm transition-all shadow-[#12b8a6]/20"
              >
                <CheckCircle size={20} /> ACEPTAR PEDIDO
              </button>
              <button className="w-full bg-white border-2 border-red-100 hover:border-red-200 hover:bg-red-50 text-red-500 py-3 rounded-lg flex items-center justify-center gap-2 font-bold transition-all">
                <XCircle size={20} /> RECHAZAR
              </button>
            </div>
          )}

          {currentStatus === 'accepted' && (
            <div className="space-y-3">
              <div className="bg-slate-50 p-4 rounded-lg flex gap-3 text-sm font-medium text-slate-700 mb-4 border border-slate-100">
                <Navigation className="text-[#12b8a6] shrink-0" />
                Diríjase a la ubicación del cliente. El administrador está monitoreando su avance.
              </div>
              <button 
                onClick={() => setCurrentStatus('arrived')}
                className="w-full bg-[#1b2531] text-white py-3.5 rounded-lg flex items-center justify-center gap-2 font-bold shadow-sm hover:bg-slate-800 transition-all"
              >
                <MapPin size={20} /> YA ESTOY EN EL LUGAR
              </button>
            </div>
          )}

          {currentStatus === 'arrived' && (
            <div className="space-y-4">
              <div className="bg-[#12b8a6]/10 text-[#12b8a6] p-4 rounded-lg flex items-center justify-between text-sm font-bold border border-[#12b8a6]/20">
                <span>Registrado en destino</span>
                <CheckCircle size={18} />
              </div>

              <div className="border border-slate-100 rounded-lg p-3">
                <p className="text-xs font-bold text-slate-400 uppercase mb-2">Detalle de items</p>
                <div className="flex items-center gap-3 text-sm font-medium text-slate-700 border-b border-slate-50 pb-2 mb-2">
                   <Package size={16} /> 15x Caja Corrugada
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                   <Package size={16} /> 2x Cinta Adhesiva
                </div>
              </div>

              <button 
                onClick={() => setCurrentStatus('delivered')}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-lg flex items-center justify-center gap-2 font-bold shadow-sm transition-all shadow-emerald-500/20"
              >
                <CheckCircle size={20} /> CONFIRMAR ENTREGA
              </button>
            </div>
          )}
          
          {currentStatus === 'delivered' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="font-bold text-slate-800 text-lg">¡Entrega Exitosa!</h3>
              <p className="text-sm text-slate-500 mt-2 mb-6">El pedido fue marcado como entregado en el sistema.</p>
              <button 
                onClick={() => setCurrentStatus('pending_accept')}
                className="text-[#12b8a6] font-bold text-sm bg-[#12b8a6]/10 px-6 py-2 rounded-full"
              >
                Esperando próximo pedido...
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Columna Derecha: Mapa */}
      <div className="flex-1 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden min-h-[400px] relative z-0 shadow-sm relative">
        <MapContainer 
          center={[-25.2842, -57.5619]} // Aviadores
          zoom={14} 
          style={{ height: '100%', width: '100%', zIndex: 0 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[-25.2842, -57.5619]}>
            <Popup>
               <div className="font-bold">Cliente VIP Corp.</div>
               <div className="text-xs text-slate-500">Destino de entrega</div>
            </Popup>
          </Marker>
        </MapContainer>
        
        {/* Helper overlay si ya entrego */}
        {currentStatus === 'delivered' && (
          <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-sm flex items-center justify-center">
             <div className="bg-white p-4 rounded-xl shadow-xl font-bold text-slate-800 flex items-center gap-3">
               <span className="w-2 h-2 rounded-full bg-[#12b8a6] animate-pulse"></span>
               Buscando nuevas rutas...
             </div>
          </div>
        )}
      </div>

    </div>
  );
}
