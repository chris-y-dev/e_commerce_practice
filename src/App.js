import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import {Products, Navbar, Cart, Checkout} from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { set } from 'react-hook-form';

function App() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMsg, setErrorMsg] = useState('')

  //function that fetches Product data
  const fetchProducts = async ()=> {
    const {data} = await commerce.products.list(); //returns promise then destructure response
    setProducts(data); //setProducts with data retrieved
  }
  //function that fetches Cart data
  const fetchCart = async ()=>{
    const cart = await commerce.cart.retrieve();
    setCart(cart)
  }

  //call on click. Add item to cart
  const handleAddToCart = async (product, quantity)=>{
    console.log(product)

    const response = await commerce.cart.add(product.id, quantity)

    console.log('added')
    console.log(response)
    setCart(response.cart)
  }

  //update cart item
  const handleUpdateCartQty = async(productId, quantity) =>{
    const response = await commerce.cart.update(productId, { quantity })

    console.log('updated');
    console.log(response)
    setCart(response.cart) //responds with updated cart -> set state
  }

  //Remove cart item
  const handleRemoveFromCart = async(productId)=>{
    const response = await commerce.cart.remove(productId)
    console.log('deleted');
    setCart(response.cart)
  }

  //Empty cart
  const handleEmptyCart = async()=>{
    const response = await commerce.cart.empty();
    console.log('empty');
    setCart(response.cart);
  }

  //funciton to remove all items after capturing order
  const refreshCart = async()=>{
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  }

  //final function call for fulfillment
  const handleCaptureCheckout = async (checkoutTokenId, newOrder)=>{
    try{
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      //capture then reset cart
      setOrder(incomingOrder);
      console.log(incomingOrder)
      refreshCart();
    } catch(error){
      setErrorMsg(error.data.error.message)
    }
  }

  //when load, fetch Products and set state
  useEffect(()=>{
    fetchProducts(); 
    fetchCart();
  }, [])

  console.log(products)
  console.log(cart); //show cart object. Includes list of items, subtotal, dates...etc


  //set Routes for different pages/components
  return (
    <Router>

      <div>
          <Navbar numOfItems={cart.total_items}/>
          <Routes>
            <Route path="/" element={
              <Products products={products} handleAddToCart={handleAddToCart} />}
              />
            <Route path="/cart" element={ 
              <Cart 
                cart={cart} 
                handleUpdateCartQty={handleUpdateCartQty}
                handleRemoveFromCart={handleRemoveFromCart}
                handleEmptyCart={handleEmptyCart}
                />} />
            <Route path='/checkout' 
              element={<Checkout 
                cart={cart} 
                order={order}
                handleCaptureCheckout={handleCaptureCheckout}
                error={errorMsg}
                refreshCart={refreshCart}
                />} />
          </Routes>
      </div>
    </Router>
  )
}

export default App;