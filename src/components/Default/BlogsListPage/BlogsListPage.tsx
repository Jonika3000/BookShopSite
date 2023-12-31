import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DefaultHeader from "../DefaultHeader/DefaultHeader"; 
import { IBlogGet } from "../../types";
import "./BlogsListPage.css"
import http from "../../../http";
const AllBlogsPage = () => { 
    const [allBlogs, setAllBlogs] = useState<IBlogGet[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await http.get<IBlogGet[]>(`/api/blog/list`);
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
                    <ul style={{ display: "flex", flexDirection: "column", padding: 0 }}>
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