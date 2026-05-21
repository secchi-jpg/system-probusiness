import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Package, FileText, Plus, ChevronDown, Search, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

type Tab = 'cliente' | 'productos' | 'detalles';

const MOCK_PRICE_LISTS = [
  'lista de prueba',
  'PEDIDOS YA',
  'BIGGIE S.A',
  'CASA RICA / ARETE',
  'COMERCIAL CANADA',
  'COOPERATIVA FERNHEIM',
  'DELIVERY',
  'Fortis',
  'FRESSH FOOD',
  'FUNCIONARIOS'
];

const MOCK_PRODUCTS = [
  { id: 1, name: 'prueba', available: 100, price: 5000, inList: true },
  { id: 2, name: 'FAJA ECO PACK 1007', available: 0, price: 12000, inList: false },
  { id: 3, name: 'HUEVOS CAMPEROS TIPO GASTRONOMICO BLANCO X30 UNIDADES', available: 0, price: 0, inList: false },
  { id: 4, name: 'MAPLE HUEVO 12 1003', available: 0, price: 0, inList: false },
  { id: 5, name: 'Huevos Camperos Al Campo x 20 Unidades', available: 1500, price: 20500, inList: true },
  { id: 6, name: 'HUEVOS CAMPEROS TIPO GASTRONOMICO X30 UNIDADES', available: 0, price: 0, inList: false },
];

