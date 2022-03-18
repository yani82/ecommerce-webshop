import React from 'react'
import { connect } from 'react-redux'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart, CallMissedSharp } from '@material-ui/icons';

import useStyles from './styles'; 

const Product = ({ product }) => {
    const classes = useStyles(); 

  return (
    <Card classname={classes.root}>
        <CardMedia className={classes.media} image={product.image} title={product.name} />
        <CardContent>
            <div className={classes.cardContent}>
                <Typography variant='h5' gutterBottom> 
                    {product.name} 
                </Typography>
                <Typography variant='h5'>
                    {product.price} 
                </Typography>
            </div>
            <Typography variant='body2' color='textSecondary'> 
                {product.description}
            </Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
            <IconButton aria-label='Add to Cart'> 
                <AddShoppingCart />
            </IconButton>
        </CardActions>
    </Card>
  );
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Product)