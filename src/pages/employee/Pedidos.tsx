import { User } from 'lucide-react';

export default function Pedidos() {
  return (
    <div className="h-full w-full bg-white flex flex-col pt-4 px-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-light text-gray-900 tracking-tight">
          <strong className="font-bold">0</strong> pedidos asignados
        </h2>
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
          <User size={20} />
        </div>
      </div>
      <div className="border-t border-gray-100 flex-1">
        {/* Placeholder for future assigned orders */}
      </div>
    </div>
  );
}
