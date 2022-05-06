import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import './Cart.css';

function Cart({ cart }) {

    //function to render JSX if empty
    function EmptyCart(){
        return <Typography variant="subtitle1">You have no items in your shopping cart. Start adding some!</Typography>
    }
    //function to render if NOT empty
    function FilledCart(){
        return <>
            <Grid container spacing={3}>
            {cart.line_items.map((item)=>{
                return <Grid item xs={12} sm={4} key={item.id}>
                    <div>
                        Name: {item.name}, Quantity: {item.quantity}
                    </div>
                </Grid>
            })}
            </Grid>
            <div>
                <Typography variant='h4'>
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                    <div>
                        <Button size='large' type='button' variant='contained' color="secondary">Empty Cart</Button>
                        <Button size='large' type='button' variant='contained' color="primary">Check Out</Button>
                    </div>
                </Typography>
            </div>
        </>
    }

    if (!cart.line_items) return 'Loading...'

  return (
    <Container>
        <div className='toolbarMargin'/>
        <Typography variant='h3'>Your Shopping Cart</Typography>
        {!cart.line_items.length? <EmptyCart /> : <FilledCart />}
    </Container>
  )
}

export default Cart