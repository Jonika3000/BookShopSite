import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DefaultHeader from "../DefaultHeader/DefaultHeader";
import { IBlogGet } from "../../types";
import parse from 'html-react-parser';
import http from "../../../http";
interface RouteParams {
    [key: string]: string | undefined;
    id: string;
} 
const BlogPage = () => {
    const { id } = useParams<RouteParams>();
    const [Blog, setBlog] = useState<IBlogGet>({
        id: 0,
        title: "",
        content: "" 
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await http.get<IBlogGet>(`/api/blog/blog/${id}`);
                await setBlog(response.data);
            }
            catch (error: any) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="Page">
            <DefaultHeader></DefaultHeader>
            <h1 className="text-white">{Blog.title}</h1>
            {parse(`${Blog.content}`)}
        </div>
    )
}
export default BlogPage;