import React from 'react';
import './app.css';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Main from './Components/Main/Main';
import Navbar from './Components/Navbar/Navbar';
import { ListingProvider } from './Functions/ListingContext';

function App() {
  return (
    <>
    <ListingProvider>
      <Navbar/>
      <Home/>
      <Main/>
      <Footer/>
    </ListingProvider>
    </>
  );
}

export default App;
