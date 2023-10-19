import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './SelectedProduct.css'

function SelectedProduct(props) {

  const {product} = props;

  return (
    <div class='container z-3'>
        <a href='/' class='btn  mt-5 ms-0 bg-danger text-white'>Back</a>
        <div class='d-flex mx-auto'>
            <img class='img me-5 w-25 img-thumbnail p-2 mt-5 shadow-lg' src={product.image} />
            <div className="column">
                <h1 class='mt-5'>{product.title}</h1>
                <p class='w-100'>Price : ${product.price}</p>
                <p class='mt-5 fs-4'>{product.description}</p>
                <p>Rating : {product.rating.rate}</p>
                <p>Reviewed By : {product.rating.count} Users</p>
                
                {/* <button class='btn btn-primary mt-5'>Add to Cart</button> */}
            </div>
        </div>
    </div>
  )
}

export default SelectedProduct