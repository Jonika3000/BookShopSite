
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { IBookGet } from "../../types";
import DefaultHeader from "../DefaultHeader/DefaultHeader";
import http from "../../../http";
import { APP_ENV } from "../../../env";
interface ISaleData{
      Id: number,
      Address:string,
      City:string,
      BookId:number,
      FullName:string,
      Email:string
}
interface RouteParams {
    [key: string]: string | undefined;
    id: string;
}
const SalePage = () => {
    const { id } = useParams<RouteParams>();
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const [book, setBook] = useState<IBookGet>({
        id: 0,
        name: "",
        description: "",
        image: null,
        pageCount: "",
        price: "",
        categoryId: "",
        publishingHouseId: "",
        authorId: ""
    });
    const [sale,setSale] = useState<ISaleData>({
        Id: 0,
        Address: "",
        City: "",
        BookId: 0,
        FullName: "",
        Email: ""
    });

    const PostDataAsync = async () => { 
        try {
            const formData = new FormData();
            formData.append('Address', sale.Address);
            formData.append('City', sale.City);
            if(id != undefined)
            formData.append('BookId', id);
            formData.append('FullName', sale.FullName);
            formData.append('Email', sale.Email);
            await http
                .post<ISaleData>("/api/sales/create", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
        }
        catch (error: any) {
            console.log(error);
        }
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }
        await PostDataAsync();
        setSale({
            Id: 0,
            Address: "",
            City: "",
            BookId: 0,
            FullName: "",
            Email: ""
        });
        form.reset();
        setValidated(false);
        navigate("/");
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSale((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    useEffect(() => {
        http.get<IBookGet>(`/api/book/getBookById/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
            .then(resp => {
                setBook(resp.data);
                
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <>
            <section style={{ minHeight: "100vh" }}>
                <DefaultHeader></DefaultHeader>
                <div className="CenterContent">
                    <div className="text-white">
                        <img
                            className="d-block w-100"
                            src={`${APP_ENV.BASE_URL}/images/${book.image}`} 
                            style={{ height: '40vh', objectFit: 'cover' }}
                        />
                        <p><strong>Name:</strong> {book.name}</p>
                        <p><strong>Price:</strong> {book.price}</p>
                    </div> 
                    <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ margin: "0 auto" }}>
                        <Form.Group className="mb-3" controlId="formCategoryName" >
                            <Form.Label style={{
                                color: 'white',
                                fontSize: "30px"
                            }}>Full name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter FullName"
                                name="FullName"
                                value={sale.FullName}
                                required
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a FullName.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCategoryDescription">
                            <Form.Label style={{
                                color: 'white',
                                fontSize: "30px"
                            }}>Address</Form.Label>
                            <Form.Control 
                                type="text"
                                placeholder="Enter Address"
                                name="Address"
                                value={sale.Address}
                                required
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback
                                type="invalid">
                                Please enter a Address.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCategoryDescription">
                            <Form.Label style={{
                                color: 'white',
                                fontSize: "30px"
                            }}>City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter City"
                                name="City"
                                value={sale.City}
                                required
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback
                                type="invalid">
                                Please enter a City.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCategoryDescription">
                            <Form.Label style={{
                                color: 'white',
                                fontSize: "30px"
                            }}>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                name="Email"
                                value={sale.Email}
                                required
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback
                                type="invalid">
                                Please enter a Email.
                            </Form.Control.Feedback>
                        </Form.Group> 
                        <Button className="ButtonAccept" style={{ margin: "0" }} type="submit">Buy</Button>
                    </Form>
                </div>
            </section>
        </>
    )
}
export default SalePage;