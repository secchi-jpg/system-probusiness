import React from 'react';
import { Package, Route, Users, TrendingUp, DollarSign } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Dashboard Logístico</h1>
          <p className="text-sm text-slate-500 mt-1">Resumen de operaciones y entregas del día</p>
        </div>
        <button className="bg-[#12b8a6] hover:bg-[#0e9485] text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm">
          Generar Reporte
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Pedidos Entregados', value: '142', icon: Package, color: 'text-[#12b8a6]', bg: 'bg-[#12b8a6]/10' },
          { label: 'Rutas Activas', value: '12', icon: Route, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
          { label: 'Empleados en Campo', value: '8', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Ingresos del Día', value: 'Gs 4.5M', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm min-h-[300px]">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Rendimiento Semanal</h2>
          <div className="w-full h-48 bg-slate-50 rounded flex items-center justify-center border border-slate-100 text-slate-400">
            [Gráfico de Rendimiento]
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm min-h-[300px]">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Últimas Actividades</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4 items-start border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                <div className="w-2 h-2 mt-2 rounded-full bg-[#12b8a6]"></div>
                <div>
                  <p className="text-sm text-slate-800 font-medium">Pedido #10{i}8 entregado correctamente.</p>
                  <p className="text-xs text-slate-400 mt-1">Hace {i * 15} minutos • Ruta Sur • Repartidor {i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
