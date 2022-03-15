import React from 'react';
import Grid from '@material-ui/core';

const products = [
    {id: 1, name: 'T-shirt', description: 'All Smiles in NY'},
    {id: 2, name: 'Hoodie', description: '2002 Lets Lepak zip-up' }
];

const Products = () => {
  <main>
      <Grid container justify="center" spacing={4}>
            {products.map((products) - (
                <Grid item key={products.id} xs={12} sm={6} md={4} lg={3}>
                    <Product />
                </Grid>
            ))}
      </Grid>
  </main>  
}

export default Products; 
