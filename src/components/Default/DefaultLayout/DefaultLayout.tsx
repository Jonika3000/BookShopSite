import { Outlet } from "react-router-dom";   
import "./DefaultLayout.css"
const DefaultLayout = () => {
    return (
        <div className="Main"> 
            <div className="container">  
                <Outlet/>
            </div>
        </div>
    );
}
export default DefaultLayout;