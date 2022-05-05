import React from 'react';
import { Grid } from '@material-ui/core';
import Product from './Product/Product';


const products = [
    {id:1, name: 'Shoes', description: 'Running shoes', price: '$5', image:'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1619487269-tr3mmst080-shoe-angle-global-mens-tree-runner-mist-white-b11537e4-5c45-4443-a1dd-c70c31779715-png-1619487255.jpg?crop=1xw:1xh;center,top&resize=480:*'},
    {id:2, name: 'Macbook', description: 'Apple Macbook', price: '$10',image:'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/HA244_AV3?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1631831845000'}
]

const Products = () => {
    return(
        <main>
            <Grid container justifyContent="center" spacing={4}>
                {products.map((eachProduct)=>{
                    return (<Grid item key={eachProduct.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={eachProduct}/>
                    </Grid>)
                })}
            </Grid>
        </main>
        )
}

export default Products;