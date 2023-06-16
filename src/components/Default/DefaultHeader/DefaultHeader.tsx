import { Link, useNavigate } from "react-router-dom";
import "./DefaultHeader.css"
import { useDispatch, useSelector } from "react-redux";
import { AuthUserActionType, IAuthUser } from "../Auth/types";
import http from "../../../http";
const DefaultHeader = () => {
    const navigator = useNavigate();
    const { isAuth, user } = useSelector((store: any) => store.auth as IAuthUser);
    const dispatch = useDispatch();

    const logout = (e: any) => {
        e.preventDefault();
        localStorage.removeItem("token");
        http.defaults.headers.common["Authorization"] = ``;
        dispatch({ type: AuthUserActionType.LOGOUT_USER });
        navigator("/");
    };
    return (
        <div >
            <nav className="navbar navbar-expand-lg header">
                <div className="collapse navbar-collapse mr-auto" id="navbarText">
                    <a className="Name" href="#">Rea Shop</a>
                </div>
                <ul className="navbar-text">
                    <li><Link to="/"><a>Home</a></Link></li>
                    <li><Link to="/allBlogs"><a>Blogs</a></Link></li>
                    <li><Link to="/category/all"><a>Shop</a></Link></li>
                    {isAuth ? ( 
                        <li>
                            <Link 
                                aria-current="page"
                                to="/logout"
                                onClick={logout}
                            >
                                Logout
                            </Link>
                        </li>
                    ):
                    (<></>)}
                </ul>
            </nav>
        </div>


    );
}
export default DefaultHeader;