import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import styled from 'styled-components';
import { About, Auth, Cart, Error, Home, Checkout, PrivateRoute, Products, SingleProduct } from './pages';
import Product from './components/Product';

// domain     dev-mb40oudze6mddx0h.us.auth0.com
// client id  bx5tjf3I7UBbtzXu5DZFPc0sb2IsSuR0
function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='cart' element={<Cart />} />
        <Route path='products' element={<Products />} />
        <Route path='products/:id' element={<SingleProduct />} />
        <Route
          path='checkout'
          element={
            // child
            // <PrivateRoute>
            <Checkout />
            // </PrivateRoute>
          }
        />
        {/* global error */}
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
