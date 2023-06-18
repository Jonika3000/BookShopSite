import { Link } from "react-router-dom"; 
const AdminPage = () => {
    return (
        <div className="Page">
            <div className="container">
                <ul style={{ display: "flex", flexDirection: "column", listStyle: "none", padding: 0 }}>
                    <li><Link to="/control-panel/book/AddBook"><a>Add Book</a></Link></li>
                    <li><Link to="/control-panel/book/DeleteBook"><a>Delete Book</a></Link></li>
                    <li><Link to="/control-panel/book/EditBook"><a>Edit Book</a></Link></li>
                    <li><Link to="/control-panel/category/AddCategory"><a>Add Category</a></Link></li>
                    <li><Link to="/control-panel/category/DeleteCategory"><a>Delete Category</a></Link></li>
                    <li><Link to="/control-panel/category/EditCategory"><a>Edit Category</a></Link></li>
                    <li><Link to="/control-panel/blog/AddBlog"><a>Add Blog</a></Link></li>
                    <li><Link to="/control-panel/blog/DeleteBlog"><a>Delete Blog</a></Link></li>
                    <li><Link to="/control-panel/blog/EditBlog"><a>Edit Blog</a></Link></li>
                    <li><Link to="/control-panel/author/AddAuthor"><a>Add Author</a></Link></li>
                    <li><Link to="/control-panel/author/DeleteAuthor"><a>Delete Author</a></Link></li>
                    <li><Link to="/control-panel/author/EditAuthor"><a>Edit Author</a></Link></li>
                    <li><Link to="/control-panel/PublishingHouse/AddHouse"><a>Add Publishing House</a></Link></li>
                    <li><Link to="/control-panel/PublishingHouse/DeleteHouse"><a>Delete Publishing House</a></Link></li>
                    <li><Link to="/control-panel/PublishingHouse/EditHouse"><a>Edit Publishing House</a></Link></li>
                </ul> 
            </div> 
        </div>
    )
}
export default AdminPage;