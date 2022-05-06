import React from 'react'
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import './CartItem.css'


function CartItem({ item }) {
  return (
    <Card className='card'>
        <CardMedia image={item.image.url} alt={item.name} className="cardMedia"/>
        <CardContent className='cardContent'>
            <Typography variant='h5' className="cardTitle">{item.name}</Typography>
            <Typography variant='h6'>{item.price.formatted_with_symbol}</Typography>
        </CardContent>
        <CardActions  className="cardActions">
            <div className='buttons'>
                <Button type='button' size='small'>-</Button>
                <Typography>{item.quantity}</Typography>
                <Button type='button' size='small'>+</Button>
            </div>
            <Button variant='contained' type='button' color='secondary'>Remove</Button>            
        </CardActions>
    </Card>
  )
}

export default CartItem