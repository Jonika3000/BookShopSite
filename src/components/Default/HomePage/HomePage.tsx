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
                                <a className="TextDescriptionShop">Добро пожаловать в Rea Shop, уютный и приветливый магазин книг, 
                                    который предлагает богатый выбор литературы для всех возрастов и вкусов.
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