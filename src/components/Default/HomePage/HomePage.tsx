import "./HomePage.css" 
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import BookSvg from "../../svg/Book";
import DefaultHeader from "../DefaultHeader/DefaultHeader";
const HomePage = () => {
    return (
        <div style={{minHeight:"100vh"}}>
         <DefaultHeader></DefaultHeader>
            <div className="HomePage"> 
                <div className="CenterContent">
                    <Row style={{ width: "100%", height: "100%" }}>
                        <Col style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <a className="TextDescriptionShop">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  
                                      </a>
                                <Link to="/">
                                    <Button className="ButtonShop">
                                        Магазин
                                    </Button>
                                </Link>
                            </div>
                        </Col>
                        <Col style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div>
                                <BookSvg></BookSvg>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div> 
        </div> 
    );
}
export default HomePage;