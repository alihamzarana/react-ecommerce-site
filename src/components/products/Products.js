import { Grid } from '@material-ui/core'
import React from 'react'
import Product from "./Product/Product";
import useStyles from "./Style"

const Products = ({products, addItemsToCart}) => {
    const classes = useStyles()

    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
           <Grid container spacing={4} justifyContent="center">
               {
                   products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} addItemsToCart={addItemsToCart}/>
                    </Grid>
                   )
                      
                   )
               }
               
           </Grid>
       </main>
    )
}

export default Products
