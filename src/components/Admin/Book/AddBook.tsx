import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap"; 
import http from "../../../http";
import { IAuthorGet, IBook, ICategory, IPublishingHouseGet } from "../../types";


const AddBook = () => {
    const [validated, setValidated] = useState(false);
    let [itemImages, setItemImages] = useState<File[]>([]);
    const [AllAuthors, setAllAuthors] = useState<IAuthorGet[]>([]);
    const [AllHouses, setAllHouses] = useState<IPublishingHouseGet[]>([]);
    const [AllCategory, setAllCategory] = useState<ICategory[]>([]);
    const [book, setBook] = useState<IBook>({
        id: 0,
        Name: "",
        Description: "",
        Image: null,
        PageCount: "",
        Price: "",
        CategoryId: "",
        PublishingHouseId: "",
        AuthorId: ""
    });
    const handleImageReorder = (dragIndex: number, dropIndex: number) => {
        const updatedImages = [...itemImages];
        const [draggedImage] = updatedImages.splice(dragIndex, 1);
        updatedImages.splice(dropIndex, 0, draggedImage);
        setItemImages(updatedImages);
    };
    async function uploadImagesInOrder(itemImages: File[], addedItemId: number) {
        for (const image of itemImages) {
            const formData = new FormData();
            formData.append('Url', image, image.name);
            formData.append('ItemId', addedItemId.toString());
            try {
                await http.post('https://localhost:7190/api/book/AddImages', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } catch (error: any) {
                console.log(error);
            }
        }
    }
    const PostDataItem = async () => {
        try {
            const formData = new FormData();
            formData.append('Name', book.Name);
            formData.append('Description', book.Description);
            formData.append('PageCount', book.PageCount);
            formData.append('Price', book.Price);
            formData.append('PublishingHouseId', book.PublishingHouseId);
            formData.append('AuthorId', book.AuthorId);
            formData.append('CategoryId', book.CategoryId);
            if (book.Image != null) {
                formData.append('Image', book.Image, book.Image.name);
            }
            try {
                const response = await http.post<IBook>("https://localhost:7190/api/book/create", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                const addedItemId = response.data.id;
                if (itemImages.length > 0) {
                    console.log(itemImages);
                    console.log(addedItemId);
                    await uploadImagesInOrder(itemImages, addedItemId);
                    setItemImages([]);
                    SelectedImages = [];
                }
            }
            catch (error: any) {
                console.log(error);
            }
        }
        catch (error: any) {
            console.log(error);
        }
        setBook({
            id: 0,
            Name: "",
            Description: "",
            Image: null,
            PageCount: "",
            Price: "",
            CategoryId: "",
            PublishingHouseId: "",
            AuthorId: ""
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
        await PostDataItem();

        setValidated(false);
        form.reset();

    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setBook((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        http.get<ICategory[]>('https://localhost:7190/api/category/list', {
            headers: {
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
            .then(resp => {
                setAllCategory(resp.data);
            })
            .catch((error) => {
                console.log(error);
            });
        http.get<IPublishingHouseGet[]>('https://localhost:7190/api/PublishingHouses/list', {
            headers: {
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
            .then(resp => {
                setAllHouses(resp.data);
            })
            .catch((error) => {
                console.log(error);
            });
        http.get<IAuthorGet[]>('https://localhost:7190/api/author/list', {
            headers: {
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
            .then(resp => {
                setAllAuthors(resp.data); 
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    function ComboBoxChange(event: ChangeEvent<HTMLSelectElement>): void {
        const { name } = event.target;
        if (event.target.value != "")
            setBook({
                ...book,
                [name]: parseInt(event.target.value)
            });
    }
    const handleRemoveImage = (index: number) => {
        const updatedImages = [...itemImages];
        updatedImages.splice(index, 1);
        setItemImages(updatedImages);
    };
    const dataAllCategory = AllCategory.map((item) => (
        <option key={item.id} value={item.id}>{item.name}</option>
    ));
    const dataAllHouses = AllHouses.map((item) => (
        <option key={item.id} value={item.id}>{item.name}</option>
    ));
    const dataAllAuthors = AllAuthors.map((item) => (
        <option key={item.id} value={item.id}>{item.firstName} {item.surname}</option>
    ));
    let SelectedImages = itemImages.map((img, index) => (
        <div
            key={index}
            style={{ display: "flex", alignItems: "center", margin: "10px" }}
            draggable
            onDragStart={(event) => event.dataTransfer.setData("text/plain", index.toString())}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
                event.preventDefault();
                const dragIndex = parseInt(event.dataTransfer.getData("text/plain"), 10);
                handleImageReorder(dragIndex, index);
            }}
        >
            <img
                src={URL.createObjectURL(img)}
                style={{ maxHeight: "100px", maxWidth: "100px", objectFit: "cover" }}
                alt={`Image ${index + 1}`}
            />
            <Button
                variant="danger"
                size="sm"
                style={{ marginLeft: "10px" }}
                onClick={() => handleRemoveImage(index)}
            >
                Remove
            </Button>
        </div>
    ));

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
                            value={book.Name}
                            required
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a name.
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
                                    setBook({
                                        ...book,
                                        Image: file
                                    });
                                }
                            }}
                        />
                        <Form.Control.Feedback
                            type="invalid">
                            Please select a item image.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formItemImages">
                        <Form.Label style={{
                            color: 'white',
                            fontSize: "30px"
                        }}>Images</Form.Label>
                        <Form.Control
                            type="file"
                            multiple
                            required
                            accept=".jpg,.png,.jpeg"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                const files = event.target.files;
                                if (files) {
                                    const newImages = [...itemImages, ...Array.from(files)];
                                    setItemImages(newImages);
                                }
                            }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please select at least one image.
                        </Form.Control.Feedback>
                    </Form.Group>
                    {SelectedImages}
                    <Form.Group className="mb-3" controlId="formCategoryDescription">
                        <Form.Label style={{
                            color: 'white',
                            fontSize: "30px"
                        }}>Page Count</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter item PageCount"
                            name="PageCount"
                            value={book.PageCount}
                            required
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback
                            type="invalid">
                            Please enter a item PageCount.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCategoryDescription">
                        <Form.Label style={{
                            color: 'white',
                            fontSize: "30px"
                        }}>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter item Price"
                            name="Price"
                            value={book.Price}
                            required
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback
                            type="invalid">
                            Please enter a item price.
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
                            placeholder="Enter category description"
                            name="Description"
                            value={book.Description}
                            required
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback
                            type="invalid">
                            Please enter a item description.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formItemCategory">
                        <Form.Label style={{ color: 'white', fontSize: "30px" }}>Category</Form.Label>
                        <Form.Select aria-label="Item category" required onChange={ComboBoxChange} name="CategoryId">
                            <option value="">Choose...</option>
                            {dataAllCategory}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">Please select a category.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formItemCategory">
                        <Form.Label style={{ color: 'white', fontSize: "30px" }}>Author</Form.Label>
                        <Form.Select aria-label="Item author" required onChange={ComboBoxChange} name="AuthorId">
                            <option value="">Choose...</option>
                            {dataAllAuthors}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">Please select a category.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formItemCategory">
                        <Form.Label style={{ color: 'white', fontSize: "30px" }}>Publishing House</Form.Label>
                        <Form.Select aria-label="Item publishingHouse" required onChange={ComboBoxChange} name="PublishingHouseId">
                            <option value="">Choose...</option>
                            {dataAllHouses}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">Please select a category.</Form.Control.Feedback>
                    </Form.Group>
                    <Button className="ButtonAccept" style={{ margin: "0" }} type="submit">Add</Button>
                </Form> 
            </div>
        </section>

    );
};

export default AddBook;