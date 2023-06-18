import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import http from "../../../http";
import {   IPublishingHouseGet } from "../../types";
import { APP_ENV } from "../../../env";
const EditHouse = () => {
    const [AllItems, SetAllItems] = useState<IPublishingHouseGet[]>([]);
    const [EditItem, setEditItem] = useState<IPublishingHouseGet>({
        id: 0,
        name: "",
        description: "",
        image: ""
    }); 
    const [image, setImage] = useState<File | null>(null);
    const [validated, setValidated] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

    useEffect(() => {
        http
            .get<IPublishingHouseGet[]>("/api/PublishingHouses/list")
            .then((response) => {
                SetAllItems(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const EditDataAsync = async () => {
        const formData = new FormData();
        formData.append('Id', EditItem.id.toString());
        formData.append('Name', EditItem.name);
        formData.append('Description', EditItem.description);
        if (image != null) {
            formData.append("Image", image, image.name);
        }
        try {
            await http
                .post("/api/PublishingHouses/edit/" + EditItem.id, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
            setEditItem({
                id: 0,
                name: "",
                description: "",
                image: ""
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
                image: ""
            });
        }
    }
    function handleImageChange(event: ChangeEvent<HTMLInputElement>): void {
        const files = event.target.files;
        if (files && files.length > 0) {
            setImage(files[0]);
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
                            }}>Publishing House</Form.Label>
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

export default EditHouse;