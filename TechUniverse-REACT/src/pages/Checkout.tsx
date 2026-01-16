import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock } from "lucide-react";
import { toast } from "sonner";

const Checkout = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Pedido realizado con éxito");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Finalizar Compra</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información de envío</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input id="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Apellidos</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" type="tel" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input id="address" required />
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Ciudad</Label>
                      <Input id="city" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">Provincia</Label>
                      <Input id="state" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">Código Postal</Label>
                      <Input id="zip" required />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Información de pago
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Número de tarjeta</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Fecha de expiración</Label>
                      <Input id="expiry" placeholder="MM/YY" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" maxLength={3} required />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    <span>Pago seguro encriptado SSL</span>
                  </div>
                </CardContent>
              </Card>

              <Button type="submit" size="lg" className="w-full gradient-primary">
                Completar pedido
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resumen del pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">599.00€</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Envío</span>
                    <span className="font-semibold">Gratis</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">IVA (21%)</span>
                    <span className="font-semibold">125.79€</span>
                  </div>
                  
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between text-xl">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-primary">724.79€</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                      📦
                    </div>
                    <div>
                      <p className="font-semibold">AMD Ryzen 9 7950X</p>
                      <p className="text-xs text-muted-foreground">Cantidad: 1</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
