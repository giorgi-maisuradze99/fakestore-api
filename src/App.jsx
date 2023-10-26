import { useEffect, useReducer, useRef, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Cards from './Components/Cards'

function App() {
  const [searchInput, setSearchInput] = useState('')
  const [data, setData] = useState([])
  const [originalData, setOriginalData] = useState([]) 
  const [username, setUsername ] = useState('')
  const [password, setPassword ] = useState('')
  let cardAddEnabled = (localStorage.getItem("username") && localStorage.getItem("password") ? true : false)
  const fetchData = async () => {
    const res = await fetch('https://fakestoreapi.com/products')
    const d = await res.json()
    setData(d)
    setOriginalData(d)
  }

  useEffect(() => {
    fetchData()
  }, []);

  const handleLogin = () =>{
    if(username == "admin" && password == "admin"){
      localStorage.setItem('username', 'admin')
      localStorage.setItem('password', 'admin')
      location.reload()
    }
  }
  const handleLogout = () =>{
    localStorage.removeItem('username')
    localStorage.removeItem('password')
    location.reload()
  }
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
    <div class='container-fluid'>  

    {/* Navbar  */}
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

          {/* Categories  */}
          <div id='category-container' className="col-2 d-flex flex-column align-items-center">
            <ul class="category list-group m-4 w-100">
              <li class="list-group-item bg-primary text-white" onClick={()=>fetchData()}>Categories</li>
              <li class="list-group-item" onClick={()=>fetchData()}>All</li>
              <li class="list-group-item" onClick={()=>handleCategoryChange('jewelery')}>Jewelery</li>
              <li class="list-group-item" onClick={()=>handleCategoryChange('electronics')}>Electronics</li>
              <li class="list-group-item" onClick={()=>handleCategoryChange("men's clothing")}>Men</li>
              <li class="list-group-item" onClick={()=>handleCategoryChange("women's clothing")}>Women</li>
            </ul>

          {/* Open Login OR Logout */}
          <div id='auth-container' className="d-flex flex-column w-100">
            <button type="button" class="btn buttonl btn-success me-2 mt-5 w-100" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Log In</button>
            <button type="button" class="btn buttonl btn-danger mt-5 w-100" onClick={handleLogout}>Log Out</button>
          </div>
          
          {/* Login Modal  */}
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
                            <input type='text' class="form-control" id="floatingInput" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />
                            <label for="floatingInput">Username</label>
                          </div>
                          <div class="form-floating">
                            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                            <label for="floatingPassword" >Password</label>
                          </div>
                        </form>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button  class="btn btn-success" type='sumbit' data-bs-dismiss="modal" onClick={handleLogin}>Log In</button>
                      </div>
                    </div>
                  </div>
            </div>
          </div>

          {/* Cards Section  */}
          <div className="col-10">
            <Cards data={data} cardAddEnabled={cardAddEnabled}/>
          </div>

        </div>
    </div>
    



    </div>
  )
}

export default App
