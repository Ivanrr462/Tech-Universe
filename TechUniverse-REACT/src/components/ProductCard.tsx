import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  discount?: number;
}

export const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  isNew,
  discount,
}: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ id, name, price, image });
    toast.success("Producto añadido al carrito");
  };

  return (
    <Card className="group relative overflow-hidden border-border hover:border-primary/50 transition-all duration-300">
      {(isNew || discount) && (
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {isNew && <Badge className="bg-accent">Nuevo</Badge>}
          {discount && (
            <Badge className="gradient-primary">{discount}% OFF</Badge>
          )}
        </div>
      )}

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Heart className="h-4 w-4" />
      </Button>

      <Link to={`/product/${id}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </Link>

      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{category}</p>
        <Link to={`/product/${id}`}>
          <h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">{price}€</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {originalPrice}€
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="sm" onClick={handleAddToCart}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Añadir al carrito
        </Button>
      </CardFooter>
    </Card>
  );
};
