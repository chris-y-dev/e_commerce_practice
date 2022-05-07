import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import {Products, Navbar, Cart} from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async ()=> {
    const {data} = await commerce.products.list(); //returns promise then destructure response
    setProducts(data); //setProducts with data retrieved
  }
  
  const fetchCart = async ()=>{
    const cart = await commerce.cart.retrieve();
    setCart(cart)
  }

  const handleAddToCart = async (productId, quantity)=>{
    const item = await commerce.cart.add(productId, quantity)

    console.log('added')
    console.log(item)
    setCart(item.cart)
  }

  useEffect(()=>{
    fetchProducts(); //call commerce products + set state
    fetchCart();
  }, [])

  console.log(products)
  console.log(cart); //show cart object. Includes list of items, subtotal, dates...etc

  return (
    <Router>

      <div>
          <Navbar numOfItems={cart.total_items}/>
          <Routes>
            <Route path="/" element={
              <Products products={products} handleAddToCart={handleAddToCart} />}
              />
            <Route path="/cart" element={ <Cart cart={cart} />} />
          </Routes>
      </div>
    </Router>
  )
}

export default App;