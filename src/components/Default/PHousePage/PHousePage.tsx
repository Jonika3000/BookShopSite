import { useParams } from "react-router-dom";
import { useEffect, useState } from "react"; 
import DefaultHeader from "../DefaultHeader/DefaultHeader";
import {IPublishingHouseGet } from "../../types";
import http from "../../../http";
import { APP_ENV } from "../../../env";
interface RouteParams {
    [key: string]: string | undefined;
    id: string;
}

const PublishingHousePage = () => {
    const { id } = useParams<RouteParams>();
    const [House, setHouse] = useState<IPublishingHouseGet>({
        id: 0,
        name: "",
        description: "",
        image: ""
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await http.get<IPublishingHouseGet>(`/api/PublishingHouses/publishingHouse/${id}`);
                await setHouse(response.data);
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
            <div className="container py-4 my-4 mx-auto d-flex flex-column">
                <div className="container-body mt-4">
                    <div className="row r3">
                        <div className="col-md-5 p-0 klo">
                            <div className="InfoBook">
                                <h1>{House.name}</h1>
                                <p><strong>Description:</strong> {House.description}</p> 
                            </div>
                        </div>
                        <div className="col-md-7">
                            <img src={`${APP_ENV.BASE_URL}/images/${House.image}`}
                                style={{ width: "500px", height: "400px", objectFit: "cover", marginLeft: "3rem" }}></img>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default PublishingHousePage;