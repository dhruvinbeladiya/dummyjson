import './mycss.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBars } from "react-icons/fa";
import { Routes, Route } from "react-router-dom"
import { Link } from "react-router-dom";
import Home from './Home';
import Product from './Product';
import Shop from './Shop';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/shop/:id" element={<Shop />} />
      </Routes>
    </>
  );
}

export default App;
//code update
//dummyjson data load
