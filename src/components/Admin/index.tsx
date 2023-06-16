import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { IAuthUser } from "../Default/Auth/types";
import DefaultHeader from "../Default/DefaultHeader/DefaultHeader";

const ControlPanelLayout = () => {
    const { isAuth } = useSelector((store: any) => store.auth as IAuthUser);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth)
            navigate("/"); 
    }, []);
    return (
        <>
        <DefaultHeader></DefaultHeader>
            <Outlet></Outlet>
        </>
    );
};
export default ControlPanelLayout;