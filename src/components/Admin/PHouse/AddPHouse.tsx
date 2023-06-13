import React, { ChangeEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import http from "../../../http";
import { IPublishingHouse } from "../../types";

const AddPublishingHouse = () => {
    const [validated, setValidated] = useState(false);
    const [House, setHouse] = useState<IPublishingHouse>({
        Id:0,
        Name: "",
        Description: "",
        Image: null
    });
    const PostDataAsync = async () => {
        const formData = new FormData();
        formData.append('Name', House.Name);
        formData.append('Description', House.Description); 
        if (House.Image != null) {
            formData.append('Image', House.Image, House.Image.name);
        }
        try {
            await http
                .post<IPublishingHouse>("https://localhost:7190/api/PublishingHouses/create", formData, {
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
        setHouse({
            Id: 0,
            Name: "",
            Description: "",
            Image: null
        });
        form.reset();
        setValidated(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setHouse((prevState) => ({
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
                            name="Name"
                            value={House.Name}
                            required
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a Name.
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
                                    setHouse({
                                        ...House,
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
                        }}>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            type="text"
                            placeholder="Enter Surname"
                            name="Description"
                            value={House.Description}
                            required
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback
                            type="invalid">
                            Please enter a Description.
                        </Form.Control.Feedback>
                    </Form.Group> 
                    <Button className="ButtonAccept" style={{ margin: "0" }} type="submit">Add</Button>
                </Form>
            </div>
        </section>
    );
};

export default AddPublishingHouse;