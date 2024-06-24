import React from "react";
import NewsCard from "../../components/news_card";
import frame from '../../imgs/Frame.png'
import dots from '../../imgs/dots-horizontal.svg'
import { Avatar } from "antd";
import {UserOutlined} from "@ant-design/icons";

function Profile() {
    return (
        <div className="w-full flex justify-center min-h-screen">
            <div className="max-w-[1440px] w-full px-[200px]">
                <div className="h-[156px] rounded-[7px] bg-white mb-[20px] px-[40px]  py-[30px] flex">
                    <div className="flex items-center gap-[30px] pr-[30px] w-full">
                        <Avatar className='w-[98px] h-[98px]' icon={<UserOutlined />} />
                        <div>
                            <h1 className='text-[18px] font-bold'>Маргарита Васильевна</h1>
                            <h1>26 лет</h1>
                            <h1>Москва</h1>
                        </div>
                    </div>
                    <div className="pl-[24px] border-l-[1px] w-full min-w-[252px]">
                        <img src={frame}/>
                    </div>
                </div>

                <div className=" bg-white rounded-[7px] w-full px-[40px] py-[30px] mb-[30px]">
                    <div className="w-full flex justify-between mb-[20px]">
                        <h1 className="text-[18px] font-bold text-[#21272A]">Публикации</h1>
                        <h1 className="text-[18px] font-bold text-[#2A5AB8]">Статистика</h1>
                    </div>
                    <NewsCard />
                </div>
            </div>
        </div>
    )
}

export default Profile;