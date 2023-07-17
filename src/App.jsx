import logo from './logo.svg';
import Navbar from './components/NavBar';
import { Container } from 'react-bootstrap';
import Categories from './pages/Categories';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Category from './pages/Category';
import { ShoppingCartProvider } from './context/shoppingCartContext';
import ScrollToTop from './utilities/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ShoppingCartProvider>
        <Navbar />
        <Container className='mb-4'>
          <Routes>
            <Route path='/' element={<Categories />} />
            <Route path='/category/:id' element={<Category />} />
          </Routes>
        </Container>
      </ShoppingCartProvider>
    </BrowserRouter>



  );
}

export default App;
