import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { FileText, Send, User, Mail, FileBadge, Phone, Building, MessageSquare, CheckCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/AlertDialog";

const SolicitacaoPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    documento: '',
    telefone: '',
    orgao: '',
    assunto: '',
    descricao: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showProtocolModal, setShowProtocolModal] = useState(false);
  const [generatedProtocol, setGeneratedProtocol] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateProtocolo = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const randomNumber = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${year}${month}${day}-${randomNumber}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const protocolo = generateProtocolo();
    setGeneratedProtocol(protocolo); 
    const solicitacaoData = {
      ...formData,
      protocolo,
      status: 'Em análise',
      data_solicitacao: new Date().toISOString(),
    };

    try {
      const { data, error } = await supabase
        .from('solicitacoes')
        .insert([solicitacaoData])
        .select();

      if (error) {
        throw error;
      }
      
      setShowProtocolModal(true);
      setFormData({
        nome: '',
        email: '',
        documento: '',
        telefone: '',
        orgao: '',
        assunto: '',
        descricao: '',
      });
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error);
      toast({
        title: 'Erro ao Enviar Solicitação',
        description: `Ocorreu um problema ao registrar sua solicitação. Detalhes: ${error.message}. Por favor, tente novamente.`,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const orgaos = [
    { value: 'prefeitura', label: 'Prefeitura Municipal' },
    { value: 'camara-vereadores', label: 'Câmara de Vereadores' },
    { value: 'secretaria-educacao', label: 'Secretaria de Educação' },
    { value: 'secretaria-saude', label: 'Secretaria de Saúde' },
    { value: 'secretaria-obras', label: 'Secretaria de Obras' },
    { value: 'outros', label: 'Outros' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Card className="shadow-xl border-t-4 border-primary">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <FileText className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">Solicitar Informação</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Preencha o formulário abaixo para fazer sua solicitação de acesso à informação.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-8 pt-8">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center text-primary">
                  <User className="mr-2 h-6 w-6" />
                  Dados do Solicitante
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} placeholder="Seu nome completo" required disabled={isSubmitting} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="seu@email.com" required disabled={isSubmitting} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="documento">Documento (CPF/CNPJ)</Label>
                    <Input id="documento" name="documento" value={formData.documento} onChange={handleChange} placeholder="Seu CPF ou CNPJ" required disabled={isSubmitting} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone (Opcional)</Label>
                    <Input id="telefone" name="telefone" type="tel" value={formData.telefone} onChange={handleChange} placeholder="(00) 00000-0000" disabled={isSubmitting} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center text-primary">
                  <MessageSquare className="mr-2 h-6 w-6" />
                  Detalhes da Solicitação
                </h2>
                <div className="space-y-2">
                  <Label htmlFor="orgao">Órgão Destinatário</Label>
                  <Select name="orgao" onValueChange={(value) => handleSelectChange('orgao', value)} value={formData.orgao} required disabled={isSubmitting}>
                    <SelectTrigger id="orgao">
                      <SelectValue placeholder="Selecione o órgão" />
                    </SelectTrigger>
                    <SelectContent>
                      {orgaos.map(org => (
                        <SelectItem key={org.value} value={org.value}>{org.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assunto">Assunto (Opcional)</Label>
                  <Input id="assunto" name="assunto" value={formData.assunto} onChange={handleChange} placeholder="Ex: Informações sobre licitação X" disabled={isSubmitting} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição da Solicitação</Label>
                  <Textarea
                    id="descricao"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    placeholder="Descreva detalhadamente a informação que você busca..."
                    rows={6}
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end pt-8">
              <Button type="submit" className="font-semibold text-lg px-8 py-6" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Send className="mr-2 h-5 w-5 animate-pulse" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Enviar Solicitação
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>

      <AlertDialog open={showProtocolModal} onOpenChange={setShowProtocolModal}>
        <AlertDialogContent className="sm:max-w-md md:max-w-lg">
          <AlertDialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <AlertDialogTitle className="text-2xl text-center">Solicitação Enviada com Sucesso!</AlertDialogTitle>
            <AlertDialogDescription className="text-center text-base py-4">
              Sua solicitação foi registrada. Anote o número do protocolo para acompanhar seu pedido:
              <div className="my-4 p-3 bg-primary/10 border border-primary/30 rounded-md">
                <p className="text-lg font-bold text-primary tracking-wider">{generatedProtocol}</p>
              </div>
              Você também pode copiar o número do protocolo clicando nele.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="justify-center">
            <AlertDialogAction 
              onClick={() => {
                setShowProtocolModal(false);
                navigator.clipboard.writeText(generatedProtocol).then(() => {
                  toast({ title: "Protocolo copiado!", description: "O número do protocolo foi copiado para a área de transferência." });
                }).catch(err => {
                  console.error('Falha ao copiar protocolo: ', err);
                  toast({ title: "Erro ao copiar", description: "Não foi possível copiar o protocolo automaticamente.", variant: "destructive" });
                });
              }}
              className="px-6 py-3 text-lg"
            >
              Copiar Protocolo e Fechar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
};

export default SolicitacaoPage;