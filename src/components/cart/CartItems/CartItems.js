import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@material-ui/core'
import React from 'react'
import useStyles from "./Style"

const CartItems = ({item,  handleUpdateCartQty, handleRemoveFromCart}) => {
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <CardMedia image={item.media.source} alt={item.name} className={classes.cardMedia} />
            <CardContent className={classes.cardContent}>
                <Typography variant="h5"> {item.name} </Typography>
                <Typography variant="h5"> {item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.button}>
                    <Button type="button" size="small" onClick = {() => handleUpdateCartQty(item.id, item.quantity - 1) } >-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)} >+</Button>
                </div>
                <Button type="button" variant="contained" color="secondary" onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
            </CardActions>
            
        </Card>
      
    )
}

export default CartItems
