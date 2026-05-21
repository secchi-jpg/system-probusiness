import React, { useState } from 'react';
import { Plus, Search, MoreVertical, Edit, Trash } from 'lucide-react';

export default function Empleados() {
  const [empleados, setEmpleados] = useState([
    { id: 1, name: 'Juan Pérez', email: 'juan@probusiness.com', role: 'Repartidor', status: 'Activo' },
    { id: 2, name: 'María Gómez', email: 'maria@probusiness.com', role: 'Vendedor', status: 'Activo' },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newEmpleado, setNewEmpleado] = useState({ name: '', email: '', password: '', role: 'Repartidor' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setEmpleados([...empleados, { id: Date.now(), ...newEmpleado, status: 'Activo' }]);
    setIsAdding(false);
    setNewEmpleado({ name: '', email: '', password: '', role: 'Repartidor' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Gestión de Empleados</h1>
          <p className="text-sm text-slate-500 mt-1">Cree accesos y asigne roles a su personal</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-[#12b8a6] hover:bg-[#0e9485] text-white px-4 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus size={18} />
          Nuevo Empleado
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Añadir Nuevo Empleado</h2>
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Nombre Completo</label>
              <input required type="text" value={newEmpleado.name} onChange={e => setNewEmpleado({...newEmpleado, name: e.target.value})} className="mt-1 w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:border-[#12b8a6]" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Rol</label>
              <select value={newEmpleado.role} onChange={e => setNewEmpleado({...newEmpleado, role: e.target.value})} className="mt-1 w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:border-[#12b8a6] bg-white">
                <option>Repartidor</option>
                <option>Vendedor</option>
                <option>Administrador</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Correo Electrónico</label>
              <input required type="email" value={newEmpleado.email} onChange={e => setNewEmpleado({...newEmpleado, email: e.target.value})} className="mt-1 w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:border-[#12b8a6]" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Contraseña Inicial</label>
              <input required type="text" value={newEmpleado.password} onChange={e => setNewEmpleado({...newEmpleado, password: e.target.value})} className="mt-1 w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:border-[#12b8a6]" />
            </div>
            <div className="md:col-span-2 flex justify-end gap-3 mt-4">
              <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700">Cancelar</button>
              <button type="submit" className="px-6 py-2 bg-[#1b2531] text-white rounded-lg font-bold text-sm hover:bg-slate-800 shadow-sm">Guardar Empleado</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="relative">
            <input type="text" placeholder="Buscar empleado..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-64 focus:outline-none focus:border-[#12b8a6]" />
            <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
          </div>
        </div>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Nombre</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Correo</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Rol</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Estado</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-16">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((emp) => (
              <tr key={emp.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium text-slate-800">{emp.name}</td>
                <td className="p-4 text-slate-500 text-sm">{emp.email}</td>
                <td className="p-4 text-slate-500 text-sm">{emp.role}</td>
                <td className="p-4">
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                    {emp.status}
                  </span>
                </td>
                <td className="p-4 text-slate-400">
                  <button className="p-1 hover:text-[#12b8a6] transition-colors"><MoreVertical size={18} /></button>
                </td>
              </tr>
            ))}
            {empleados.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">No hay empleados registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
