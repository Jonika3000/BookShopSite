import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react"; 
import DefaultHeader from "../DefaultHeader/DefaultHeader";
import { Button, Carousel } from "react-bootstrap";
import "./BookInfoPage.css"
import http from "../../../http";
import { APP_ENV } from "../../../env";
interface RouteParams {
    [key: string]: string | undefined;
    id: string;
}
interface ImagesBook {
    url: string;
}
interface IBookGet {
    id: number,
    name: string,
    description: string,
    image: File | null,
    pageCount: string,
    price: string,
    categoryId: string,
    publishingHouseId: string,
    idAuthor: string,
    authorName: string,
    houseName:string,
    houseId:string
}
const BookPage = () => {
    const { id } = useParams<RouteParams>();
    const [Images, setImages] = useState<ImagesBook[]>([]);
    const [Book, setBook] = useState<IBookGet>({
        id: 0,
        name: "",
        description: "",
        image: null,
        pageCount: "",
        price: "",
        categoryId: "",
        publishingHouseId: "",
        idAuthor: "",
        authorName: "",
        houseName: "",
        houseId: ""
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await http.get<IBookGet>(`/api/book/getBookById/${id}`);
                await setBook(response.data);
                const responseImages = await http.get<ImagesBook[]>(`/api/book/getBookImagesById/${id}`); 
                await setImages(responseImages.data);
                console.log(Images);
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
            <div className="container py-4 my-4 mx-auto d-flex flex-column"> 
                <div className="container-body mt-4">
                    <div className="row r3">
                        <div className="col-md-5 p-0 klo">
                            <div className="InfoBook">
                                <h1>{Book.name}</h1>
                                <p><strong>Pages:</strong> {Book.pageCount}</p>
                                <p><strong>Price:</strong> {Book.price}</p>
                                <p><strong>Description:</strong> {Book.description}</p>
                                <p><strong>Author:</strong> <Link to={`/author/${Book.idAuthor}`}>{Book.authorName}</Link></p>
                                <p><strong>Publishing House:</strong> <Link to={`/publishingHouse/${Book.houseId}`}>{Book.houseName}</Link></p>
                            </div> 
                            <Button><Link to={`/buy/${Book.id}`} className="BuyBtn">Buy now</Link></Button>
                        </div>
                        <div className="col-md-7">
                            <Carousel>
                                {Images.map((item) => (
                                    <Carousel.Item key={item.url}>
                                        <img
                                            className="d-block w-100"
                                            src={`${APP_ENV.BASE_URL}/images/${item.url}`}
                                            alt="Slide"
                                            style={{ height: '55vh', objectFit: 'cover' }}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>
                    </div>
                     
                </div>
            </div>
        </div>
    )
}
export default BookPage;