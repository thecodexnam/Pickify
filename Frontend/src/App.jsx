import { CartProvider } from './CartContext'
import Home from './Pages/Home'
import { Routes,Route } from 'react-router-dom'

const App = () => {
  return (
    <CartProvider>
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
    </CartProvider>
  )
}

export default App
