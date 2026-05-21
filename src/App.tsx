/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import { AuthProvider, useAuth } from './store/authStore';

// Layout & Common
import Login from './pages/Login';
import AppLayout from './components/AppLayout';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import Empleados from './pages/admin/Empleados';
import Inventario from './pages/admin/Inventario';
import Tracking from './pages/admin/Tracking';

// Employee Pages
import Historial from './pages/employee/Historial';
import MapaPedidos from './pages/employee/MapaPedidos';
import Soporte from './pages/employee/Soporte';

// Auth Guards
function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { role } = useAuth();
  if (role !== 'admin') return <Navigate to="/" replace />;
  return <>{children}</>;
}

function RequireEmployee({ children }: { children: React.ReactNode }) {
  const { role } = useAuth();
  if (role !== 'employee') return <Navigate to="/" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      
      {/* Rutas Admin */}
      <Route 
        path="/admin" 
        element={
          <RequireAdmin>
            <AppLayout />
          </RequireAdmin>
        } 
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="empleados" element={<Empleados />} />
        <Route path="inventario" element={<Inventario />} />
        <Route path="tracking" element={<Tracking />} />
      </Route>

      {/* Rutas Empleado */}
      <Route 
        path="/empleado" 
        element={
          <RequireEmployee>
            <AppLayout />
          </RequireEmployee>
        }
      >
        <Route index element={<Navigate to="mapa" replace />} />
        <Route path="historial" element={<Historial />} />
        <Route path="mapa" element={<MapaPedidos />} />
        <Route path="soporte" element={<Soporte />} />
      </Route>
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
