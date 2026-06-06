import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-white/40 rounded-[2rem] border-2 border-dashed border-pink-100">
        <p className="text-2xl font-bold text-gray-400">No products found matching your criteria ✨</p>
        <p className="text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
