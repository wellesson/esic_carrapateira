
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Filter, Search, RefreshCw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

const AdminDashboardPage = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchSolicitacoes = async () => {
    setIsLoading(true);
    try {
      let query = supabase.from('solicitacoes').select('*').order('data_solicitacao', { ascending: false });

      if (searchTerm) {
        query = query.or(`protocolo.ilike.%${searchTerm}%,nome.ilike.%${searchTerm}%,assunto.ilike.%${searchTerm}%`);
      }
      if (statusFilter !== 'todos') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setSolicitacoes(data || []);
    } catch (error) {
      console.error('Erro ao buscar solicitações:', error);
      toast({
        title: "Erro ao carregar solicitações",
        description: `Detalhes: ${error.message}`,
        variant: "destructive",
      });
      setSolicitacoes([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSolicitacoes();
  }, [statusFilter]); 
  
  const handleSearch = (e) => {
    e.preventDefault();
    fetchSolicitacoes();
  };


  const getStatusVariant = (status) => {
    switch (status) {
      case 'Em análise': return 'default';
      case 'Concluído': return 'success';
      case 'Respondido': return 'success';
      case 'Negado': return 'destructive';
      default: return 'secondary';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
  };

  const countSolicitacoesByStatus = (status) => {
    return solicitacoes.filter(s => s.status === status).length;
  };
  
  const stats = [
    { label: 'Total de Solicitações', value: solicitacoes.length, color: 'bg-blue-500' },
    { label: 'Em Análise', value: countSolicitacoesByStatus('Em análise'), color: 'bg-yellow-500' },
    { label: 'Respondidas', value: countSolicitacoesByStatus('Respondido') + countSolicitacoesByStatus('Concluído'), color: 'bg-green-500' },
    { label: 'Negadas', value: countSolicitacoesByStatus('Negado'), color: 'bg-red-500' },
  ];


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard de Solicitações</h1>
        <Button onClick={fetchSolicitacoes} variant="outline" disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <Card key={stat.label} className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <div className={`h-4 w-4 rounded-full ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Lista de Solicitações</CardTitle>
          <CardDescription>Gerencie e responda às solicitações dos cidadãos.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por protocolo, nome ou assunto..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter} disabled={isLoading}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="Em análise">Em Análise</SelectItem>
                  <SelectItem value="Respondido">Respondido</SelectItem>
                  <SelectItem value="Concluído">Concluído</SelectItem>
                  <SelectItem value="Negado">Negado</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <Button type="submit" disabled={isLoading}>
                <Search className="h-4 w-4 mr-2 md:hidden" />
                <span className="hidden md:inline">Buscar</span>
            </Button>
          </form>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Protocolo</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Assunto</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      <RefreshCw className="mx-auto h-6 w-6 animate-spin text-primary" />
                      Carregando solicitações...
                    </TableCell>
                  </TableRow>
                ) : solicitacoes.length > 0 ? (
                  solicitacoes.map((solicitacao) => (
                    <TableRow key={solicitacao.protocolo}>
                      <TableCell className="font-medium">{solicitacao.protocolo}</TableCell>
                      <TableCell>{solicitacao.nome}</TableCell>
                      <TableCell>{solicitacao.assunto || 'N/A'}</TableCell>
                      <TableCell>{formatDate(solicitacao.data_solicitacao)}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(solicitacao.status)}>
                          {solicitacao.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant="outline" size="sm">
                          <Link to={`/admin/solicitacao/${solicitacao.protocolo}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            Detalhes
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Nenhuma solicitação encontrada com os filtros atuais.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminDashboardPage;