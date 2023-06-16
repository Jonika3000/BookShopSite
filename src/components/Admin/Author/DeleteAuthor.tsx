import { Button, Form, Modal } from "react-bootstrap";
import http from "../../../http";
import { ChangeEvent, useEffect, useState } from "react";
import { IAuthorGet } from "../../types";
import axios from "axios";

const DeleteAuthor = () => {
    const [validated, setValidated] = useState(false);
    const [AllItems, SetAllItems] = useState<IAuthorGet[]>([]);
    const [deleteItem, SetDeleteItem] = useState<IAuthorGet>({
        id: 0,
        firstName: "",
        surname: "",
        description: "",
        year: "",
        image: ""
    });
    useEffect(() => {
        axios.get<IAuthorGet[]>('https://localhost:7190/api/author/list')
            .then(resp => {
                SetAllItems(resp.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        await DeleteDataAsync();
        form.reset();
    }
    function ComboBoxChange(event: ChangeEvent<HTMLSelectElement>): void {
        if (event.target.value != "")
            SetDeleteItem({
                ...deleteItem,
                id: parseInt(event.target.value)
            });
    }
    let dataItems = AllItems.length > 0 && AllItems.map((item) => (
        <option key={item.id} value={item.id}>{item.firstName} {item.surname}</option>
    ));
    const DeleteDataAsync = async () => {
        try {
            await http.delete(`https://localhost:7190/api/author/delete/` + deleteItem.id);
            SetDeleteItem({
                id: 0,
                firstName: "",
                surname: "",
                description: "",
                year: "",
                image: ""
            });
        }
        catch (error: any) {
            console.log(error);
        }
    }

    return (
        <div style={{ minHeight: "100vh" }}>
            <div className="CenterContent">
                <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ margin: "0 auto" }}>
                    <Form.Group className="mb-3" controlId="formItemCategory">
                        <Form.Label style={{ color: 'white', fontSize: "30px" }}>Select a author to delete</Form.Label>
                        <Form.Select aria-label="Item category" onChange={ComboBoxChange} required name="FormSelectCategory">
                            <option value="">Choose...</option>
                            {dataItems}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">Please select a author.</Form.Control.Feedback>
                    </Form.Group>
                    <Button style={{ margin: "0" }} type="submit">Delete</Button>
                </Form>


            </div>
        </div>
    );
};

export default DeleteAuthor;