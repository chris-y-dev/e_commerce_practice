import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

import './Product.css';

function Product({product}) {
    console.log(product)
  return (
      <Card className='card'>
            <CardMedia image={product.image} title={product.name} className='cardMedia' />
          <CardContent>
            <div>
                <Typography variant="h5" gutterBottom  className='cardTitle'>
                    {product.name}
                </Typography>
                <Typography variant="h5" className='cardPrice'>
                    {product.price}
                </Typography>
            </div>
            <Typography variant="body2">{product.description}</Typography>
          </CardContent>
          <CardActions disableSpacing>
              <IconButton aria-label='Add to cart'>
                  <AddShoppingCart />
              </IconButton>
          </CardActions>
      </Card>
  )
}

export default Product