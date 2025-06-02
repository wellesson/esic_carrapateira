import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, LogOut, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext'; 

const AdminLayout = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="h-5 w-5 mr-2" /> },
  ];
  
  if (location.pathname === '/admin/login' && !isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen bg-muted">
        <motion.main
          className="flex-grow flex items-center justify-center p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.main>
      </div>
    );
  }


  return (
    <div className="flex min-h-screen">
      {isAuthenticated && (
        <aside className="w-64 bg-background border-r p-6 flex flex-col">
          <Link to="/admin/dashboard" className="flex items-center space-x-2 mb-10">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-xl">AD</span>
            </div>
            <h1 className="text-xl font-bold">Painel Admin</h1>
          </Link>
          <nav className="flex-grow">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Button variant="outline" onClick={logout} className="w-full">
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </aside>
      )}
      <div className="flex-1 flex flex-col bg-muted/40">
        {isAuthenticated && (
           <header className="bg-background border-b p-4 flex justify-end">
             <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">Admin User</span>
             </div>
           </header>
        )}
        <motion.main
          className="flex-grow p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};

export default AdminLayout;