import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, HelpCircle, FileText, Clock, User } from 'lucide-react';

const FaqPage = () => {
  const faqCategories = [
    {
      id: "geral",
      label: "Geral",
      icon: <HelpCircle className="h-4 w-4" />,
      questions: [
        {
          question: "O que é o Sistema de Informação ao Cidadão (SIC)?",
          answer: "O Sistema de Informação ao Cidadão (SIC) é um serviço que permite a qualquer pessoa, física ou jurídica, encaminhar pedidos de acesso à informação para órgãos e entidades do poder público. Foi criado para atender às determinações da Lei de Acesso à Informação (Lei nº 12.527/2011)."
        },
        {
          question: "Quem pode solicitar informações pelo SIC?",
          answer: "Qualquer pessoa, física ou jurídica, pode solicitar informações pelo SIC, sem necessidade de apresentar motivo ou justificativa para o pedido."
        },
        {
          question: "É preciso pagar alguma taxa para solicitar informações?",
          answer: "Não. O acesso à informação pública é gratuito. Apenas em casos específicos, quando há necessidade de reprodução de documentos, poderá ser cobrado o valor necessário ao ressarcimento do custo dos serviços e dos materiais utilizados."
        },
        {
          question: "Quais informações posso solicitar?",
          answer: "Você pode solicitar qualquer informação pública produzida ou custodiada pelos órgãos e entidades públicas que não esteja classificada como sigilosa, conforme previsto na Lei de Acesso à Informação."
        }
      ]
    },
    {
      id: "solicitacao",
      label: "Solicitações",
      icon: <FileText className="h-4 w-4" />,
      questions: [
        {
          question: "Como faço para solicitar uma informação?",
          answer: "Para solicitar uma informação, acesse a página 'Solicitar Informação' neste portal, preencha o formulário com seus dados pessoais e descreva de forma clara e específica a informação desejada. Após o envio, você receberá um número de protocolo para acompanhamento."
        },
        {
          question: "Quais dados são obrigatórios para fazer uma solicitação?",
          answer: "Para fazer uma solicitação, é obrigatório informar: nome completo, documento de identificação (CPF ou CNPJ), e-mail para contato e a descrição clara da informação solicitada. O telefone é opcional, mas recomendado para facilitar o contato."
        },
        {
          question: "Posso solicitar qualquer tipo de informação?",
          answer: "Você pode solicitar qualquer informação pública que não esteja protegida por sigilo. Informações pessoais, sigilosas por lei (como segurança nacional, segredo de justiça, etc.) ou que exijam trabalhos adicionais de análise e consolidação podem ter restrições ou prazos diferenciados."
        },
        {
          question: "Existe limite de solicitações que posso fazer?",
          answer: "Não há limite para o número de solicitações que uma pessoa pode fazer. No entanto, pedidos repetitivos ou que caracterizem abuso do direito podem ser negados, conforme previsto na legislação."
        }
      ]
    },
    {
      id: "prazos",
      label: "Prazos",
      icon: <Clock className="h-4 w-4" />,
      questions: [
        {
          question: "Qual é o prazo para receber a resposta da minha solicitação?",
          answer: "O prazo para resposta é de até 20 (vinte) dias corridos, contados a partir do primeiro dia útil após o recebimento da solicitação. Este prazo pode ser prorrogado por mais 10 (dez) dias, mediante justificativa expressa."
        },
        {
          question: "O que acontece se o prazo de resposta não for cumprido?",
          answer: "Se o prazo não for cumprido, você pode entrar com recurso administrativo. O descumprimento do prazo sem justificativa pode caracterizar conduta ilícita do agente público responsável."
        },
        {
          question: "Como sou informado sobre a prorrogação do prazo?",
          answer: "Caso haja necessidade de prorrogação do prazo, você será informado por meio do e-mail cadastrado na solicitação, com a devida justificativa para a extensão do prazo."
        },
        {
          question: "Existe prazo para entrar com recurso caso minha solicitação seja negada?",
          answer: "Sim. O prazo para apresentar recurso é de 10 (dez) dias, contados da ciência da decisão de negativa de acesso à informação ou do término do prazo para resposta."
        }
      ]
    },
    {
      id: "acompanhamento",
      label: "Acompanhamento",
      icon: <Search className="h-4 w-4" />,
      questions: [
        {
          question: "Como acompanho o andamento da minha solicitação?",
          answer: "Para acompanhar sua solicitação, acesse a página 'Acompanhar Solicitação' e informe o número de protocolo recebido no momento do envio do pedido. O sistema mostrará o status atual da sua solicitação."
        },
        {
          question: "O que fazer se eu perder o número do protocolo?",
          answer: "Caso tenha perdido o número do protocolo, você pode entrar em contato com o SIC por meio dos canais de atendimento disponíveis, informando seus dados pessoais para recuperação do número."
        },
        {
          question: "Quais são os possíveis status da minha solicitação?",
          answer: "Os principais status são: 'Em análise' (solicitação recebida e em processamento), 'Concluído' (resposta disponível) e 'Negado' (acesso à informação foi negado, com a devida justificativa)."
        },
        {
          question: "Posso alterar minha solicitação após o envio?",
          answer: "Não é possível alterar uma solicitação após o envio. Caso necessite modificar alguma informação, recomendamos que faça uma nova solicitação, mencionando o protocolo anterior."
        }
      ]
    },
    {
      id: "recursos",
      label: "Recursos",
      icon: <User className="h-4 w-4" />,
      questions: [
        {
          question: "O que é um recurso e quando posso apresentá-lo?",
          answer: "Recurso é um pedido de revisão da resposta recebida. Você pode apresentar recurso quando: sua solicitação for negada; a informação fornecida for incompleta ou não corresponder à solicitada; não concordar com a justificativa legal para a classificação da informação como sigilosa; ou quando o prazo de resposta não for cumprido."
        },
        {
          question: "Como faço para apresentar um recurso?",
          answer: "Para apresentar um recurso, acesse a página 'Acompanhar Solicitação', localize sua solicitação pelo número de protocolo e clique na opção 'Apresentar Recurso'. Justifique o motivo do recurso e envie."
        },
        {
          question: "Qual é o prazo para resposta de um recurso?",
          answer: "O prazo para resposta de um recurso é de 5 (cinco) dias úteis, contados do recebimento do recurso pela autoridade competente."
        },
        {
          question: "Quantas instâncias recursais existem?",
          answer: "Existem até quatro instâncias recursais: 1ª instância - dirigido à autoridade hierarquicamente superior à que negou o acesso; 2ª instância - dirigido à autoridade máxima do órgão; 3ª instância - dirigido à Controladoria-Geral; e 4ª instância - dirigido à Comissão Mista de Reavaliação de Informações."
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
          <h1 className="text-3xl font-bold mb-2">Perguntas Frequentes</h1>
          <p className="text-muted-foreground">
            Encontre respostas para as dúvidas mais comuns sobre o Sistema de Informação ao Cidadão.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="mr-2 h-5 w-5 text-primary" />
              FAQ - Perguntas e Respostas
            </CardTitle>
            <CardDescription>
              Selecione uma categoria para visualizar as perguntas relacionadas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="geral" className="w-full">
              <TabsList className="w-full justify-start overflow-x-auto mb-6">
                {faqCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="flex items-center">
                    {category.icon}
                    <span className="ml-1">{category.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {faqCategories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left font-medium">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <h2 className="text-xl font-semibold mb-4">Não encontrou o que procurava?</h2>
          <p className="text-muted-foreground mb-6">
            Se você não encontrou a resposta para sua dúvida, faça uma solicitação de informação.
          </p>
          <div className="flex justify-center">
            <a href="/solicitacao" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Solicitar Informação
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FaqPage;