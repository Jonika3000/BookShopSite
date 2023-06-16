import { Col, Row } from "react-bootstrap";
import "./ShopPage.css"
import DefaultHeader from "../DefaultHeader/DefaultHeader";
import { useEffect, useState } from "react";
import http from "../../../http";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { IBookGet, ICategory } from "../../types";

interface RouteParams {
    [key: string]: string | undefined;
    slug: string;
}

const ShopPage = () => {
    const { slug } = useParams<RouteParams>();
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [allBooks, setBooks] = useState<IBookGet[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<ICategory[]>(`https://localhost:7190/api/Category/list`);
                await setCategories(response.data);

                const responseBooks = await axios.get<IBookGet[]>(`https://localhost:7190/api/Category/category/${slug}`);
                await setBooks(responseBooks.data);
                console.log(allBooks);
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
                        <a>Categories:</a>
                        <ul>
                            {categories.map((item) => (
                                <li key={item.id}><Link to={`/category/${item.slug}`}>{item.name}</Link></li>
                            ))}
                        </ul>
                    </div>
                </Col>
                <Col xs="10">
                    <div className="Books">
                        <a className="booksA">Books</a>
                        <div className=" d-flex flex-wrap">
                            {allBooks.map((item) => (
                                <div className="Item col-md-3 col-sm-6 col-12" key={item.id}>
                                    <div className="card mx-auto col-10 mt-3">
                                        <img className='img-thumbnail'
                                            src={`https://localhost:7190/images/${item.image}`}
                                            width="auto" height="auto" />
                                        <div className="card-body text-center mx-auto">
                                            <div className='cvp'>
                                                <h5 className="card-title font-weight-bold">{item.name}</h5>
                                                <p className="card-text">${item.price}</p>
                                                <Link to={`/book/${item.id}`} className="btn details px-auto">View details</Link><br />
                                                <Link to={`/buy/${item.id}`} className="btn cart px-auto">Buy</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    

                </Col>
            </Row>
        </div>
    )
}
export default ShopPage;