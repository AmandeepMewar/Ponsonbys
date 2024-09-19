import { Star, Trash } from 'lucide-react';
import Button from '../../../ui/Button';
import Loader from '../../../ui/Loader';
import NotFound from '../../../ui/NotFound';
import Table from '../../../ui/Table';
import { useDeleteProduct } from '../hooks/useDeleteProduct';
import { useProducts } from '../hooks/useProducts';
import { useToggleFeaturedProduct } from '../hooks/useToggleFeaturedProduct';

const headers = ['Product', 'Price', 'Category', 'Featured', 'Actions'];

export default function ProductTable() {
  const { data: products, isLoading: isLoadingProducts } = useProducts();
  const { deleteProduct, isLoading: isLoadingDelete } = useDeleteProduct();
  const { toggleFeaturedProduct, isLoading: isLoadingFeatured } =
    useToggleFeaturedProduct();

  const isLoading = isLoadingProducts || isLoadingDelete || isLoadingFeatured;

  if (isLoading) return <Loader />;

  if (!products?.length)
    return (
      <NotFound>
        📦 No products found. Start adding new products to manage your
        inventory.
      </NotFound>
    );

  return (
    <Table className='min-w-full divide-y divide-yellow-900'>
      <Table.Header headers={headers} />
      <Table.Body>
        {products?.map((product) => (
          <tr key={product._id} className='hover:bg-yellow-50'>
            <Table.Row>
              <div className='flex items-center'>
                <div className='h-10 w-10 flex-shrink-0'>
                  <img
                    className='h-10 w-10 rounded-full object-cover'
                    src={product.image}
                    alt={product.name}
                  />
                </div>
                <div className='ml-4'>
                  <div className='text-sm font-medium'>{product.name}</div>
                </div>
              </div>
            </Table.Row>
            <Table.Row value={product.price.toFixed(2)} />

            <Table.Row value={product.category} />

            <Table.Row>
              <Button
                onClick={() => toggleFeaturedProduct(product._id)}
                className={`rounded-full p-1 ${
                  product.isFeatured
                    ? 'bg-orange-600 text-yellow-200'
                    : 'bg-yellow-100 text-orange-600'
                } transition-colors duration-200 hover:bg-yellow-200`}
              >
                <Star className='h-5 w-5' />
              </Button>
            </Table.Row>

            <Table.Row>
              <Button
                onClick={() => deleteProduct(product._id)}
                className='text-red-400 hover:text-red-300'
              >
                <Trash className='h-5 w-5' />
              </Button>
            </Table.Row>
          </tr>
        ))}
      </Table.Body>
    </Table>
  );
}
