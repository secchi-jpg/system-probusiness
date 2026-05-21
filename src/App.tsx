/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import { AuthProvider, useAuth } from './store/authStore';

// Pages
import Login from './pages/Login';
import AdminDashboard from './pages/admin/Dashboard';

import EmployeeLayout from './pages/employee/Layout';
import Visitas from './pages/employee/Visitas';
import Pedidos from './pages/employee/Pedidos';
import NuevaVenta from './pages/employee/NuevaVenta';
import Clientes from './pages/employee/Clientes';
import Facturas from './pages/employee/Facturas';

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
      
      {/* Admin Routes */}
      <Route 
        path="/admin" 
        element={
          <RequireAdmin>
            <AdminDashboard />
          </RequireAdmin>
        } 
      />

      {/* Employee Routes */}
      <Route 
        path="/employee" 
        element={
          <RequireEmployee>
            <EmployeeLayout />
          </RequireEmployee>
        }
      >
        <Route index element={<Navigate to="visitas" replace />} />
        <Route path="visitas" element={<Visitas />} />
        <Route path="pedidos" element={<Pedidos />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="facturas" element={<Facturas />} />
      </Route>
      
      {/* Employee Nueva Venta (No Layout Bottom Bar, has its own full-screen layout) */}
      <Route 
        path="/employee/nueva-venta" 
        element={
          <RequireEmployee>
            <NuevaVenta />
          </RequireEmployee>
        }
      />
      
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
