import React, {useState,useEffect,useContext} from 'react';
import Product from './component/product/Product';
import Cart from './component/cart/Cart';

export const CartContext = React.createContext('nothing');

function App() {
  const [cart,setCart] = useState([]);
  
  const addToCart = id =>{
    let index = cart.findIndex(x => x.idCart == id )
  
    if(index === -1){
      setCart([
        ...cart,
        {
          idCart:id,
          amount:1
        }
      ])
    }else{
      let arr =[...cart]
      arr[index] = {
        ...arr[index],
        amount : arr[index].amount+1
      }
      setCart(arr);
    }  
  }
  const deleteCart = id =>{
    if(cart.length !== 0) {
      let index = cart.findIndex(x => x.idCart == id )
      let exCart = [ ...cart];
      exCart.splice(index,1);
      setCart(exCart)
    }
  }
  useEffect(() => {
      if(localStorage.getItem('cart') === null){
        localStorage.setItem('cart',JSON.stringify([]));
      }else{
          let value = JSON.parse(localStorage.getItem('cart'));
          setCart(value)
      }
}, []);

useEffect(() => {
  if(cart.length !== 0){
    localStorage.setItem('cart',JSON.stringify(cart))
  }else{
    localStorage.setItem('cart',JSON.stringify([]))
  }
  
}, [cart]);

  return (
    <div className="App">
      <CartContext.Provider 
        value={
          {
            cart: [...cart],
            addToCart,
            deleteCart
          }
        } 
      
      >
        <Cart />
        <Product />
      </CartContext.Provider>
      
    </div>
  );
}

export default App;
