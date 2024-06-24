import React from "react";
import dots from "../imgs/dots.svg";
import vector from "../imgs/Vector.png";
import heart from "../imgs/heart.svg";
import messagecircle from "../imgs/message-circle.svg";
import send from "../imgs/send.svg";
import {UserOutlined} from "@ant-design/icons";
import {Avatar} from "antd";

function NewsCard() {
    return(
        <div className="flex flex-col justify-start px-[30px] h-screen border-t-[1px] rounded-[7px]">
            <div className="flex justify-between items-center">
                <div className='flex items-center h-full gap-[8px] my-[10px]'>
                    <Avatar icon={<UserOutlined />} />
                    <h1>Маргарита Васильева</h1>
                    <h1 className="text-[12px] text-gray-400">24 июня</h1>
                    <button className="font-bold text-[12px] text-[#213A8B]">Подписаться</button>
                </div>
                <div className="h-full flex items-center">
                    <button><img src={dots} alt="dots" /></button>
                </div>
            </div>
            <div>
                <img src={vector} alt="vector" />
                <h1 className="text-[20px] font-bold mt-[20px] mb-[10px]">Почему важно приходить на работу вовремя?</h1>
                <p className="text-[15px] text-[#4A4A4A]">
                    Власти планируют ввести акциз на медицинский спирт и спиртосодержащие лекарства — такой законопроект разработал Минфин. Его авторы считают, что это поможет бороться с оборотом нелегального алкоголя. Однако это неизбежно приведет к удорожанию таких препаратов, несмотря на предусмотренные в проекте налоговые вычеты производителям. Власти планируют ввести акциз на медицинский спирт и спиртосодержащие лекарства — такой законопроект разработал Минфин. Его авторы считают, что это поможет бороться с оборотом нелегального алкоголя. Однако это неизбежно приведет к удорожанию таких препаратов, несмотря на предусмотренные в проекте налоговые вычеты производителям. Власти планируют ввести акциз на медицинский спирт и спиртосодержащие лекарства — такой законопроект разработал Минфин. Его авторы считают, что это поможет бороться с оборотом нелегального алкоголя. Однако это неизбежно приведет к удорожанию таких препаратов, несмотря на предусмотренные в проекте налоговые вычеты производителям. Власти планируют ввести акциз на медицинский спирт и спиртосодержащие лекарства — такой законопроект разработал Минфин. Его авторы считают, что это поможет бороться.
                </p>
            </div>
            <div className="flex w-full justify-between items-center my-[15px]">
                <div className="flex gap-[16px]">
                    <button className="flex gap-[5px]"><img src={heart} alt="heart" /><p>332 лайка</p></button>
                    <button className="flex gap-[5px]"><img src={messagecircle} alt="message" /><p>23 комментария</p></button>
                </div>
                <div>
                    <button><img src={send} alt="send" /></button>
                </div>
            </div>
        </div>
    )
}

export default NewsCard;
