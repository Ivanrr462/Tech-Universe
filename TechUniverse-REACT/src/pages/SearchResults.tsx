import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { useSearchParams } from "react-router-dom";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Resultados para "{query}"
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} productos encontrados
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">
              No se encontraron productos para tu búsqueda
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
