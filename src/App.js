import React, { useState,useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import Store from "../src/Page/Store";
import Cart from "./Page/Cart";
const StoreContext = React.createContext()
function App() {
  const [ProductStore, SetProductStore] = useState([])
  const [CartStore, SetCartStore] = useState([])
   const cart = localStorage.getItem('cart')
   useEffect(()=>{
    if(!cart){SetCartStore([])}
    else{SetCartStore(JSON.parse(cart))}
},[])
  return (
    <StoreContext.Provider
      value={{
        ProductStore, SetProductStore,
        CartStore, SetCartStore
      }}>
      <Routes>
        <Route path='/' element={<Store />} />
        <Route path='/Cart' element={<Cart />} />
      </Routes>
    </StoreContext.Provider>
  );
}
export { StoreContext }
export default App;
