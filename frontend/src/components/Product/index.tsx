import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../Rating';
import { IProducts, IVariant } from '@/interfaces/Products';
import { ProductStyled } from './styled'; // Import các styled-components đã chuyển đổi

interface IProductProps {
  product: IProducts;
}

const Product: React.FC<IProductProps> = ({ product }) => {
  const totalQuantitySold = product.variants.reduce(
    (total: number, variant: IVariant) => total + variant.quantitySold,
    0
  );

  return (
   
     <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img style={{ height: 250 }} src={product.image} alt='Ảnh sản phẩm' variant='top' />
      </Link>

      <Card.Body>
      <Card.Title as='div' className='product-title'>
        <Link to={`/product/${product._id}`}>  
            <strong className='product-title'>{product.productName}</strong>
        </Link>
        </Card.Title>
        <strong style={{ fontFamily: 'serif' }}>Giá: {product.price}</strong>
        {product.variants.some((variant) => variant.discount > 0) && <div style={{position:"absolute",top:0,right:0,backgroundColor:"red",
        color:"white",padding:5,
        fontSize:15,fontFamily:"bold"}} className='sale-badge'>Sale</div>}

        <Card.Text as='div'>
          <Rating valueRating={product.rating} text={`${product.numReviews} reviews`} color='#f8e825' />{' '}
          <strong style={{ color: 'red' }}>Đã bán:</strong> {totalQuantitySold}
        </Card.Text>

        <Card.Text as='div'></Card.Text>
      </Card.Body>
    </Card>
 
  );
};

export default Product;
