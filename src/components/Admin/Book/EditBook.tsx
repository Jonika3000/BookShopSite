import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import http from "../../../http";
import {  IBookGet } from "../../types";
import { APP_ENV } from "../../../env";
const EditBook = () => {
    const [AllItems, SetAllItems] = useState<IBookGet[]>([]);
    const [EditItem, setEditItem] = useState<IBookGet>({
        id: 0,
        name: "",
        description: "",
        image: "",
        pageCount: "",
        price: "",
        categoryId: "",
        publishingHouseId: "",
        authorId: ""
    });
    const [image, setImage] = useState<File | null>(null);
    const [validated, setValidated] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

    useEffect(() => {
        http
            .get<IBookGet[]>("/api/book/list")
            .then((response) => {
                SetAllItems(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const EditDataAsync = async () => {
        const formData = new FormData();
        formData.append('Name', EditItem.name);
        formData.append('Description', EditItem.description);
        formData.append('PageCount', EditItem.pageCount);
        formData.append('Price', EditItem.price);
        formData.append('PublishingHouseId', EditItem.publishingHouseId);
        formData.append('AuthorId', EditItem.authorId);
        formData.append('CategoryId', EditItem.categoryId);
        if (image != null) {
            formData.append("Image", image, image.name);
        }
        try {
            await http
                .post("/api/book/edit/" + EditItem.id, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
            setEditItem({
                id: 0,
                name: "",
                description: "",
                image: "",
                pageCount: "",
                price: "",
                categoryId: "",
                publishingHouseId: "",
                authorId: ""
            });
            setImage(null);
            setSelectedItemId(null);
        }
        catch (error: any) {
            console.log(error);
        }

    }
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
        const form = event.currentTarget;
        if (event.currentTarget.checkValidity() === true) {
            await EditDataAsync();
            form.reset();
        }
    };

    function handleChange(
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void {
        setEditItem({ ...EditItem, [event.target.name]: event.target.value });
    }

    function handleImageChange(event: ChangeEvent<HTMLInputElement>): void {
        const files = event.target.files;
        if (files && files.length > 0) {
            setImage(files[0]);
        }
    }

    function ComboBoxChange(event: ChangeEvent<HTMLSelectElement>): void {
        const selectedId = Number(event.target.value);
        setSelectedItemId(selectedId);
        const selectedItem = AllItems.find((item) => item.id === selectedId);
        if (selectedItem) {
            setEditItem(selectedItem);
        } else {
            setEditItem({
                id: 0,
                name: "",
                description: "",
                image: "",
                pageCount: "",
                price: "",
                categoryId: "",
                publishingHouseId: "",
                authorId: ""
            });
        }
    }


    const dataItems = AllItems.map((item) => {
        return (
            <option key={item.id} value={item.id}>
                {item.name}  
            </option>
        );
    });
    return (
        <div style={{ minHeight: "100vh" }}>
            <div className="CenterContent">
                <div className="Padding">
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label style={{
                                color: "white",
                                fontSize: "24px"
                            }}>Book</Form.Label>
                            <Form.Select
                                aria-label="Item"
                                onChange={ComboBoxChange}
                                required
                                name="FormSelectItem"
                                value={selectedItemId || ""}
                            >
                                <option value="">Choose...</option>
                                {dataItems}
                            </Form.Select>
                        </Form.Group> 
                        <Form.Group>
                            <Form.Label style={{
                                color: "white",
                                fontSize: "24px"
                            }}>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter item name"
                                name="name"
                                value={EditItem.name}
                                required
                                onChange={handleChange}
                                disabled={!selectedItemId}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{
                                color: "white",
                                fontSize: "24px"
                            }}>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter item description"
                                name="description"
                                value={EditItem.description}
                                required
                                onChange={handleChange}
                                disabled={!selectedItemId}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{
                                color: "white",
                                fontSize: "24px"
                            }}>Page Count</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter item pageCount"
                                name="pageCount"
                                value={EditItem.pageCount}
                                required
                                onChange={handleChange}
                                disabled={!selectedItemId}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{
                                color: "white",
                                fontSize: "24px"
                            }}>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter item price"
                                name="price"
                                value={EditItem.price}
                                required
                                onChange={handleChange}
                                disabled={!selectedItemId}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{
                                color: "white",
                                fontSize: "24px"
                            }}>Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={handleImageChange}
                            />
                        </Form.Group>
                        <div style={{ width: "100%" }}>
                            {EditItem.image && image == null && (
                                <img src={`${APP_ENV.BASE_URL}/${EditItem.image}`}
                                    style={{ width: "100px", height: "100px", margin: "10px" }}></img>
                            )}
                            {image != null && (
                                <img src={URL.createObjectURL(image)} style={{ maxHeight: "100px", maxWidth: "100px", objectFit: "cover" }} />
                            )}
                        </div>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );

};

export default EditBook;