import { Link } from "react-router-dom";
import "./DefaultHeader.css" 
const DefaultHeader = () => {
    
    return (
        <div >
            <nav className="navbar navbar-expand-lg header">
                <div className="collapse navbar-collapse mr-auto" id="navbarText">
                    <a className="Name" href="#">Rea Shop</a>
                </div>
                <ul className="navbar-text">
                    <li><Link to="/"><a>Главная</a></Link></li>
                    <li><Link to="/"><a>Статьи</a></Link></li>
                    <li><Link to="/category/all"><a>Магазин</a></Link></li> 
                </ul>
            </nav>
        </div>


    );
}
export default DefaultHeader;