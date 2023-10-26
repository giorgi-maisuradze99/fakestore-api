import React, { useEffect, useState } from 'react'
import './Cards.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import SelectedProduct from './SelectedProduct'
   


function Cards(props) {
    const {data, cardAddEnabled} = props
    const [openCart, setOpenCart] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(0)
    const [cartList, setCartList] = useState([])
    let product = data[selectedProduct - 1]
    function handleNewCartItem(id){
        const cartItem = {
            title: data[id].title,
            price: data[id].price,
            id: id,
        }   
        setCartList((cartList)=>{
            return [...cartList, cartItem]
        })
        localStorage.setItem('cartList', JSON.stringify(cartList))

    }

    function removeCartItem(id){
        let newCartList = cartList.filter((listItem) => listItem.id !== id);
        setCartList(newCartList);
        localStorage.setItem('cartList', JSON.stringify(newCartList))

    }

    return (
        <>
        {/* Card items  */}
        <div className="row">
            { selectedProduct ? <SelectedProduct product={product}/> :
            <>
            <div className="col-10">
                <div className='card-container d-flex flex-wrap gap-4 justify-content-center mt-4'>
                        
                        {/* Single Card  */}

                        {data.map((card)=>{
                            return(
                                <div class="card p-2" key={card.id}>
                                    <img src={card.image} class="card-img-top"/>
                                    <h5 class="card-title mt-5 align-self-center">{card.title}</h5>
                                    <div class="card-body d-flex flex-column justify-content-end ">
                                        <button onClick={()=>handleNewCartItem(card.id)} class="btn btn-primary mb-2" disabled={!cardAddEnabled}>Add to Cart</button>

                                        <button onClick={()=>setSelectedProduct(card.id)} class="btn btn-success">Check Out the Product</button>
                                    </div>
                                </div>
                            )
                        })}


                </div> 
            </div>

            
            <div className="col-2 d-flex flex-column align-items-center">
                {/* Cart Opener Button */}
                <button class='cartbutton btn btn-primary  mt-4' onClick={()=>setOpenCart(!openCart)}>Cart</button>
                {/* Cart Code */}
                <div class={openCart ? 'cartbox  mt-2 shadow-lg overflow-scrolloverflow-x-hidden w-100 p-3' : 'd-none'}>
                        
                       { cartList.length ?
                        <div> {cartList.map((cartItem)=>{
                            return(
                                <div key={cartItem.id} class='d-flex position-relative justify-content-between align-items-center mb-2 px-2 hover rounded' onClick={()=>removeCartItem(cartItem.id)}>
                                    <img src={cartItem.image} class='w-10'/>
                                    <p class='text-center'>{cartItem.title}</p>
                                    <p class='text-danger ms-2'>${cartItem.price}</p>
                                </div>
                            )
                        })} 
                        </div> 
                        :
                        <p>No items in the cart</p> }
                </div>

            </div>


            </>
            }
         </div>
        </>
    )
}

export default Cards