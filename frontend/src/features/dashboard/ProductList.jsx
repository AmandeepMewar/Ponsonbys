import Loader from '../../ui/Loader';
import { useProducts } from './useProducts';
export default function ProductList() {
  const { data, isLoading } = useProducts();
  console.log(data);
  if (isLoading) return <Loader />;
  return <div>ProductList</div>;
}