export default function NuevaVenta() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('productos');
  const [selectedList, setSelectedList] = useState('PEDIDOS YA');
  const [isListDropdownOpen, setIsListDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Cliente State
  const [cliente, setCliente] = useState({ ruc: '', razonSocial: '', telefono: '', direccion: '' });
  
  // Cart State
  const [cart, setCart] = useState<any[]>([]);

  // Detalles State
  const [condicionVenta, setCondicionVenta] = useState('CONTADO');
  const [formaPago, setFormaPago] = useState('EFECTIVO');
  const [importe, setImporte] = useState(0);

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  };

  const clearCliente = () => setCliente({ ruc: '', razonSocial: '', telefono: '', direccion: '' });

  return (
    <div className="flex flex-col h-screen w-full bg-white relative pb-[80px]">
      {/* Search overlay / Product Select Modal */}
      {isSearchOpen && (
        <div className="absolute inset-0 bg-white z-50 flex flex-col h-screen">
          <div className="flex items-center gap-4 bg-gray-100 p-4 border-b border-gray-200">
            <button onClick={() => setIsSearchOpen(false)}><ArrowLeft size={24} className="text-gray-600" /></button>
            <input 
              autoFocus
              type="text" 
              placeholder="Buscar producto..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none flex-1 text-lg text-gray-800 placeholder-gray-500"
            />
          </div>
          <div className="p-4 border-b border-gray-100 text-sm font-medium text-gray-600">
            {MOCK_PRODUCTS.length} productos disponibles
          </div>
          <div className="flex-1 overflow-y-auto">
            {MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map(p => (
              <div key={p.id} className="p-4 border-b border-gray-100 flex flex-col gap-2">
                <span className="font-bold text-sm text-gray-900">{p.name}</span>
                {p.inList ? (
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm font-semibold text-gray-500">{p.available} disponibles</span>
                    <button 
                      onClick={() => {
                        setCart([...cart, { ...p, quantity: 1 }]);
                        setIsSearchOpen(false);
                      }}
                      className="bg-[#20295c] text-white px-3 py-1.5 rounded text-sm font-medium"
                    >
                      {p.price.toLocaleString('es-PY')} Gs. c/u
                    </button>
                  </div>
                ) : (
                  <div className="bg-rose-500 text-white self-start px-3 py-1 rounded text-sm font-bold shadow-sm">
                    No disponible en la lista de precios
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex items-center px-4 py-4 shrink-0 mt-2">
        <button className="text-gray-600 p-2" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
      </header>
      
      {/* Main Content Scrollable Area */}
      <main className="flex-1 w-full overflow-y-auto px-6 hide-scrollbar relative">
        {activeTab === 'cliente' && (
          <div className="flex flex-col gap-5 pt-2">
            <h2 className="text-sm font-bold tracking-widest uppercase text-black mb-2">Información del cliente</h2>
            
            <div className="bg-gray-100 rounded-lg p-3">
              <label className="text-xs text-indigo-900 font-semibold mb-1 block">RUC</label>
              <input value={cliente.ruc} onChange={e=>setCliente({...cliente, ruc: e.target.value})} className="w-full bg-transparent text-gray-900 focus:outline-none" />
            </div>
            <div className="bg-gray-100 rounded-lg p-4 text-gray-500 font-semibold">
              <input placeholder="RAZÓN SOCIAL" value={cliente.razonSocial} onChange={e=>setCliente({...cliente, razonSocial: e.target.value})} className="w-full bg-transparent focus:outline-none" />
            </div>
            <div className="bg-gray-100 rounded-lg p-4 text-gray-500 font-semibold">
              <input placeholder="TELÉFONO / CELULAR" value={cliente.telefono} onChange={e=>setCliente({...cliente, telefono: e.target.value})} className="w-full bg-transparent focus:outline-none" />
            </div>
            <div className="bg-gray-100 rounded-lg p-4 text-gray-500 font-semibold">
              <input placeholder="DIRECCIÓN" value={cliente.direccion} onChange={e=>setCliente({...cliente, direccion: e.target.value})} className="w-full bg-transparent focus:outline-none" />
            </div>
            
            <button onClick={clearCliente} className="self-end mt-2 text-sm font-bold text-black underline underline-offset-4">
              Borrar todos los campos
            </button>
          </div>
        )}

        {activeTab === 'productos' && (
          <div className="flex flex-col gap-6 pt-2">
            <div>
              <h2 className="text-sm font-bold tracking-widest uppercase text-black mb-4">Lista de precios</h2>
              
              <div className="relative">
                <button 
                  onClick={() => setIsListDropdownOpen(!isListDropdownOpen)}
                  className="w-full bg-gray-100 p-4 flex justify-between items-center rounded-sm text-black font-semibold shadow-sm"
                >
                  {selectedList}
                  <ChevronDown size={20} className={cn("transition-transform", isListDropdownOpen && "rotate-180")} />
                </button>
                
                {isListDropdownOpen && (
                  <div className="absolute top-full left-0 w-full bg-white border border-gray-200 mt-1 shadow-xl z-20 max-h-[300px] overflow-y-auto">
                    {MOCK_PRICE_LISTS.map((list) => (
                      <button 
                        key={list}
                        onClick={() => { setSelectedList(list); setIsListDropdownOpen(false); }}
                        className="w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 text-gray-900 font-medium"
                      >
                        {list}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold tracking-widest uppercase text-black mb-4">Productos</h2>
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="w-full bg-gray-100 p-4 flex justify-between items-center rounded-sm text-black font-semibold shadow-sm"
              >
                AGREGAR PRODUCTO
                <Plus size={20} />
              </button>
              
              <p className="mt-4 text-sm text-gray-500 font-medium">
                {cart.length} productos agregados a la lista
              </p>

              {cart.length > 0 && (
                <div className="mt-4 flex flex-col gap-3">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded border border-gray-200">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">{item.name}</span>
                        <span className="text-xs text-gray-500">{item.quantity} x {item.price.toLocaleString()} Gs</span>
                      </div>
                      <span className="font-bold text-[#20295c]">{(item.price * item.quantity).toLocaleString()} Gs</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'detalles' && (
          <div className="flex flex-col gap-6 pt-2 pb-24">
            <div>
              <h2 className="text-sm font-bold tracking-widest uppercase text-black mb-4">Condición de venta</h2>
              <div className="relative mb-6">
                <select 
                  value={condicionVenta}
                  onChange={(e) => setCondicionVenta(e.target.value)}
                  className="w-full bg-gray-100 p-4 appearance-none rounded-sm text-black font-semibold shadow-sm outline-none"
                >
                  <option value="CONTADO">CONTADO</option>
                  <option value="CREDITO">CRÉDITO</option>
                </select>
                <ChevronDown size={20} className="absolute right-4 top-4 text-black pointer-events-none" />
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold tracking-widest uppercase text-black mb-4">Forma de pago 1</h2>
              <div className="relative mb-3">
                <select 
                  value={formaPago}
                  onChange={(e) => setFormaPago(e.target.value)}
                  className="w-full bg-gray-100 p-4 appearance-none rounded-sm text-black font-semibold shadow-sm outline-none"
                >
                  <option value="EFECTIVO">EFECTIVO</option>
                  <option value="TARJETA">TARJETA</option>
                  <option value="TRANSFERENCIA">TRANSFERENCIA</option>
                </select>
                <ChevronDown size={20} className="absolute right-4 top-4 text-black pointer-events-none" />
              </div>

              <div className="flex items-center justify-between border border-gray-300 rounded p-4 relative">
                <div className="flex flex-col absolute top-1 left-4">
                  <span className="text-[10px] text-[#20295c] font-semibold">Importe de la forma de pago 1 (Gs.)</span>
                </div>
                <input 
                  type="number"
                  value={importe || ''}
                  onChange={(e) => setImporte(Number(e.target.value))}
                  className="w-full mt-4 bg-transparent outline-none text-gray-900"
                  placeholder="0"
                />
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                  <span className="font-bold text-gray-500 text-sm">$</span>
                </div>
              </div>
            </div>
            
            {/* VISTA PREVIA Sticky Footer (simulated inside scroll) */}
            <div className="fixed bottom-[80px] left-0 w-full bg-white border-t border-gray-200 p-4 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-black uppercase">Total</span>
                <span className="text-xl font-bold flex items-baseline gap-1">
                  Gs {(calculateTotal()).toLocaleString('es-PY')} <span className="text-sm font-normal text-gray-500">/0</span>
                </span>
              </div>
              <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-bold shadow-sm">
                VISTA PREVIA
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Special Bottom Navigation for Nueva Venta */}
      <nav className="fixed bottom-0 w-full h-[80px] bg-white border-t border-gray-200 flex items-center justify-around z-50">
        <button 
          onClick={() => setActiveTab('cliente')}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full text-xs gap-1 font-medium pb-2 pt-1 transition-colors",
            activeTab === 'cliente' ? "text-[#283593]" : "text-gray-500 hover:text-gray-900"
          )}
        >
          <User size={24} />
          Cliente
        </button>
        
        <button 
          onClick={() => setActiveTab('productos')}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full text-xs gap-1 font-medium pb-2 pt-1 transition-colors",
            activeTab === 'productos' ? "text-[#283593]" : "text-gray-500 hover:text-gray-900"
          )}
        >
          <Package size={24} fill={activeTab === 'productos' ? "currentColor" : "none"} />
          Productos
        </button>
        
        <button 
          onClick={() => setActiveTab('detalles')}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full text-xs gap-1 font-medium pb-2 pt-1 transition-colors",
            activeTab === 'detalles' ? "text-[#283593]" : "text-gray-500 hover:text-gray-900"
          )}
        >
          <FileText size={24} />
          Detalles
        </button>
      </nav>
    </div>
  );
}
