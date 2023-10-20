import { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Cards from './Components/Cards'

function App() {
  const [searchInput, setSearchInput] = useState('')
  const [data, setData] = useState([])
  const [originalData, setOriginalData] = useState([]) 

  const fetchData = async () => {
    const res = await fetch('https://fakestoreapi.com/products')
    const d = await res.json()
    setData(d)
    setOriginalData(d)
  }
  useEffect(() => {
    fetchData()
  }, []);

  const handleCategoryChange = (category) => {
    const newData = originalData.filter((dataItem) => dataItem.category === category);
    setData(newData)
  }

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchInput(searchTerm);

    // Filter data based on search input
    const newData = originalData.filter((dataItem) =>
      dataItem.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setData(newData);
  }
 


  return (
    <div class='glavni'>  
    <nav class="navbar shadow-lg navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          FakeStore
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
          </ul>
          <form class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchInput}
              onChange={handleSearchChange}
            />
            <button class="btn btn-outline-success" type="button">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>        


    <div class="">
        <div class="row m-0 ">
          <div className="col-2 d-flex flex-column align-items-center">

          <ul class="category list-group m-4">
            <li class="list-group-item bg-primary text-white" onClick={()=>fetchData()}>Categories</li>
            <li class="list-group-item" onClick={()=>fetchData()}>All</li>
            <li class="list-group-item" onClick={()=>handleCategoryChange('jewelery')}>Jewelery</li>
            <li class="list-group-item" onClick={()=>handleCategoryChange('electronics')}>Electronics</li>
            <li class="list-group-item" onClick={()=>handleCategoryChange("men's clothing")}>Men</li>
            <li class="list-group-item" onClick={()=>handleCategoryChange("women's clothing")}>Women</li>
          </ul>
          <div className="d-flex">
            <button type="button" class="btn buttonl btn-success me-2  mt-5" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Log In</button>
            <button type="button" class="btn buttonl btn-danger mt-5">Log Out</button>

          </div>
          
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">Log In</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <form>
                        <div class="form-floating mt-1 mb-3">
                          <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                          <label for="floatingInput">Username</label>
                        </div>
                        <div class="form-floating">
                          <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                          <label for="floatingPassword">Password</label>
                        </div>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-success">Log In</button>
                    </div>
                  </div>
                </div>
              </div>


          </div>
          <div className="col-10">
            <Cards data={data}/>
          </div>



        </div>
    </div>
    



    </div>
  )
}

export default App
