import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/authStore';
import { Package, Lock, Mail } from 'lucide-react';

export default function Login() {
  const { role, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (role === 'admin') return <Navigate to="/admin" replace />;
  if (role === 'employee') return <Navigate to="/empleado" replace />;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Simulating role check based on email
    // In production, Supabase Auth will handle this
    if (email === 'admin@probusiness.com' && password === 'admin123') {
      login('admin');
    } else if (email === 'empleado@probusiness.com' && password === 'empleado123') {
      login('employee');
    } else {
      setError('Correo o contraseña incorrectos. Pruebe admin@probusiness.com o empleado@probusiness.com');
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-50 items-center justify-center p-4">
      <div className="flex w-full max-w-4xl shadow-2xl rounded-2xl overflow-hidden bg-white min-h-[500px]">
        
        {/* Lado izquierdo: Formulario */}
        <div className="flex w-full md:w-1/2 flex-col p-8 lg:p-14 justify-center">
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-[#12b8a6] text-white p-2 rounded-lg">
              <Package size={24} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">Probusiness Logistic</h1>
          </div>
          
          <h2 className="text-2xl font-semibold text-slate-800 mb-2">Bienvenido</h2>
          <p className="text-sm text-slate-500 mb-8">Ingrese su cuenta para continuar</p>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-100">
              {error}
            </div>
          )}

          <form className="flex flex-col gap-6" onSubmit={handleLogin}>
            <div className="flex flex-col gap-1 relative">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Correo Electrónico</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border-b-2 border-slate-200 text-slate-900 focus:outline-none focus:border-[#12b8a6] transition-colors font-medium bg-transparent"
                  placeholder="ejemplo@probusiness.com"
                />
                <Mail className="absolute left-0 top-2.5 text-slate-400" size={18} />
              </div>
            </div>
            
            <div className="flex flex-col gap-1 relative">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Contraseña</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border-b-2 border-slate-200 text-slate-900 focus:outline-none focus:border-[#12b8a6] transition-colors font-medium tracking-widest bg-transparent"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-0 top-2.5 text-slate-400" size={18} />
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#12b8a6] focus:ring-[#12b8a6]" />
                <span className="text-sm text-slate-600 font-medium group-hover:text-slate-800">Recordarme</span>
              </label>
              <a href="#" className="text-sm font-semibold text-[#12b8a6] hover:underline transition-colors">¿Olvidó su contraseña?</a>
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-[#1b2531] text-white py-3.5 rounded-lg shadow-lg shadow-slate-200 font-bold hover:bg-[#12b8a6] transition-all"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>

        {/* Lado derecho: Visual / Logo */}
        <div className="hidden md:flex w-1/2 relative bg-[#1b2531] items-center justify-center p-12 overflow-hidden items-center">
          {/* Círculos decorativos de fondo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#12b8a6] rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#12b8a6] rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Logo placeholder - using Lucide or standard styling since actual image isn't directly usable in code without file, 
                we make it look like the provided logo */}
            <div className="w-32 h-32 rounded-full border-4 border-[#12b8a6] grid grid-cols-3 grid-rows-3 relative mb-8 overflow-hidden bg-white/5">
              <div className="col-span-3 h-px bg-white/20 absolute top-1/3 w-full"></div>
              <div className="col-span-3 h-px bg-white/20 absolute top-2/3 w-full"></div>
              <div className="row-span-3 w-px bg-white/20 absolute left-1/3 h-full"></div>
              <div className="row-span-3 w-px bg-white/20 absolute left-2/3 h-full"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#12b8a6]/40 to-transparent"></div>
            </div>
            
            <h2 className="text-4xl font-light text-white mb-2">pro<span className="font-bold">business</span></h2>
            <p className="text-[#12b8a6] text-xs font-bold tracking-[0.3em] uppercase mb-8">Servicios para el inversor</p>
            
            <p className="text-slate-300 text-sm max-w-xs mt-4">
              Sistema Logístico Integral.
              <br/>Gestione rutas, entregas y empleados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
