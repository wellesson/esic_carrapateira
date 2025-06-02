
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, AlertCircle, HelpCircle, Paperclip } from 'lucide-react';

const SolicitacaoDetails = ({ solicitacao }) => {
  if (!solicitacao) return null;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Em análise':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'Respondido':
      case 'Concluído':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Negado':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <HelpCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const formatFileSize = (size) => {
    if (!size || isNaN(size)) return '0 KB';
    if (size < 1024) return `${size} Bytes`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="shadow-lg border-t-4" style={{ borderTopColor: 'hsl(var(--primary))' }}>
        <CardHeader>
          <CardTitle>Resultado da Consulta</CardTitle>
          <CardDescription>
            Detalhes da solicitação com protocolo {solicitacao.protocolo}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Informações do Solicitante</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Nome</p>
                  <p>{solicitacao.nome}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Documento</p>
                  <p>{solicitacao.documento}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Contato</p>
                  <p>{solicitacao.email}</p>
                  {solicitacao.telefone && <p>{solicitacao.telefone}</p>}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Informações da Solicitação</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Órgão Destinatário</p>
                  <p>{solicitacao.orgao.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                </div>
                {solicitacao.assunto && (
                  <div>
                    <p className="text-sm font-medium">Assunto</p>
                    <p>{solicitacao.assunto}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium">Data da Solicitação</p>
                  <p>{formatDate(solicitacao.data_solicitacao)}</p>
                </div>
                 {solicitacao.data_resposta && (
                  <div>
                    <p className="text-sm font-medium">Data da Resposta</p>
                    <p>{formatDate(solicitacao.data_resposta)}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {getStatusIcon(solicitacao.status)}
                    <span>{solicitacao.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Descrição da Solicitação</h3>
            <p className="p-3 bg-muted rounded-md whitespace-pre-wrap">{solicitacao.descricao}</p>
          </div>

          {solicitacao.resposta_admin && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Resposta</h3>
              <div className="p-3 bg-muted rounded-md whitespace-pre-wrap">
                <p>{solicitacao.resposta_admin}</p>
              </div>
            </div>
          )}

          {solicitacao.anexos_admin && solicitacao.anexos_admin.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Anexos da Resposta</h3>
              <ul className="space-y-2">
                {solicitacao.anexos_admin.map((anexo, index) => (
                  <li key={index} className="flex items-center space-x-2 p-2 border rounded-md bg-muted/50">
                    <Paperclip className="h-4 w-4 text-primary" />
                    <span className="text-sm">{anexo.name}</span>
                    <span className="text-xs text-muted-foreground">({formatFileSize(anexo.size)})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline" onClick={() => window.print()}>
            Imprimir Comprovante
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default SolicitacaoDetails;