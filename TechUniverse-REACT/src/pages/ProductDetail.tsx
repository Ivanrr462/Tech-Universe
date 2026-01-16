import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { products } from "@/data/products";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Truck, Shield } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/hooks/useCart";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <Button onClick={() => navigate("/")}>Volver al inicio</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast.success("Producto añadido al carrito");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-xl bg-card border border-border">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                {product.isNew && <Badge className="bg-accent">Nuevo</Badge>}
                {product.discount && (
                  <Badge className="gradient-primary">{product.discount}% OFF</Badge>
                )}
                {product.stock < 10 && (
                  <Badge variant="outline" className="border-destructive text-destructive">
                    ¡Solo quedan {product.stock}!
                  </Badge>
                )}
              </div>

              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-5xl font-bold text-primary">{product.price}€</span>
                {product.originalPrice && (
                  <span className="text-2xl text-muted-foreground line-through">
                    {product.originalPrice}€
                  </span>
                )}
              </div>

              <p className="text-lg text-muted-foreground mb-6">
                {product.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="flex-1 gradient-primary"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Añadir al carrito
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Envío gratis</p>
                    <p className="text-xs text-muted-foreground">24-48h</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Garantía</p>
                    <p className="text-xs text-muted-foreground">2 años</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Specifications */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Especificaciones</h3>
                <div className="space-y-3">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">{key}</span>
                      <span className="font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
