// Footer.tsx
import React from 'react';
import google_play from '../imgs/google_play.svg'
import app_store from '../imgs/app_store.svg'
import {message} from "antd";

const Footer: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const info = () => {
        messageApi.info('Cори, эта функция очень дорогая, а у нас нет столько времени');
    };
    return (
        <footer className="bg-white text-black flex justify-center z-50">
            {contextHolder}
            <div className="max-w-[1440px] w-full px-[70px] py-[50px]">
                <div className="flex justify-between w-full items-center max-w-[1440px] border-b border-[#C1C7CD] pb-[36px]">
                    <div className="w-full">
                        <h1 className="text-[#2A5AB8] text-[36px] font-extrabold">rekru</h1>
                    </div>
                    <div className="flex items-center max-w-[623px] w-full justify-between">
                        <input
                            type="text"
                            placeholder="Подпишитесь на ежедневную рассылку новостей.."
                            className="max-w-[447px] p-[10px] w-full h-[48px] bg-[#F2F4F8] rounded-[7px]"
                        />
                        <button className="bg-[#2A5AB8] text-white max-w-[160px] h-[48px] w-full  rounded-[7px]" onClick={info}>
                            Подписаться
                        </button>
                    </div>
                </div>
                <div className="flex justify-between items-center w-full pt-[36px]">
                    <p className="text-[14px]">Rekru 2024. Все права защищены</p>
                    <div className="flex items-center gap-[10px]">
                        <a href="#" className="text-[18px] font-bold">Следите за нами</a>
                        <a href="#"><img src={app_store} alt="App Store" className="h-10" /></a>
                        <a href="#"><img src={google_play} alt="Google Play" className="h-10" /></a>
                    </div>
                    <div className="flex gap-[16px] text-[18px] font-bold">
                        <a href="#" className="hover:text-black">Правила использования</a>
                        <a href="#" className="hover:text-black">Соглашение</a>
                        <a href="#" className="hover:text-black">Подписка</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
