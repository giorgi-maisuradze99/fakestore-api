import React, { useEffect, useState } from 'react'
import './Cards.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import SelectedProduct from './SelectedProduct'
   


function Cards(props) {
    const {data} = props
    const [openCart, setOpenCart] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(0)
    const [cartList, setCartList] = useState([])
    let product = data[selectedProduct - 1]
    console.log(data);
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

        <div className="row">



            { selectedProduct ? <SelectedProduct product={product}/> :
            <>
            <div className="col-10">
                <div className='card-container d-flex flex-wrap gap-4 justify-content-center mt-4'>
                        {data.map((card)=>{
                            if(card.id == 1){
                                card.id =1;
                            }
                            return(
                                <div class="card p-2" key={card.id}>
                                    <img src={card.image} class="card-img-top"/>
                                    <h5 class="card-title mt-5 align-self-center">{card.title}</h5>
                                    <div class="card-body d-flex flex-column justify-content-end ">
                                        <a onClick={()=>handleNewCartItem(card.id)} class="btn btn-primary mb-2">Add to Cart</a>

                                        <a onClick={()=>setSelectedProduct(card.id)} class="btn btn-success">Check Out the Product</a>
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
                    {/* no product text  */}
                <div class={openCart ? 'cartbox  mt-5  shadow-lg overflow-scrolloverflow-x-hidden' : 'd-none'}>
                        {cartList.map((cartItem)=>{
                            return(
                                <div class='d-flex position-relative justify-content-between mb-2 pe-2 pt-2 hover' onClick={()=>removeCartItem(cartItem.id)}>
                                    <img src={cartItem.image} class='w-10'/>
                                    <p class='text-center'>{cartItem.title}</p>
                                    <p class='text-danger'>${cartItem.price}</p>
                                </div>
                            )
                        })}
                </div>

            </div>


            </>
            }
         </div>
        </>
    )
}

export default Cards