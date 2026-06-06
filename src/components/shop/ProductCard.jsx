import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="card group">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full text-gray-400 hover:text-red-500 transition-colors">
          <Heart size={20} />
        </button>
        {product.stock < 5 && (
           <span className="absolute top-4 left-4 bg-red-500 text-white text-xs px-2 py-1 rounded">
             Low Stock
           </span>
        )}
      </div>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg hover:text-primary transition-colors mb-1">{product.name}</h3>
        </Link>
        <p className="text-gray-500 text-sm mb-3">{product.category}</p>

        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-accent">${product.price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(product)}
            className="p-2 bg-primary-light text-primary rounded-lg hover:bg-primary hover:text-white transition-all"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
