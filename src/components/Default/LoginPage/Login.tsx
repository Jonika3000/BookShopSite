import React, { ChangeEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import http from "../../../http";
import { IAuthor } from "../../types";
import { AuthUserActionType, IUser } from "../Auth/types";
import jwtDecode from "jwt-decode";  
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
export interface ILogin {
    email: string;
    password: string;
}

export interface ILoginResult {
    token: string;
}
const Login = () => {
    const [validated, setValidated] = useState(false);
    const navigator = useNavigate(); 
    const [initValues, setinitValues] = useState<ILogin>({
        email: "",
        password: ""
    });
    const dispatch = useDispatch();
    const PostDataAsync = async () => {
        http
            .post<ILoginResult>("https://localhost:7190/api/Auth/login", initValues, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((resp) => {
                console.log("Login result", resp.data);
                const { token } = resp.data;
                const user = jwtDecode(token) as IUser;
                localStorage.token = token;
                http.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${localStorage.token}`;
                dispatch({
                    type: AuthUserActionType.LOGIN_USER,
                    payload: {
                        email: user.email 
                    },
                }); 
                navigator("/");
            });
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
        form.reset();
        setValidated(false);
       /*  navigator('/'); */   
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setinitValues((prevState) => ({
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
                        }}>Email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Email"
                            name="email"
                            value={initValues.email}
                            required
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a Email.
                        </Form.Control.Feedback>
                    </Form.Group> 
                    <Form.Group className="mb-3" controlId="formCategoryDescription">
                        <Form.Label style={{
                            color: 'white',
                            fontSize: "30px"
                        }}>Password</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Password"
                            name="password"
                            value={initValues.password}
                            required
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback
                            type="invalid">
                            Please enter a Password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Button className="ButtonAccept" style={{ margin: "0" }} type="submit">Login</Button>
                </Form>
            </div>
        </section>
    );
};

export default Login;