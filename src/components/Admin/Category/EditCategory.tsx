import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import http from "../../../http";
import {  ICategory } from "../../types"; 
const EditCategory = () => {
    const [AllItems, SetAllItems] = useState<ICategory[]>([]);
    const [EditItem, setEditItem] = useState<ICategory>({
        id: 0,
        name: "",
        description: "",
        slug: ""
    }); 
    const [validated, setValidated] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

    useEffect(() => {
        http
            .get<ICategory[]>("/api/category/list")
            .then((response) => {
                SetAllItems(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const EditDataAsync = async () => {
        const formData = new FormData();
        formData.append("id", EditItem.id.toString());
        formData.append("name", EditItem.name);
        formData.append("description", EditItem.description);
        formData.append("slug", EditItem.slug);
        try {
            await http
                .post("/api/category/edit/" + EditItem.id, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
            setEditItem({
                id: 0,
                name: "",
                description: "",
                slug: ""
            });
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
                slug: ""
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
                            }}>Category</Form.Label>
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
                            }}>Slug</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter item slug"
                                name="slug"
                                value={EditItem.slug}
                                required
                                onChange={handleChange}
                                disabled={!selectedItemId}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default EditCategory;