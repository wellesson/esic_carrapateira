import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Search, Clock, ArrowRight, Info, ShieldCheck, Users, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const HomePage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-pattern">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
                Bem-vindo ao e-SIC
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-foreground">
                Sistema Eletrônico do Serviço de Informação ao Cidadão
              </h2>
              <p className="text-lg mb-8 text-muted-foreground">
                Acesse informações públicas, faça suas solicitações e acompanhe seus pedidos de forma simples, rápida e transparente.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="font-semibold text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link to="/solicitacao">
                    Nova Solicitação
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="font-semibold text-lg px-8 py-6 border-primary text-primary hover:bg-primary/10">
                  <Link to="/acompanhamento">Acompanhar Pedido</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-primary/10 rounded-lg transform rotate-3 -z-10"></div>
                <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/bff3ce53-47b2-4eac-89b4-6c0c65ebd6e4/c59a0650239173bf33f91b8ad9c2c6d7.png" alt="Interface moderna do sistema e-SIC com gráficos e ícones de informação" className="relative rounded-lg shadow-xl w-full h-auto" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-primary">Como o e-SIC Funciona?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              O e-SIC facilita o exercício do seu direito de acesso à informação pública de forma eficiente e organizada.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <FileText className="h-12 w-12 text-primary" />,
                title: "Faça sua Solicitação",
                description: "Registre seu pedido de informação de maneira clara e objetiva através de nosso formulário online.",
                link: "/solicitacao"
              },
              {
                icon: <Clock className="h-12 w-12 text-primary" />,
                title: "Acompanhe o Status",
                description: "Utilize o número de protocolo para verificar o andamento da sua solicitação a qualquer momento.",
                link: "/acompanhamento"
              },
              {
                icon: <ShieldCheck className="h-12 w-12 text-primary" />,
                title: "Receba a Resposta",
                description: "As informações solicitadas serão disponibilizadas conforme os prazos estabelecidos pela Lei de Acesso à Informação.",
                link: "/acompanhamento" 
              }
            ].map((service, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="h-full transition-all hover:shadow-xl hover:border-primary/50 border-transparent border-2 group flex flex-col">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-6 p-3 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors">{service.icon}</div>
                    <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground text-center">{service.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-center pt-4">
                    <Button asChild variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10">
                      <Link to={service.link}>
                        Saiba Mais
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-primary">Transparência e Cidadania</h2>
              <p className="mb-4 text-lg text-muted-foreground">
                O Sistema Eletrônico de Informações ao Cidadão (e-SIC) é a ferramenta que materializa o direito fundamental de acesso à informação pública, garantido pela Lei nº 12.527/2011.
              </p>
              <p className="mb-6 text-muted-foreground">
                Com o e-SIC, o poder público se torna mais transparente e a participação cidadã é fortalecida, contribuindo para uma gestão mais democrática e eficiente.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-primary mr-3" />
                  <p>Qualquer pessoa, física ou jurídica, pode fazer um pedido de informação.</p>
                </div>
                <div className="flex items-center">
                  <BarChart3 className="h-6 w-6 text-primary mr-3" />
                  <p>Acompanhe dados, gastos públicos, contratos e muito mais.</p>
                </div>
                <div className="flex items-center">
                  <Info className="h-6 w-6 text-primary mr-3" />
                   <p>Consulte a legislação e entenda seus direitos.</p>
                </div>
              </div>
              <Button asChild variant="outline" className="mt-8 border-primary text-primary hover:bg-primary/10">
                <Link to="/legislacao">
                  <Info className="mr-2 h-4 w-4" />
                  Conhecer a Lei de Acesso
                </Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="relative w-full max-w-lg">
                 <div className="absolute inset-0 bg-primary/10 rounded-lg transform -rotate-3 -z-10"></div>
                <img-replace alt="Gráficos e documentos simbolizando transparência governamental e acesso à informação" className="relative rounded-lg shadow-xl w-full h-auto" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Tem alguma dúvida ou precisa de uma informação específica?</h2>
            <p className="mb-10 max-w-2xl mx-auto opacity-90 text-lg">
              Não hesite em utilizar o e-SIC. Seu direito à informação é fundamental para a democracia.
            </p>
            <Button asChild size="lg" variant="secondary" className="font-semibold text-lg px-10 py-7 text-primary hover:bg-secondary/90">
              <Link to="/solicitacao">
                Registrar Pedido Agora
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;