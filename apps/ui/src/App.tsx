import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { ToastProvider } from './contexts/ToastContext';
import { UserProvider } from './contexts/UserContext';
import { ExpensesProvider } from './contexts/ExpensesContext';
import { ExpenseDialogsProvider } from './contexts/ExpenseDialogsContext';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardPage } from './pages/Dashboard';
import { ExpensesPage } from './pages/Expenses';
import { SettingsPage } from './pages/Settings';

interface AppProps {
  /** Simulates what the mock API returns on first load. */
  dataScenario?: 'default' | 'empty' | 'load-error';
  /** Makes add/edit/delete fail so error toasts can be previewed. */
  failMutations?: boolean;
}

export function App({ dataScenario = 'default', failMutations = false }: AppProps) {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ToastProvider>
          <UserProvider>
            <ExpensesProvider scenario={dataScenario} failMutations={failMutations}>
              <ExpenseDialogsProvider>
                <Routes>
                  <Route element={<AppLayout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="expenses" element={<ExpensesPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Route>
                </Routes>
              </ExpenseDialogsProvider>
            </ExpensesProvider>
          </UserProvider>
        </ToastProvider>
      </BrowserRouter>
    </MotionConfig>);

}