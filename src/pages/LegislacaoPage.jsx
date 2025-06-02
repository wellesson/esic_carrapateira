import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, BookOpen, Scale, ExternalLink } from 'lucide-react';

const LegislacaoPage = () => {
  const legislacoes = [
    {
      id: "federal",
      label: "Federal",
      icon: <Scale className="h-4 w-4" />,
      leis: [
        {
          nome: "Lei nº 12.527, de 18 de novembro de 2011",
          descricao: "Lei de Acesso à Informação - Regula o acesso a informações previsto no inciso XXXIII do art. 5º, no inciso II do § 3º do art. 37 e no § 2º do art. 216 da Constituição Federal.",
          link: "http://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm",
          principais: [
            "Estabelece procedimentos para garantir o acesso à informação pública",
            "Define conceitos e diretrizes para a classificação de informações sigilosas",
            "Estabelece prazos para atendimento das solicitações",
            "Define responsabilidades e sanções em caso de descumprimento"
          ]
        },
        {
          nome: "Decreto nº 7.724, de 16 de maio de 2012",
          descricao: "Regulamenta a Lei de Acesso à Informação no âmbito do Poder Executivo Federal.",
          link: "http://www.planalto.gov.br/ccivil_03/_ato2011-2014/2012/decreto/d7724.htm",
          principais: [
            "Detalha procedimentos para implementação da Lei de Acesso à Informação",
            "Estabelece regras para transparência ativa e passiva",
            "Define competências e responsabilidades dos órgãos",
            "Regulamenta o funcionamento do Serviço de Informação ao Cidadão (SIC)"
          ]
        },
        {
          nome: "Lei Complementar nº 101, de 4 de maio de 2000",
          descricao: "Lei de Responsabilidade Fiscal - Estabelece normas de finanças públicas voltadas para a responsabilidade na gestão fiscal.",
          link: "http://www.planalto.gov.br/ccivil_03/leis/lcp/lcp101.htm",
          principais: [
            "Determina a transparência da gestão fiscal",
            "Estabelece instrumentos de transparência fiscal",
            "Prevê a participação popular na elaboração de planos e orçamentos",
            "Define sanções pelo descumprimento das normas"
          ]
        },
        {
          nome: "Lei Complementar nº 131, de 27 de maio de 2009",
          descricao: "Lei da Transparência - Acrescenta dispositivos à Lei de Responsabilidade Fiscal, a fim de determinar a disponibilização, em tempo real, de informações pormenorizadas sobre a execução orçamentária e financeira.",
          link: "http://www.planalto.gov.br/ccivil_03/leis/lcp/lcp131.htm",
          principais: [
            "Determina a disponibilização de informações em tempo real",
            "Estabelece prazos para implementação da transparência",
            "Define o conteúdo mínimo a ser divulgado",
            "Prevê sanções pelo descumprimento"
          ]
        }
      ]
    },
    {
      id: "estadual",
      label: "Estadual",
      icon: <FileText className="h-4 w-4" />,
      leis: [
        {
          nome: "Lei Estadual de Acesso à Informação",
          descricao: "Regulamenta o acesso à informação no âmbito estadual, em conformidade com a Lei Federal nº 12.527/2011.",
          link: "#",
          principais: [
            "Adapta as diretrizes federais à realidade estadual",
            "Estabelece procedimentos específicos para órgãos estaduais",
            "Define competências e responsabilidades no âmbito estadual",
            "Estabelece prazos e procedimentos para atendimento das solicitações"
          ]
        },
        {
          nome: "Decreto Estadual de Regulamentação",
          descricao: "Regulamenta a Lei Estadual de Acesso à Informação, detalhando procedimentos e responsabilidades.",
          link: "#",
          principais: [
            "Detalha o funcionamento do SIC estadual",
            "Estabelece fluxos de atendimento às solicitações",
            "Define responsabilidades dos órgãos estaduais",
            "Regulamenta a classificação de informações sigilosas"
          ]
        }
      ]
    },
    {
      id: "municipal",
      label: "Municipal",
      icon: <BookOpen className="h-4 w-4" />,
      leis: [
        {
          nome: "Lei Municipal de Acesso à Informação",
          descricao: "Regulamenta o acesso à informação no âmbito municipal, em conformidade com a Lei Federal nº 12.527/2011.",
          link: "#",
          principais: [
            "Adapta as diretrizes federais à realidade municipal",
            "Estabelece procedimentos específicos para órgãos municipais",
            "Define competências e responsabilidades no âmbito municipal",
            "Estabelece prazos e procedimentos para atendimento das solicitações"
          ]
        },
        {
          nome: "Decreto Municipal de Regulamentação",
          descricao: "Regulamenta a Lei Municipal de Acesso à Informação, detalhando procedimentos e responsabilidades.",
          link: "#",
          principais: [
            "Detalha o funcionamento do SIC municipal",
            "Estabelece fluxos de atendimento às solicitações",
            "Define responsabilidades dos órgãos municipais",
            "Regulamenta a classificação de informações sigilosas"
          ]
        },
        {
          nome: "Lei Orgânica Municipal",
          descricao: "Estabelece princípios de transparência e publicidade na administração municipal.",
          link: "#",
          principais: [
            "Define princípios de transparência na gestão municipal",
            "Estabelece diretrizes para publicidade dos atos oficiais",
            "Prevê mecanismos de participação popular",
            "Determina a prestação de contas à população"
          ]
        }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Legislação</h1>
          <p className="text-muted-foreground">
            Conheça as principais leis e normas que regulamentam o acesso à informação pública.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Scale className="mr-2 h-5 w-5 text-primary" />
              Base Legal
            </CardTitle>
            <CardDescription>
              Selecione uma esfera para visualizar a legislação correspondente.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="federal" className="w-full">
              <TabsList className="w-full justify-start mb-6">
                {legislacoes.map((legislacao) => (
                  <TabsTrigger key={legislacao.id} value={legislacao.id} className="flex items-center">
                    {legislacao.icon}
                    <span className="ml-1">{legislacao.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {legislacoes.map((legislacao) => (
                <TabsContent key={legislacao.id} value={legislacao.id} className="space-y-6">
                  {legislacao.leis.map((lei, index) => (
                    <Card key={index} className="border-l-4 border-l-primary">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center justify-between">
                          <span>{lei.nome}</span>
                          {lei.link !== "#" && (
                            <a 
                              href={lei.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm flex items-center text-primary hover:underline"
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Texto completo
                            </a>
                          )}
                        </CardTitle>
                        <CardDescription>{lei.descricao}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <h4 className="text-sm font-medium mb-2">Principais disposições:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                          {lei.principais.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 bg-muted p-6 rounded-lg"
        >
          <h2 className="text-xl font-semibold mb-4">Importância da Legislação</h2>
          <p className="text-muted-foreground mb-4">
            A legislação de acesso à informação é fundamental para garantir a transparência da administração pública e o controle social. Por meio dessas leis, os cidadãos podem exercer seu direito constitucional de acesso às informações públicas, contribuindo para a prevenção da corrupção e para o aprimoramento da gestão pública.
          </p>
          <p className="text-muted-foreground">
            O conhecimento dessas normas permite que o cidadão saiba como proceder para solicitar informações, quais são seus direitos e quais são os deveres dos órgãos públicos em relação à transparência e ao acesso à informação.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LegislacaoPage;