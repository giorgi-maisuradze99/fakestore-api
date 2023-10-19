import React, { useEffect, useState } from 'react'
import './Cards.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import SelectedProduct from './SelectedProduct'
   


function Cards(props) {
    const {data} = props
    
    const [selectedProduct, setSelectedProduct] = useState(null)
    let product = data[selectedProduct]

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
                                    <a onClick={()=>setSelectedProduct(card.id-1)} class="btn btn-success">Check Out the Product</a>
                                </div>
                            </div>
                        )
                    })}
            </div> 
            <button class='btn btn-primary w-25 position-absolute translate-middle mt-5 start-100'>Cart</button>
            </>
            }
        </>
    )
}

export default Cards