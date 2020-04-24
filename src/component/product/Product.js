import React,{useEffect,useState,useMemo,useRef} from 'react';
import axios from "axios";
import ProductItem from './productItem/ProductItem';
import ProductSize from './productSize/ProductSize';
import ProductSort from './productSort/ProductSort';
import './product.scss'

const Product = () => {
    console.log("Product")
    const [products,setProducts] =useState([])
    const [sort,setSort] = useState('1')
    const loader = useRef(null);
    const [size,setSize] = useState({
        "xs":{
            "name":"xs",
            "status":true
        },
        "s":{
            "name":"s",
            "status":false
        },
        "m":{
            "name":"m",
            "status":false
        },
        "ml":{
            "name":"ml",
            "status":false
        },
        "l":{
            "name":"l",
            "status":false
        },
        "xl":{
            "name":"xl",
            "status":false
        },
        "xxl":{
            "name":"xxl",
            "status":false
        },
        
        
    })

    useEffect(() => {
        let string = `http://localhost:3000/Product?Size=${size.xs.status?'xs':''}&Size=${size.s.status?'s':null}&Size=${size.m.status?'m':null}&Size=${size.ml.status?'ml':null}&Size=${size.l.status?'l':null}&Size=${size.xl.status?'xl':null}&Size=${size.xxl.status?'xxl':null}`;
        axios.get(string).then( res =>{
            if(sort == 1){
                loading();
                setProducts(res.data)
            }else{
                
                setProducts(sortProduct(res.data))
            }
        })   
    }, [size]);

    useEffect(() => {       
        if(sort == 1){
            setSize({...size});
        }else{
            setProducts(sortProduct(products))
        }
    },[sort]);
    const changStatus = item =>{
        setSize({
            ...size,
            [item]:{
                name:item,
                status: !size[item].status
            }
        })
    }
    const sortProduct = productList =>{
        loading();
        let arr = []
        if(sort == 2){
            arr = [...productList].sort( (a,b) => b.Price - a.Price)
        }else if(sort == 3){
            arr = [...productList].sort( (a,b) => a.Price - b.Price)
        }        
        
        return arr;
    }
    const handleChange = event =>{
        let  value = event.target.value
        setSort(()=>value)
    }
    const listSize = useMemo(() =>{
        let string=[];
        for (const item in size) {
            string.push(<ProductSize key={item} item={size[item]} changStatus = {() => changStatus(item)} />)
        }
        return string;
    },[size])
    const loading = () =>{
        loader.current.style.display='block'
        setTimeout(() => {
            loader.current.style.display='none'
        }, 500);
    }
    return (
        <section className="product">
            <div className="product__loader" ref={loader}>
                <div className="product__loader-item"></div>
            </div>
            <div className="container">
                <div className="product__size">
                    <p>Size :</p>
                    <div className="product__size-list">
                        {listSize}
                    </div>
                </div>
                <div className="product__box">
                    <ProductSort length={products.length} sort={sort} handleChange={handleChange}/>
                    <div className="product__list">
                        {
                            products.map( product => 
                                <ProductItem  key = {product.id} product={product} />
                            )
                        }
                    </div>
                </div>
            
                
            </div>
        </section>
    );
}

export default React.memo(Product);
