import React from 'react';
import { Grid } from '@material-ui/core';

import Product from '../Product/Product'; 

const products = [
    {id: 1, name: 'T-shirt', description: 'All Smiles in NY', price: '$45', image: 'https://cdn.shopify.com/s/files/1/0441/4967/0041/products/1smilesWHTtee_1024x1024@2x.jpg?v=1637607901'},
    {id: 2, name: 'Hoodie', description: '2002 Lets Lepak zip-up', price: '$55', image: 'https://images.squarespace-cdn.com/content/v1/5a57bf09914e6b232aaa0bc7/1645323341850-1D0CAME772SST4F4CE0R/DSC03015.jpg?format=2500w'}
];

const Products = () => {
    return (
  <main>
      <Grid container justify="center" spacing={4}>
            {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <Product product={product} />
                </Grid>
            ))}
      </Grid>
  </main>  
    );
};

export default Products; 
