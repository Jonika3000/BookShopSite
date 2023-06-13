import React, { ChangeEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import http from "../../../http";
import { ICategory, IPublishingHouse } from "../../types";

const AddCategory = () => {
    const [validated, setValidated] = useState(false);
    const [category, setCategory] = useState<ICategory>({
        id: 0,
        name: "",
        description: "",
        slug: ""
    });
    const PostDataAsync = async () => {
        const formData = new FormData();
        formData.append('Name', category.name);
        formData.append('Description', category.description); 
        formData.append('Slug', category.slug); 
        try {
            await http
                .post<IPublishingHouse>("https://localhost:7190/api/category/create", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                } );
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
        setCategory({
            id: 0,
            name: "",
            description: "",
            slug: ""
        });
        form.reset();
        setValidated(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCategory((prevState) => ({
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
                        }}>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            name="name"
                            value={category.name}
                            required
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a Name.
                        </Form.Control.Feedback>
                    </Form.Group> 
                    <Form.Group className="mb-3" controlId="formCategoryDescription">
                        <Form.Label style={{
                            color: 'white',
                            fontSize: "30px"
                        }}>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            type="text"
                            placeholder="Enter description"
                            name="description"
                            value={category.description}
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
                        }}>Slug</Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder="Enter slug"
                            name="slug"
                            value={category.slug}
                            required
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback
                            type="invalid">
                            Please enter a slug.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button className="ButtonAccept" style={{ margin: "0" }} type="submit">Add</Button>
                </Form>
            </div>
        </section>
    );
};

export default AddCategory;