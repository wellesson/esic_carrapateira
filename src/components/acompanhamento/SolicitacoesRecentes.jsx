
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient'; 
import { useToast } from '@/components/ui/use-toast';

const SolicitacoesRecentes = ({ solicitacoes, setProtocolo, setSolicitacao }) => {
  const { toast } = useToast();

  if (!solicitacoes || solicitacoes.length === 0) return null;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Em análise':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'Respondido':
      case 'Concluído':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Negado':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <HelpCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const handleCardClick = async (protocolo) => {
    setProtocolo(protocolo);
    try {
      const { data, error } = await supabase
        .from('solicitacoes')
        .select('*')
        .eq('protocolo', protocolo)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setSolicitacao(data);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
         toast({
          title: "Protocolo não encontrado",
          description: "Não foi possível carregar os detalhes desta solicitação.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Erro ao buscar solicitação recente:", error);
      toast({
        title: "Erro ao carregar",
        description: `Detalhes: ${error.message}`,
        variant: "destructive"
      });
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-12 text-center"
    >
      <h2 className="text-xl font-semibold mb-4">Solicitações Recentes</h2>
      <p className="text-muted-foreground mb-6">
        Abaixo estão listadas algumas das últimas solicitações. Clique para ver detalhes.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {solicitacoes.map((sol, index) => (
          <Card 
            key={index} 
            className="text-left cursor-pointer hover:shadow-md transition-shadow" 
            onClick={() => handleCardClick(sol.protocolo)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">Protocolo: {sol.protocolo}</CardTitle>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(sol.status)}
                  <span className="text-xs">{sol.status}</span>
                </div>
              </div>
              <CardDescription>
                {formatDate(sol.data_solicitacao)}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="font-medium text-sm">{sol.assunto || "Sem assunto"}</p>
              <p className="text-sm text-muted-foreground truncate">{sol.descricao}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

export default SolicitacoesRecentes;