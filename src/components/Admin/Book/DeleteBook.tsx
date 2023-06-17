import { Button, Form, Modal } from "react-bootstrap";
import http from "../../../http";
import { ChangeEvent, useEffect, useState } from "react";
import { IBookGet } from "../../types"; 

const DeleteBook = () => {
    const [validated, setValidated] = useState(false);
    const [AllItems, SetAllItems] = useState<IBookGet[]>([]);
    const [deleteItem, SetDeleteItem] = useState<IBookGet>({
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
    useEffect(() => {
        http.get<IBookGet[]>('/api/book/list')
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
        <option key={item.id} value={item.id}>{item.name}</option>
    ));
    const DeleteDataAsync = async () => {
        try {
            await http.delete(`/api/book/delete/` + deleteItem.id);
            SetDeleteItem({
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
                        <Form.Label style={{ color: 'white', fontSize: "30px" }}>Select a book to delete</Form.Label>
                        <Form.Select aria-label="Item category" onChange={ComboBoxChange} required name="FormSelectCategory">
                            <option value="">Choose...</option>
                            {dataItems}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">Please select a book.</Form.Control.Feedback>
                    </Form.Group>
                    <Button style={{ margin: "0" }} type="submit">Delete</Button>
                </Form>


            </div>
        </div>
    );
};

export default DeleteBook;