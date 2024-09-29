import Slider from 'react-slick';
import ProductItem from './ProductItem';
import { useFeaturedProducts } from './useFeaturedProducts';

export default function FeaturedProducts() {
  const { data: products = [] } = useFeaturedProducts();

  if (products.length < 3) return null;

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <div className='my-20'>
      <h3 className='mb-3 text-3xl font-bold text-yellow-700'>
        Featured Products
      </h3>
      <div>
        <Slider {...settings}>
          {products?.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </Slider>
      </div>
    </div>
  );
}
