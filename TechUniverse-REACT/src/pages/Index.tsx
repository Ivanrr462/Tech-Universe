import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { ChevronRight, Zap, Shield, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-tech.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  const featuredProducts = products.filter((p) => p.isNew);
  const discountProducts = products.filter((p) => p.discount);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-20" />
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 z-10">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-primary font-semibold">
                  🔥 Nuevos productos disponibles
                </span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Tu tienda de{" "}
                <span className="gradient-primary bg-clip-text text-transparent">
                  electrónica online
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Smartphones, portátiles, televisores y mucho más al mejor precio.
                Envío gratis en pedidos superiores a 50€.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="gradient-primary">
                  Ver ofertas
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Explorar categorías
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 gradient-primary opacity-20 blur-3xl" />
              <img
                src={heroImage}
                alt="Gaming Setup"
                className="rounded-2xl shadow-2xl relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-border bg-card/50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Envío Gratis</h3>
                <p className="text-sm text-muted-foreground">
                  En pedidos +50€
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Garantía Extendida</h3>
                <p className="text-sm text-muted-foreground">
                  Hasta 3 años
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Entrega Rápida</h3>
                <p className="text-sm text-muted-foreground">
                  24-48 horas
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Productos Destacados</h2>
            <p className="text-muted-foreground">
              Lo último en tecnología
            </p>
          </div>
          <Link to="/category/todos">
            <Button variant="ghost">
              Ver todo <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {featuredProducts.map((product) => (
              <CarouselItem
                key={product.id}
                className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <ProductCard {...product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Discount Products Carousel */}
      <section className="container mx-auto px-4 py-16 bg-card/30">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Ofertas Especiales</h2>
            <p className="text-muted-foreground">
              Aprovecha los mejores descuentos
            </p>
          </div>
          <Link to="/category/ofertas">
            <Button variant="ghost">
              Ver todo <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {discountProducts.map((product) => (
              <CarouselItem
                key={product.id}
                className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <ProductCard {...product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 gradient-primary opacity-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">
            ¿Necesitas ayuda para elegir?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Nuestro equipo de expertos está aquí para ayudarte a encontrar
            el producto perfecto para ti
          </p>
          <Button size="lg" className="gradient-primary">
            Contactar con expertos
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">ElectroStore</h3>
              <p className="text-sm text-muted-foreground">
                Tu tienda de confianza para todo tipo de electrónica.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categorías</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Smartphones</li>
                <li>Portátiles</li>
                <li>Televisores</li>
                <li>Audio</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Información</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Sobre nosotros</li>
                <li>Contacto</li>
                <li>Envíos</li>
                <li>Devoluciones</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Política de privacidad</li>
                <li>Términos y condiciones</li>
                <li>Cookies</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 ElectroStore. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
