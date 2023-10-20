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
    <>  
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
    <ul class="list-group position-absolute w-25 mt-4 ms-5">
      <li class="list-group-item active" onClick={()=>fetchData()}>Categories</li>
      <li class="list-group-item" onClick={()=>fetchData()}>All</li>
      <li class="list-group-item" onClick={()=>handleCategoryChange('jewelery')}>Jewelery</li>
      <li class="list-group-item" onClick={()=>handleCategoryChange('electronics')}>Electronics</li>
      <li class="list-group-item" onClick={()=>handleCategoryChange("men's clothing")}>Men</li>
      <li class="list-group-item" onClick={()=>handleCategoryChange("women's clothing")}>Women</li>
    </ul>
    <Cards data={data}/>

    </>
  )
}

export default App
