import React from "react";
import Login_form from "./login_form";
import Footer from "../../layout/footer";
import NewsSec from "./news_sec";
function Main() {
    return(
        <div>
            <div className="flex justify-center items-center flex-col w-full h-full">
                <div className='max-w-[1440px] w-full'>
                    <div className=" flex justify-center w-full">
                        <Login_form/>
                    </div>
                    <div className="mt-[120px] h-full">
                        <NewsSec />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;