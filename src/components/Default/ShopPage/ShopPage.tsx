import { Col, Row } from "react-bootstrap";
import "./ShopPage.css"
import DefaultHeader from "../DefaultHeader/DefaultHeader";
import { useEffect, useState } from "react";
import http from "../../../http";
import axios from "axios";
import { Link } from "react-router-dom";

export interface ICategory {
    id: string,
    name: string,
    description: string
}
const ShopPage = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<ICategory[]>(`https://localhost:7190/api/Category/list`);
                await setCategories(response.data);
            }
            catch (error: any) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="Page">
            <DefaultHeader></DefaultHeader>
            <Row className="Content">
                <Col xs="2">
                    <div className="Categories">
                        <a>Категории:</a>
                        <ul>
                            {categories.map((item) => (
                                <li><Link to="/">{item.name}</Link></li>
                            ))}
                        </ul> 
                    </div>
                </Col>
                <Col xs="10">
                    <h1>Товыри</h1>
                </Col>
            </Row>
        </div>
    )
}
export default ShopPage;