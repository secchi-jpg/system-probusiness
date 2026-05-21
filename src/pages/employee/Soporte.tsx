import React from 'react';
import { HelpCircle, MessageCircle, Phone, BookOpen } from 'lucide-react';

export default function Soporte() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-[#12b8a6]/10 text-[#12b8a6] rounded-full flex items-center justify-center mx-auto mb-4">
          <HelpCircle size={32} />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Centro de Soporte</h1>
        <p className="text-slate-500 mt-2 max-w-md mx-auto">¿Tiene algún problema en su ruta o la aplicación? Estamos aquí para ayudarle.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a href="#" className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-[#12b8a6] hover:shadow-md transition-all group flex flex-col items-center text-center">
          <MessageCircle size={32} className="text-slate-400 group-hover:text-[#12b8a6] mb-4 transition-colors" />
          <h3 className="font-bold text-slate-800 mb-1">Chat de Operaciones</h3>
          <p className="text-sm text-slate-500">Hable directamente con el despachador en turno.</p>
        </a>

        <a href="#" className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-[#12b8a6] hover:shadow-md transition-all group flex flex-col items-center text-center">
          <Phone size={32} className="text-slate-400 group-hover:text-[#12b8a6] mb-4 transition-colors" />
          <h3 className="font-bold text-slate-800 mb-1">Llamada de Emergencia</h3>
          <p className="text-sm text-slate-500">Solo para reportar accidentes o retrasos graves.</p>
        </a>
      </div>

      <div className="bg-[#1b2531] text-white p-8 rounded-xl relative overflow-hidden mt-8 flex flex-col md:flex-row items-center gap-6">
        <div className="bg-white/10 p-4 rounded-full shrink-0">
          <BookOpen size={40} className="text-[#12b8a6]" />
        </div>
        <div>
          <h3 className="font-bold text-lg mb-1">Manual de Procedimientos</h3>
          <p className="text-slate-300 text-sm max-w-sm">Revise los pasos correctos para cobranzas fallidas o clientes ausentes.</p>
        </div>
        <button className="md:ml-auto bg-[#12b8a6] hover:bg-[#0e9485] text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors whitespace-nowrap">
          Leer Manual
        </button>
      </div>
    </div>
  );
}
