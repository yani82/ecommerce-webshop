
import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';  
import { commerce } from './lib/commerce'; 
import { Products, Navbar, Cart, CheckOut } from './components'; 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false); 
  const [products, setProducts] = useState([]); 
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({}); 
  const [errorMessage, setErrorMessage] = useState(''); 

  const fetchProducts = async () => {
    const { data } = await commerce.products.list(); 

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart); 
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });

    setCart(response.cart); 
  };

  const handleRemoveFromCart = async (productId) => {
    // or (lineItemId) 
    const { cart } = await commerce.cart.remove(productId);
    // Or update(lineItemId, { quantity }); 

    setCart(cart);
  }; 

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    
    setCart(cart); 
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh(); 

    setCart(newCart); 
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder); 

      setOrder(incomingOrder); 

      refreshCart(); 
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  }; 

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []); 

  // console.log(cart);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen); 

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <CssBaseline /> 
        <Navbar totalItems = {cart.total_items} handleDrawerToggle={handleDrawerToggle} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} handleUpdateCartQty />
          </Route>
          <Route exact path="/cart">
            <Cart 
              cart={cart} 
              onUpdateCartQty={handleUpdateCartQty} 
              onRemoveFromCart={handleRemoveFromCart}
              onEmptyCart={handleEmptyCart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>
          <Route exact path="/checkout">
            {/* or Route path="/checkout" exact */}
              <CheckOut cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;