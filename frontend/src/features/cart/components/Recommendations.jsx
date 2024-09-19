import ProductItem from '../../category/ProductItem';
import { useRecommendations } from '../hooks/useRecommendations';

export default function Recommendations() {
  const { products: recommendations = [] } = useRecommendations();
  return (
    <div className='mt-10'>
      <h3 className='text-2xl font-semibold text-yellow-800'>
        You Might Also Like
      </h3>

      <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {recommendations.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
