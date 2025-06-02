import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/layout/Layout';
import AdminLayout from '@/components/layout/AdminLayout';
import HomePage from '@/pages/HomePage';
import SolicitacaoPage from '@/pages/SolicitacaoPage';
import AcompanhamentoPage from '@/pages/AcompanhamentoPage';
import FaqPage from '@/pages/FaqPage';
import LegislacaoPage from '@/pages/LegislacaoPage';
import NotFoundPage from '@/pages/NotFoundPage';
import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import AdminSolicitacaoDetalhePage from '@/pages/admin/AdminSolicitacaoDetalhePage';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="solicitacao" element={<SolicitacaoPage />} />
          <Route path="acompanhamento" element={<AcompanhamentoPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="legislacao" element={<LegislacaoPage />} />
        </Route>
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="login" element={<AdminLoginPage />} />
          <Route 
            path="dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="solicitacao/:protocolo" 
            element={
              <ProtectedRoute>
                <AdminSolicitacaoDetalhePage />
              </ProtectedRoute>
            } 
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;