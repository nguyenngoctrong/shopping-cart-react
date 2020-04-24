import React, {useRef,useEffect,useContext,useState} from "react";
import "./Cart.scss";
import axios from "axios";
import CartItem from "./cartItem/CartItem";
import { CartContext } from "../../App";

const Cart = () => {
    console.log("Cart")
    let {cart} = useContext(CartContext);
    const toggleCart = useRef();
    const [cartList , setCartList] = useState([]);
    const [amount , setAmount] = useState(0);
    const [totalPrice , setTotalPrice] = useState(0);



    useEffect(() => {
        if(cart.length !==0){
            const cartFromProvider = [...cart]
            if(cartFromProvider.length  !== 0){
                let string = 'http://localhost:3000/Product?1=1'
                for (const item of cartFromProvider) {
                    string += `&id=${item.idCart}`;
                }
                axios.get(string).then( rs =>{
                                    
                    for (const item of rs.data) {
                        let index = cartFromProvider.findIndex( x => x.idCart == item.id )
                        let a ={...cartFromProvider[index]};
                        cartFromProvider[index] = Object.assign(a,item)
                    }
                    setCartList(cartFromProvider);
                })
            }
            
        }else{
            setCartList([]);
            setTotalPrice(0);
            setAmount(0)
        }
        
        
    },[cart]);
    useEffect(() => {
        if(cartList.length  !== 0){
            let exAmount = cartList.map( item => item.amount).reduce((a,b)=>a+b);
            let exPrice = cartList.map( item => item.Price * item.amount).reduce((a,b)=>a+b).toFixed(2);
            setAmount(exAmount);
            setTotalPrice(exPrice);
        }
    }, [cartList]);

    const showCart = () =>{
        toggleCart.current.classList.add("toggle")
    }
    const closeCart = () =>{
        toggleCart.current.classList.remove("toggle")
    }
    return (
        <div className="cart" ref={toggleCart}>
            <p className="cart__close" onClick={closeCart} >X</p>
            <div className="cart__box"> 
                <div className="cart__toggle" onClick={showCart} >
                    <i className="flaticon-shopping-bag"></i>
                    <p>
                        <span>{amount}</span>
                    </p>
                </div>
                <div className="cart__list">
                    {
                        cartList.map( c => 
                            <CartItem key={c.id} cart = {c}/>
                        )
                    }
                </div>
                <div className="cart__total">
                    <div className="cart__total-box">
                        <div className="cart__total-price">
                            <p>Subtotal</p>
                            <p>
                                <span>&#36; {totalPrice}</span>
                                <span>OR UP TO 9 <small>x</small> &#36; {(totalPrice/9).toFixed(2)}</span>
                            </p>
                        </div>
                        <button>checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
