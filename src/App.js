import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce'
import {Products, Navbar, Cart} from './components'

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
    <div>
        <Navbar numOfItems={cart.total_items}/>
        <Cart cart={cart} />
        {/* <Products products={products} handleAddToCart={handleAddToCart}/> */}
    </div>
  )
}

export default App;