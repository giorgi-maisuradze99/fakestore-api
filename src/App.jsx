import { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Cards from './Components/Cards'

function App() {
  const [searchInput, setSearchInput] = useState('')
  const [data, setData] = useState([])
  const fetchData = async () =>{
      const res = await fetch('https://fakestoreapi.com/products')
      const d = await res.json()
      setData(d)
  }
  
  useEffect(()=>{
      fetchData()
  },[])

  const handleSearchChange = () =>{
    setSearchInput(searchInput)
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
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>        
    <Cards data={data}/>

    </>
  )
}

export default App
