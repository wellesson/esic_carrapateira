import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Info, FileText, Search, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Início', path: '/', icon: <Info className="h-4 w-4 mr-1" /> },
    { name: 'Solicitar Informação', path: '/solicitacao', icon: <FileText className="h-4 w-4 mr-1" /> },
    { name: 'Acompanhar Solicitação', path: '/acompanhamento', icon: <Clock className="h-4 w-4 mr-1" /> },
    { name: 'Perguntas Frequentes', path: '/faq', icon: <Search className="h-4 w-4 mr-1" /> },
    { name: 'Legislação', path: '/legislacao', icon: <FileText className="h-4 w-4 mr-1" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/bff3ce53-47b2-4eac-89b4-6c0c65ebd6e4/5e0b22b67a0919882476127a6f14501a.jpg" alt="Logo Prefeitura" className="h-10 md:h-12 w-auto" />
        </Link>

        <nav className="hidden md:flex space-x-2 lg:space-x-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted hover:text-primary'
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-primary"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t bg-background"
          >
            <nav className="flex flex-col space-y-1 p-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-md text-base font-medium flex items-center ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted hover:text-primary'
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;