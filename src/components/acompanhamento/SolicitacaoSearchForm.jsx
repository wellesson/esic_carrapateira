import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';

const SolicitacaoSearchForm = ({ protocolo, setProtocolo, handleSearch, isSearching }) => {
  return (
    <Card className="shadow-lg mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Search className="mr-2 h-5 w-5 text-primary" />
          Consulta de Protocolo
        </CardTitle>
        <CardDescription>
          Digite o número do protocolo recebido no momento da solicitação.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="protocolo">Número do Protocolo</Label>
            <div className="flex space-x-2">
              <Input
                id="protocolo"
                value={protocolo}
                onChange={(e) => setProtocolo(e.target.value)}
                placeholder="Digite o número do protocolo"
                className="flex-1"
                disabled={isSearching}
              />
              <Button 
                type="submit" 
                disabled={isSearching}
              >
                {isSearching ? 'Buscando...' : 'Buscar'}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SolicitacaoSearchForm;