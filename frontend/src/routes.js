import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BooksPage from './pages/BooksPage';
import UsersPage from './pages/Users/UsersPage';
import LoansPage from './pages/Loans/LoansPage';
import DashboardPage from './pages/Dashboard/DashboardPage';

const AppRoutes = () => (
    <Routes>
        <Route path="/books" element={<BooksPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/loans" element={<LoansPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
);

export default AppRoutes;
