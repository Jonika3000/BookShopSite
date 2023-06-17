import React, { ChangeEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import http from "../../../http"; 
import { IBlog } from "../../types";
import { Editor } from "@tinymce/tinymce-react";

const AddBlog = () => {
    const [validated, setValidated] = useState(false);
    const [blog, setBlog] = useState<IBlog>({
        Id: 0,
        Title: "",
        Content: "" 
    });
    const [content, setContent] = useState('');
    const PostDataAsync = async () => {
        const formData = new FormData();
        formData.append('Title', blog.Title);
        formData.append('Content', blog.Content); 
        try {
            await http
                .post<IBlog>("/api/blog/create", formData, {
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
        setBlog({
            Id: 0,
            Title: "",
            Content: "" 
        });
        form.reset();
        setValidated(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setBlog((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleEditorChange = (content: string) => {
        setBlog({
            ...blog,
            Content: content
        });
        setContent(content);
    };
    return (
        <section style={{ minHeight: "100vh" }}>
            <div className="CenterContent">
                <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ margin: "0 auto" }}>
                    <Form.Group className="mb-3" controlId="formCategoryName" >
                        <Form.Label style={{
                            color: 'white',
                            fontSize: "30px"
                        }}>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Title"
                            name="Title"
                            value={blog.Title}
                            required
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a Title.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Label style={{
                        color: 'white',
                        fontSize: "30px"
                    }}>Content</Form.Label>
                    <Editor
                        onEditorChange={handleEditorChange}
                        apiKey="gbg6w25sopzhl7ee9p2hrjmm5ch3cwawgel5p0fva2ig5rlf"
                        init={{
                            height: 500,
                            plugins: 'link textcolor colorpicker fullscreen',
                            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright  | forecolor backcolor | fullscreen',
                            color_picker_callback: function (callback: (arg0: string) => void, value: any) {
                                callback('#FF00FF');
                            }  
                        }}
                    />
                    <Button className="ButtonAccept" style={{ margin: "0" }} type="submit">Add</Button>
                </Form>
            </div>
        </section>
    );
};

export default AddBlog;