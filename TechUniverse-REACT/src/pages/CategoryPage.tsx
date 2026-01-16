import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams();
  
  const categoryMap: Record<string, string> = {
    "procesadores": "Procesadores",
    "tarjetas-gráficas": "Tarjetas Gráficas",
    "memorias-ram": "Memorias RAM",
    "almacenamiento": "Almacenamiento",
    "placas-base": "Placas Base",
    "periféricos": "Periféricos",
  };

  const categoryName = categoryMap[category || ""] || "Todos";
  
  const filteredProducts = category && category !== "todos"
    ? products.filter(p => p.category === categoryName)
    : products;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{categoryName}</h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} productos disponibles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
