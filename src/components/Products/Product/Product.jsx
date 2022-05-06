import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

import './Product.css';

function Product({product, handleAddToCart}) {


  return (
      <Card className='card'>
            <CardMedia image={product.image.url} title={product.name} className='cardMedia' />
          <CardContent>
            <div>
                <Typography variant="h5" gutterBottom  className='cardTitle'>
                    {product.name}
                </Typography>
                <Typography variant="h6" className='cardPrice'>
                    {product.price.formatted_with_symbol}
                </Typography>
            </div>
            <Typography variant="body2" dangerouslySetInnerHTML={{__html: product.description}}></Typography>
          </CardContent>
          <CardActions disableSpacing>
              <IconButton aria-label='Add to cart' onClick={()=>handleAddToCart(product.id, 1)} >
                  <AddShoppingCart />
              </IconButton>
          </CardActions>
      </Card>
  )
}

export default Product