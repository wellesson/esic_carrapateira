
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, Clock, FileText, Paperclip, Send, XCircle, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

const AdminSolicitacaoDetalhePage = () => {
  const { protocolo } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [solicitacao, setSolicitacao] = useState(null);
  const [resposta, setResposta] = useState('');
  const [novoStatus, setNovoStatus] = useState('');
  const [anexos, setAnexos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchSolicitacao = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('solicitacoes')
          .select('*')
          .eq('protocolo', protocolo)
          .single();

        if (error && error.code !== 'PGRST116') throw error;

        if (data) {
          setSolicitacao(data);
          setResposta(data.resposta_admin || '');
          setNovoStatus(data.status || '');
          setAnexos(data.anexos_admin || []);
        } else {
          toast({
            title: "Erro",
            description: "Solicitação não encontrada.",
            variant: "destructive",
          });
          navigate('/admin/dashboard');
        }
      } catch (error) {
        console.error("Erro ao buscar solicitação:", error);
        toast({
          title: "Erro ao Carregar",
          description: `Não foi possível carregar os detalhes da solicitação. Detalhes: ${error.message}`,
          variant: "destructive",
        });
        navigate('/admin/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    if (protocolo) {
      fetchSolicitacao();
    }
  }, [protocolo, navigate, toast]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newAnexos = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      
      url: `simulated/${file.name}` 
    }));
    setAnexos(prev => [...prev, ...newAnexos]);
    
    toast({
        title: "Anexo Adicionado (Simulado)",
        description: `${files.length} arquivo(s) foram adicionados à lista. O upload real não é implementado.`,
    });
  };

  const removeAnexo = (index) => {
    setAnexos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitResposta = async () => {
    if (!resposta.trim() && anexos.length === 0) {
        toast({
            title: "Atenção",
            description: "A resposta ou um anexo é obrigatório para alterar o status.",
            variant: "destructive"
        });
        return;
    }
    if(!novoStatus) {
        toast({
            title: "Atenção",
            description: "Selecione um novo status para a solicitação.",
            variant: "destructive"
        });
        return;
    }

    setIsSubmitting(true);
    
    try {
      const updateData = {
        status: novoStatus,
        resposta_admin: resposta,
        anexos_admin: anexos,
        data_resposta: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('solicitacoes')
        .update(updateData)
        .eq('protocolo', protocolo)
        .select()
        .single();

      if (error) throw error;

      setSolicitacao(data);
      toast({
        title: "Sucesso!",
        description: "Resposta enviada e status atualizado.",
      });
      navigate('/admin/dashboard');

    } catch (error) {
      console.error("Erro ao atualizar solicitação:", error);
      toast({
        title: "Erro ao Atualizar",
        description: `Não foi possível atualizar a solicitação. Detalhes: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(dateString));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Em análise': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'Respondido':
      case 'Concluído': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Negado': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2">Carregando solicitação...</p>
      </div>
    );
  }

  if (!solicitacao) {
     return (
      <div className="flex justify-center items-center h-full">
        <p>Solicitação não encontrada ou erro ao carregar.</p>
      </div>
    );
  }


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Button variant="outline" onClick={() => navigate('/admin/dashboard')} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar para o Dashboard
      </Button>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">Detalhes da Solicitação</CardTitle>
              <CardDescription>Protocolo: {solicitacao.protocolo}</CardDescription>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
              {getStatusIcon(solicitacao.status)}
              <span className="font-medium">{solicitacao.status}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Informações do Solicitante</h3>
            <p><strong>Nome:</strong> {solicitacao.nome}</p>
            <p><strong>Email:</strong> {solicitacao.email}</p>
            <p><strong>Documento:</strong> {solicitacao.documento}</p>
            {solicitacao.telefone && <p><strong>Telefone:</strong> {solicitacao.telefone}</p>}
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Informações da Solicitação</h3>
            <p><strong>Órgão Destinatário:</strong> {solicitacao.orgao.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
            <p><strong>Assunto:</strong> {solicitacao.assunto || 'N/A'}</p>
            <p><strong>Data da Solicitação:</strong> {formatDate(solicitacao.data_solicitacao)}</p>
            {solicitacao.data_resposta && <p><strong>Data da Resposta:</strong> {formatDate(solicitacao.data_resposta)}</p>}
          </div>
          <div className="md:col-span-2 space-y-2">
            <h3 className="font-semibold text-lg border-b pb-2">Descrição da Solicitação</h3>
            <p className="p-3 bg-muted rounded-md whitespace-pre-wrap">{solicitacao.descricao}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Responder Solicitação</CardTitle>
          <CardDescription>Forneça uma resposta e atualize o status da solicitação.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="resposta">Resposta</Label>
            <Textarea
              id="resposta"
              value={resposta}
              onChange={(e) => setResposta(e.target.value)}
              placeholder="Digite a resposta para o cidadão..."
              rows={5}
              className="mt-1"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <Label htmlFor="anexos">Anexos (Simulado)</Label>
            <div className="mt-1 flex items-center">
              <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isSubmitting}>
                <Paperclip className="h-4 w-4 mr-2" />
                Adicionar Anexo
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                multiple
                onChange={handleFileChange}
                className="hidden"
                disabled={isSubmitting}
              />
            </div>
            {anexos.length > 0 && (
              <div className="mt-3 space-y-2">
                <p className="text-sm font-medium">Arquivos anexados:</p>
                <ul className="list-disc list-inside space-y-1">
                  {anexos.map((anexo, index) => (
                    <li key={index} className="text-sm flex items-center justify-between">
                      <span>
                        {anexo.name} ({(anexo.size / 1024).toFixed(1)} KB)
                      </span>
                      <Button variant="ghost" size="sm" onClick={() => removeAnexo(index)} disabled={isSubmitting}>
                        <XCircle className="h-4 w-4 text-red-500" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="status">Atualizar Status</Label>
            <Select value={novoStatus} onValueChange={setNovoStatus} disabled={isSubmitting}>
              <SelectTrigger id="status" className="mt-1">
                <SelectValue placeholder="Selecione um novo status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Em análise">Em Análise</SelectItem>
                <SelectItem value="Respondido">Respondido</SelectItem>
                <SelectItem value="Concluído">Concluído</SelectItem>
                <SelectItem value="Negado">Negado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmitResposta} disabled={isSubmitting || isLoading} className="w-full md:w-auto">
            {isSubmitting ? (
              <>
                <Send className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Enviar Resposta e Atualizar
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AdminSolicitacaoDetalhePage;