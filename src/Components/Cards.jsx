import React, { useEffect, useState } from 'react'
import './Cards.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import SelectedProduct from './SelectedProduct'
   


function Cards(props) {
    const {data} = props
    const [openCart, setOpenCart] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [cartList, setCartList] = useState([])
    let product = data[selectedProduct]

    function handleNewCartItem(id){
        const cartItem = {
            img: data[id].image,
            title: data[id].title,
            price: data[id].price,
            id: id,
        }
        setCartList((cartList)=>{
            return [...cartList, cartItem]
        })

    }

    function removeCartItem(id){
        let newCartList = cartList.filter((listItem) => listItem.id !== id);
        setCartList(newCartList);

    }

    return (
        <>
            { selectedProduct ? <SelectedProduct product={product}/> :
            <>
            <div className='card-container'>
                    {data.map((card)=>{
                        return(
                            <div class="card p-2" key={card.id}>
                                <img src={card.image} class="card-img-top"/>
                                <h5 class="card-title mt-5 align-self-center">{card.title}</h5>
                                <div class="card-body d-flex flex-column justify-content-end ">
                                    <a onClick={()=>handleNewCartItem(card.id-1)} class="btn btn-primary mb-2">Add to Cart</a>

                                    <a onClick={()=>setSelectedProduct(card.id-1)} class="btn btn-success">Check Out the Product</a>
                                </div>
                            </div>
                        )
                    })}
            </div> 
            <button class='btn btn-primary w-25 position-relative translate-middle mt-5 start-100' onClick={()=>setOpenCart(!openCart)}>Cart</button>
            <div class={openCart ? 'w-25 position-relative translate-middle mt-6 start-100 shadow-lg overflow-scroll h-200 overflow-x-hidden' : 'd-none'}>
                    {cartList.map((cartItem)=>{
                        return(
                            <div class='d-flex c-pointer mb-2 justify-content-between pe-2' onClick={()=>removeCartItem(cartItem.id)}>
                                <img src={cartItem.image} class='w-10'/>
                                <p class='ms-5'>{cartItem.title}</p>
                            </div>
                        )
                    })}
            </div>
            </>
            }
        </>
    )
}

export default Cards