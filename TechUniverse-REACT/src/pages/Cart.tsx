import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Carrito de Compras</h1>

        {items.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-xl text-muted-foreground mb-6">Tu carrito está vacío</p>
              <Button onClick={() => navigate("/")}>Continuar comprando</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{item.name}</h3>
                        <p className="text-2xl font-bold text-primary mb-4">{item.price}€</p>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center font-semibold">
                              {item.quantity}
                            </span>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold mb-4">Resumen del pedido</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold">{subtotal.toFixed(2)}€</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Envío</span>
                      <span className="font-semibold">
                        {shipping === 0 ? "Gratis" : `${shipping.toFixed(2)}€`}
                      </span>
                    </div>
                    
                    {shipping > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Añade {(50 - subtotal).toFixed(2)}€ más para envío gratis
                      </p>
                    )}
                    
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between text-xl">
                        <span className="font-bold">Total</span>
                        <span className="font-bold text-primary">{total.toFixed(2)}€</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full gradient-primary" 
                    size="lg"
                    onClick={() => navigate("/checkout")}
                  >
                    Proceder al pago
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate("/")}
                  >
                    Continuar comprando
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
