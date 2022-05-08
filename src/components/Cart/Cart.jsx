import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom'
import './Cart.css';

function Cart({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) {

    //function to render JSX if empty
    function EmptyCart(){
        return <Typography variant="subtitle1">You have no items in your shopping cart. 
        <Link to='/' className='link'>Start adding some!</Link>
        </Typography>
    }
    //function to render if NOT empty
    function FilledCart(){
        return <>
            <Grid container spacing={3} className='cartGrid'>
            {cart.line_items.map((item)=>{
                return <Grid item xs={12} sm={4} key={item.id}>
                    <div>
                        <CartItem item={item} 
                            onUpdateCartQty={handleUpdateCartQty}
                            onRemoveFromCart={handleRemoveFromCart}/>
                    </div>
                </Grid>
            })}
            </Grid>
            <div>
                <Typography variant='h4' className="cartBottom">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                    <div className='cartButtons'>
                        <Button size='large' type='button' variant='contained' color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
                        <Button size='large' type='button' variant='contained' color="primary" component={Link} to="/checkout">Check Out</Button>
                    </div>
                </Typography>
            </div>
        </>
    }


    if (!cart.line_items) return 'Loading...';

  return (
    <Container>
        <div className='toolbarMargin'/>
        <Typography variant='h4' gutterBottom>Your Shopping Cart</Typography>
        {!cart.line_items.length? <EmptyCart /> : <FilledCart />}
    </Container>
  )
}

export default Cart