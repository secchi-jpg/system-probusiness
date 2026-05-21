import React, { useState } from 'react';
import { Plus, Search, Archive, FileText, Database } from 'lucide-react';

export default function Inventario() {
  const [activeTab, setActiveTab] = useState<'productos' | 'listas'>('productos');
  const [productos, setProductos] = useState([
    { id: 1, name: 'Caja Cartón Corrugado 50x50', sku: 'CC-001', stock: 1540 },
    { id: 2, name: 'Cinta Adhesiva Industrial', sku: 'CA-002', stock: 830 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Inventario y Precios</h1>
          <p className="text-sm text-slate-500 mt-1">Gestión local y preparación para integración Zoho CRM</p>
        </div>
        <button className="bg-[#1b2531] text-white px-4 py-2.5 rounded-lg font-bold text-sm shadow-sm flex items-center gap-2">
          <Database size={18} />
          Sincronizar Zoho CRM <span className="bg-yellow-500/20 text-yellow-300 text-[10px] px-1.5 py-0.5 rounded ml-1 tracking-wider uppercase">Próximamente</span>
        </button>
      </div>

      <div className="flex gap-4 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('productos')}
          className={`pb-3 text-sm font-bold tracking-wide transition-colors ${activeTab === 'productos' ? 'text-[#12b8a6] border-b-2 border-[#12b8a6]' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <span className="flex items-center gap-2"><Archive size={18}/> PRODUCTOS LOCALES</span>
        </button>
        <button 
          onClick={() => setActiveTab('listas')}
          className={`pb-3 text-sm font-bold tracking-wide transition-colors ${activeTab === 'listas' ? 'text-[#12b8a6] border-b-2 border-[#12b8a6]' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <span className="flex items-center gap-2"><FileText size={18}/> LISTAS DE PRECIOS</span>
        </button>
      </div>

      {activeTab === 'productos' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="relative">
              <input type="text" placeholder="Buscar producto..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-64 focus:outline-none focus:border-[#12b8a6]" />
              <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
            </div>
            <button className="bg-[#12b8a6] text-white px-3 py-2 rounded-lg font-bold text-sm shadow-sm flex items-center gap-1">
              <Plus size={16} /> Añadir Producto
            </button>
          </div>
          
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">SKU</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Nombre del Producto</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Stock Disponible</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((prod) => (
                <tr key={prod.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono text-sm text-slate-500">{prod.sku}</td>
                  <td className="p-4 font-medium text-slate-800">{prod.name}</td>
                  <td className="p-4">
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                      {prod.stock} un.
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'listas' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 text-center text-slate-500">
          <FileText size={48} className="mx-auto mb-4 text-slate-300" />
          <h3 className="text-lg font-bold text-slate-700 mb-2">Listas de Precios B2B / B2C</h3>
          <p className="mb-6 max-w-md mx-auto text-sm">Cree listas de precios específicas para mayoristas, minoristas o clientes específicos.</p>
          <button className="bg-[#12b8a6] text-white px-4 py-2 rounded-lg font-bold text-sm shadow-sm inline-flex items-center gap-2">
            <Plus size={18} /> Crear Nueva Lista
          </button>
        </div>
      )}

    </div>
  );
}
