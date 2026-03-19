
import Navbar from './components/Navbar'
import { Route, Routes} from 'react-router-dom'

import HomePage from './pages/HomePage'
import ProductDetail from './pages/ProductDetail'
import AddProduct from './pages/AddProduct'
import Products from './pages/Products'

function App() {
  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300">
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:slug' element={<ProductDetail />} />
      </Routes>
    </div>
  )
}

export default App