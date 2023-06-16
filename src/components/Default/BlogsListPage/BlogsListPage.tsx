import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DefaultHeader from "../DefaultHeader/DefaultHeader"; 
import { IBlogGet } from "../../types";
import "./BlogsListPage.css"
const AllBlogsPage = () => { 
    const [allBlogs, setAllBlogs] = useState<IBlogGet[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<IBlogGet[]>(`https://localhost:7190/api/blog/list`);
                await setAllBlogs(response.data);
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
            <div className="containerBlogs">
                <div className="CenterDiv">
                    <ul>
                        {allBlogs.map((item) => (
                            <li key={item.id}><Link to={`/blog/${item.id}`}>{item.title}</Link></li>
                        ))}
                    </ul>
                </div>
            </div>
           
        </div>
    )
}
export default AllBlogsPage;