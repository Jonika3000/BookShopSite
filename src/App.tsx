import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/Default/HomePage/HomePage';
import DefaultLayout from './components/Default/DefaultLayout/DefaultLayout';
import ShopPage from './components/Default/ShopPage/ShopPage';
import AddAuthor from './components/Admin/Author/AddAuthor';
import AddPublishingHouse from './components/Admin/PHouse/AddPHouse';
import AddBook from './components/Admin/Book/AddBook';
import AddCategory from './components/Admin/Category/AddCategory';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} /> 
          <Route path='shop' element={<ShopPage></ShopPage>}></Route>
          <Route path='AddAuthor' element={<AddAuthor></AddAuthor>}></Route> 
          <Route path='AddHouse' element={<AddPublishingHouse></AddPublishingHouse>}></Route>
          <Route path='AddBook' element={<AddBook></AddBook>}></Route>  
          <Route path='AddCategory' element={<AddCategory></AddCategory>}></Route>  
        </Route> 
      </Routes>
    </>
  );
}

export default App;
