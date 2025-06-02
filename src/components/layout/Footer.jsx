import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/bff3ce53-47b2-4eac-89b4-6c0c65ebd6e4/ea803062ce7d4222ac5ab0b4ce731c5e.jpg" alt="Logo Prefeitura" className="h-16 w-auto" />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Sistema Eletrônico do Serviço de Informação ao Cidadão da Prefeitura Municipal.
            </p>
          </div>

          <div>
            <p className="font-semibold mb-4">Links Rápidos</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/solicitacao" className="hover:text-primary transition-colors">
                  Solicitar Informação
                </Link>
              </li>
              <li>
                <Link to="/acompanhamento" className="hover:text-primary transition-colors">
                  Acompanhar Solicitação
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary transition-colors">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link to="/legislacao" className="hover:text-primary transition-colors">
                  Legislação
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Prefeitura Municipal. Todos os direitos reservados.</p>
          <p>Desenvolvido para o Sistema de Informação ao Cidadão.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;