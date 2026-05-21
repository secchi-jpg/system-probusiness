import React from 'react';
import { Package, Calendar, CheckCircle } from 'lucide-react';

export default function Historial() {
  const historial = [
    { id: '1084', date: 'Hoy, 10:30 AM', client: 'Cliente A', addr: 'Centro, Asunción', status: 'entregado', amount: 'Gs 250.000' },
    { id: '1083', date: 'Ayer, 14:15 PM', client: 'Cliente B', addr: 'San Lorenzo', status: 'entregado', amount: 'Gs 1.150.000' },
    { id: '1082', date: 'Ayer, 09:00 AM', client: 'Cliente C', addr: 'Luque', status: 'rechazado', amount: '-' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Historial de Pedidos</h1>
        <p className="text-sm text-slate-500 mt-1">Revise las entregas que ya ha gestionado</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {historial.map((item, idx) => (
          <div key={idx} className="p-4 md:p-6 border-b border-slate-100 last:border-0 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center hover:bg-slate-50 transition-colors">
            
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-full mt-1 ${item.status === 'entregado' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                <Package size={20} />
              </div>
              
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-800">Pedido #{item.id}</h3>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${item.status === 'entregado' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-900 mt-1">{item.client}</p>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1.5 font-medium">
                  <span className="flex items-center gap-1"><Calendar size={12}/> {item.date}</span>
                  <span>•</span>
                  <span>{item.addr}</span>
                </div>
              </div>
            </div>

            <div className="md:text-right w-full md:w-auto flex justify-between md:block items-center pl-16 md:pl-0">
              <span className="text-xs text-slate-500 block">Total cobrado</span>
              <span className="font-bold text-slate-800">{item.amount}</span>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
