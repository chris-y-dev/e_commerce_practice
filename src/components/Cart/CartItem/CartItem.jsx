import React from 'react'
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import './CartItem.css'


function CartItem({ item, onUpdateCartQty, onRemoveFromCart }) {




  return (
    <Card className='card'>
        <CardMedia image={item.image.url} alt={item.name} className="cardMedia"/>
        <CardContent className='cardContent'>
            <div class="cardTitlePriceCart">
            <Typography variant='h5'>{item.name}</Typography>
            <Typography variant='h6'>{item.price.formatted_with_symbol}</Typography>
            </div>
        </CardContent>
        <CardActions  className="cardActions">
            <div className='buttons'>
                <Button type='button' size='small' onClick={()=> onUpdateCartQty(item.id, item.quantity-1)}>-</Button>
                <Typography>{item.quantity}</Typography>
                <Button type='button' size='small' onClick={()=> onUpdateCartQty(item.id, item.quantity+1)}>+</Button>
            </div>
            <Button variant='contained' type='button' color='secondary' onClick={()=>{onRemoveFromCart(item.id)}}>Remove</Button>            
        </CardActions>
    </Card>
  )
}

export default CartItem