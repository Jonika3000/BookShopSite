import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import http from "../../../http";
import { IBlogGet } from "../../types";
import { APP_ENV } from "../../../env";
import { Editor } from "@tinymce/tinymce-react";
const EditBlog = () => {
    const [AllItems, SetAllItems] = useState<IBlogGet[]>([]);
    const [EditItem, setEditItem] = useState<IBlogGet>({
        id: 0,
        title: "",
        content: ""
    });
    const [content, setContent] = useState('');
    const [validated, setValidated] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

    useEffect(() => {
        http
            .get<IBlogGet[]>("/api/blog/list")
            .then((response) => {
                SetAllItems(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const EditDataAsync = async () => {
        const formData = new FormData();
        formData.append("Id", EditItem.id.toString());
        formData.append("Title", EditItem.title);
        formData.append("Content", content);
        try {
            await http
                .post("/api/blog/edit/" + EditItem.id, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
            setEditItem({
                id: 0,
                title: "",
                content: ""
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
                title: "",
                content: ""
            });
        }
    }


    const dataItems = AllItems.map((item) => {
        return (
            <option key={item.id} value={item.id}>
                {item.title}
            </option>
        );
    });
    const handleEditorChange = (content: string) => {
        setContent(content);
    };
    return (
        <div style={{ minHeight: "100vh" }}>
            <div className="CenterContent">
                <div className="Padding">
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label style={{
                                color: "white",
                                fontSize: "24px"
                            }}>Blog</Form.Label>
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
                            }}>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter item title"
                                name="title"
                                value={EditItem.title}
                                required
                                onChange={handleChange}
                                disabled={!selectedItemId}
                            />
                        </Form.Group>
                        <Form.Label style={{
                            color: "white",
                            fontSize: "24px"
                        }}>Content</Form.Label>
                        <Editor
                            disabled={!selectedItemId}
                            initialValue={EditItem.content}
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
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default EditBlog;