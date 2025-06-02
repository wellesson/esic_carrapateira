import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import SolicitacaoSearchForm from '@/components/acompanhamento/SolicitacaoSearchForm';
import SolicitacaoDetails from '@/components/acompanhamento/SolicitacaoDetails';

import { supabase } from '@/lib/supabaseClient';

const AcompanhamentoPage = () => {
  const { toast } = useToast();
  const [protocolo, setProtocolo] = useState('');
  const [solicitacao, setSolicitacao] = useState(null);
  const [isSearching, setIsSearching] = useState(false);


  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!protocolo.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, informe o número do protocolo.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSearching(true);
    setSolicitacao(null); 
    
    try {
      const { data, error } = await supabase
        .from('solicitacoes')
        .select('*')
        .eq('protocolo', protocolo.trim())
        .single();

      if (error && error.code !== 'PGRST116') { 
        throw error;
      }
      
      if (data) {
        setSolicitacao(data);
      } else {
        toast({
          title: "Protocolo não encontrado",
          description: "Verifique o número informado e tente novamente.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Erro ao buscar solicitação:', error);
      toast({
        title: "Erro na Busca",
        description: `Ocorreu um problema ao buscar a solicitação. Detalhes: ${error.message}`,
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Acompanhar Solicitação</h1>
          <p className="text-muted-foreground">
            Informe o número do protocolo para consultar o status da sua solicitação.
          </p>
        </div>

        <SolicitacaoSearchForm 
          protocolo={protocolo}
          setProtocolo={setProtocolo}
          handleSearch={handleSearch}
          isSearching={isSearching}
        />

        {solicitacao && <SolicitacaoDetails solicitacao={solicitacao} />}

      </motion.div>
    </div>
  );
};

export default AcompanhamentoPage;