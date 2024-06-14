import React from 'react';
import Navbar from "./navbar";
import vector from "../imgs/Vector.png"
import dots from "../imgs/dots.svg"
import messagecircle from "../imgs/message-circle.svg";
import heart from "../imgs/heart.svg";
import send from "../imgs/send.svg";
import SliderComponent from "../components/slider";
import NewsCard from "../components/news_card";

const News: React.FC = () => {
    return (
        <div className="h-full w-full flex justify-start items-start">
            <div className="container mx-auto flex justify-between items-start max-w-[1440px] px-[68px]">
                <div className="mt-[20px]">
                    <Navbar />
                </div>
                <div className="w-full h-full min-h-[400px] bg-white rounded-[7px] max-w-[1037px] flex flex-col justify-center">
                    <div className="rounded-[7px] w-full bg-gray w-full h-full">
                        <SliderComponent />
                    </div>
                    <NewsCard/>
                </div>
            </div>
        </div>
    );
}

export default News;
