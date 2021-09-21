import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'
import React from 'react'
import useStyles from './style'

const Product = ({product, addItemsToCart}) => {
    const classes = useStyles();
    // console.log(product)

 
    
    return (
        <Card className={classes.root}>
            <CardMedia  className={classes.cardMedia} image={product.media.source} title={product.name}/>
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography 
                    variant="h5" 
                    gutterBottom
                    >
                        {product.name}
                    </Typography>
                    <Typography 
                    variant="h5"
                     >
                        {product.price.formatted_with_symbol}
                    </Typography>
                </div>
                    <Typography 
                    variant="body2" 
                    color="textSecondary"
                    dangerouslySetInnerHTML={{__html:product.description}}
                    />
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add To Cart"onClick={() => addItemsToCart(product.id, 1)}>
                    <AddShoppingCart/>
                </IconButton>
            </CardActions>
        </Card>
    )
}


export default Product
