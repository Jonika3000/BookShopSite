import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/Default/HomePage/HomePage';
import DefaultLayout from './components/Default/DefaultLayout/DefaultLayout';
import ShopPage from './components/Default/ShopPage/ShopPage';
import AddAuthor from './components/Admin/Author/AddAuthor';
import AddPublishingHouse from './components/Admin/PHouse/AddPHouse';
import AddBook from './components/Admin/Book/AddBook';
import AddCategory from './components/Admin/Category/AddCategory';
import BookPage from './components/Default/BookInfoPage/BookInfoPage';
import AuthorPage from './components/Default/AuthorInfoPage/AuthorPage';
import AddBlog from './components/Admin/Blog/AddBlog';
import PublishingHousePage from './components/Default/PHousePage/PHousePage';
import AllBlogsPage from './components/Default/BlogsListPage/BlogsListPage';
import BlogPage from './components/Default/BlogPage/BlogPage';
import SalePage from './components/Default/SalePage/SalePage';
import Login from './components/Default/LoginPage/Login';
import ControlPanelLayout from './components/Admin';
import DeleteBook from './components/Admin/Book/DeleteBook';
import DeleteCategory from './components/Admin/Category/DeleteCategory';
import DeleteBlog from './components/Admin/Blog/DeleteBlog';
import DeleteAuthor from './components/Admin/Author/DeleteAuthor';
import DeletePublishingHouse from './components/Admin/PHouse/DeletePHouse';
import EditAuthor from './components/Admin/Author/EditAuthor';
import EditBlog from './components/Admin/Blog/EditBlog';
import EditBook from './components/Admin/Book/EditBook';
import EditCategory from './components/Admin/Category/EditCategory';
import EditHouse from './components/Admin/PHouse/EditPHouse';
import AdminPage from './components/Admin/Admin';

function App() {
  return (
    <>
      <Routes>
        <Route  path="/" element={<DefaultLayout />}> 
          <Route index element={<HomePage />} />
          <Route path='category/:slug' element={<ShopPage></ShopPage>}></Route>
          <Route path='book/:id' element={<BookPage></BookPage>}></Route>
          <Route path='author/:id' element={<AuthorPage></AuthorPage>}></Route>
          <Route path='blog/:id' element={<BlogPage></BlogPage>}></Route>
          <Route path='buy/:id' element={<SalePage></SalePage>}></Route>
          <Route path='publishingHouse/:id' element={<PublishingHousePage></PublishingHousePage>}></Route>
          <Route path='login' element={<Login></Login>}></Route>
          <Route path='allBlogs' element={<AllBlogsPage></AllBlogsPage>}></Route>
          <Route path='*' element={<HomePage></HomePage>} />
          <Route path='/control-panel/' element={<ControlPanelLayout></ControlPanelLayout>}>
            <Route path='admin' element={<AdminPage></AdminPage>}/>
            <Route path='book/'>
              <Route path='AddBook' element={<AddBook></AddBook>}></Route>
              <Route path='EditBook' element={<EditBook></EditBook>}></Route>
              <Route path='DeleteBook' element={<DeleteBook></DeleteBook>}></Route>
            </Route>
            <Route path='blog/'>
              <Route path='AddBlog' element={<AddBlog></AddBlog>}></Route>
              <Route path='EditBlog' element={<EditBlog></EditBlog>}></Route>
              <Route path='DeleteBlog' element={<DeleteBlog></DeleteBlog>}></Route>
            </Route>
            <Route path='author/'>
              <Route path='AddAuthor' element={<AddAuthor></AddAuthor>}></Route>
              <Route path='DeleteAuthor' element={<DeleteAuthor></DeleteAuthor>}></Route>
              <Route path='EditAuthor' element={<EditAuthor></EditAuthor>}></Route> 
            </Route>
            <Route path='PublishingHouse/'>
              <Route path='AddHouse' element={<AddPublishingHouse></AddPublishingHouse>}></Route>
              <Route path='EditHouse' element={<EditHouse></EditHouse>}></Route>
              <Route path='DeleteHouse' element={<DeletePublishingHouse></DeletePublishingHouse>}></Route>
            </Route>
            <Route path='category/'>
              <Route path='AddCategory' element={<AddCategory></AddCategory>}></Route>
              <Route path='DeleteCategory' element={<DeleteCategory></DeleteCategory>}></Route>
              <Route path='EditCategory' element={<EditCategory></EditCategory>}></Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
