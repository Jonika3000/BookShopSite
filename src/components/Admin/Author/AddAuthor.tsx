import React, { ChangeEvent, useState } from "react";
import {  Button, Form} from "react-bootstrap"; 
import http from "../../../http";
import { IAuthor } from "../../types";

const AddAuthor = () => {
    const [validated, setValidated] = useState(false);
    const [author, setAuthor] = useState<IAuthor>({
        Id: 0,
        FirstName: "",
        Surname: "",
        Description: "",
        Year: "",
        Image: null
    }); 
    const PostDataAsync = async () => {
        const formData = new FormData();
        formData.append('FirstName', author.FirstName);
        formData.append('Surname', author.Surname);
        formData.append('Description', author.Description);
        formData.append('Year', author.Year);
        if (author.Image != null) {
            formData.append('Image', author.Image, author.Image.name);
        }
        try {
            await http
                .post<IAuthor>("/api/author/create", formData, {
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
        setAuthor({
            Id: 0,
            FirstName: "",
            Surname: "",
            Description: "",
            Year: "",
            Image: null
        });
        form.reset();
        setValidated(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setAuthor((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <section style={{ minHeight: "100vh" }}>
            <div className="CenterContent">
                <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ margin: "0 auto" }}>
                    <Form.Group className="mb-3" controlId="formCategoryName" >
                        <Form.Label style={{
                            color: 'white',
                            fontSize: "30px"
                        }}>FirstName</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter FirstName"
                            name="FirstName"
                            value={author.FirstName}
                            required
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a FirstName.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formItemImage">
                        <Form.Label style={{
                            color: 'white',
                            fontSize: "30px"
                        }}>Image</Form.Label>
                        <Form.Control
                            type="file"
                            required
                            accept=".jpg,.png,.jpeg"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                const file = event.target.files?.[0];
                                if (file) {
                                    setAuthor({
                                        ...author,
                                        Image: file
                                    });
                                }
                            }}
                        />
                        <Form.Control.Feedback
                            type="invalid">
                            Please select a image.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCategoryDescription">
                        <Form.Label style={{
                            color: 'white',
                            fontSize: "30px"
                        }}>Surname</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Surname"
                            name="Surname"
                            value={author.Surname}
                            required
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback
                            type="invalid">
                            Please enter a surname.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCategoryDescription">
                        <Form.Label style={{
                            color: 'white',
                            fontSize: "30px"
                        }}>Description</Form.Label>
                        <Form.Control
                            type="text"
                            as="textarea"
                            placeholder="Enter description"
                            name="Description"
                            value={author.Description}
                            required
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback
                            type="invalid">
                            Please enter a Description.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCategoryDescription">
                        <Form.Label style={{
                            color: 'white',
                            fontSize: "30px"
                        }}>Year</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Year"
                            name="Year"
                            value={author.Year}
                            required
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback
                            type="invalid">
                            Please enter a Year.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button className="ButtonAccept" style={{ margin: "0" }} type="submit">Add</Button>
                </Form>
            </div>
        </section>
    );
};

export default AddAuthor;