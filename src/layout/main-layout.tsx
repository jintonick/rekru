import React from "react";
import Header from "./header";
import Footer from "./footer";
import AppRoutes from "../routes/routes";

function MainLayout(){
    return(
        <div className="font-helvetica">
            <Header/>
            <div className="min-h-screen">
                <AppRoutes/>
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout;