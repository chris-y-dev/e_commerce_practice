import React from 'react';
import { Grid, CssBaseline } from '@material-ui/core';
import Product from './Product/Product';
import './Products.css'

const Products = ({products, handleAddToCart}) => {

    

    return(
        <main className="productsContent">
        <CssBaseline/>
            <div className='toolbarMargin'/>
            <Grid container justifyContent="center" spacing={4} className="gridContainer">
                {products.map((eachProduct)=>{
                    return (<Grid item key={eachProduct.id} xs={12} sm={6} md={4} lg={3} className='gridItem'>
                        <Product product={eachProduct} handleAddToCart={handleAddToCart}/>
                    </Grid>)
                })}
            </Grid>
        </main>
        )
}

export default Products;