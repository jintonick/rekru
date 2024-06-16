import React from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import search from '../imgs/search.svg';
import home from '../imgs/home.svg';
import user from '../imgs/user.svg';
import mail from '../imgs/mail.svg';
import briefcase from '../imgs/briefcase.svg';
import bell from '../imgs/bell.svg';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import { useAuth } from '../auth/auth_context';

const Header: React.FC = () => {
    const { isLoggedIn} = useAuth();

    return (
        <div className="flex flex-col justify-center items-center w-full">
            {isLoggedIn ? (
                <header className="flex w-full justify-between items-center px-[68px] py-[16px] max-w-[1440px]">
                    <Link className="text-[#2A5AB8] text-[36px] font-extrabold" to={"/news"}>rekru</Link>
                    <div className="w-full max-w-[1037px] flex items-start">
                        <div className="bg-white w-full p-[15px] flex items-center max-w-[426px] h-[45px] rounded-[7px] ">
                            <button><img src={search} className="mr-[15px]" alt='src'/></button>
                            <input placeholder="Введите запрос..." className="h-[23px] w-full"/>
                        </div>
                        <div className="px-[42px] flex justify-between w-full max-w-[585px]">
                            <Link to={'/news'} className="h-[42px] flex flex-col justify-between items-center transition-transform transform hover:scale-105 active:scale-99">
                                <img className="mt-[2px]" src={home} alt='home'/>
                                <p className="mt-[7px]">Новости</p>
                            </Link>
                            <Link to={'/job'} className="h-[42px] flex flex-col justify-between items-center transition-transform transform hover:scale-105 active:scale-95">
                                <img className="mt-[2px]" src={briefcase} alt='briefcase'/>
                                <p className="mt-[5px]">Вакансии</p>
                            </Link>
                            <Link to={'/spec'} className="h-[42px] flex flex-col justify-between items-center transition-transform transform hover:scale-105 active:scale-95">
                                <img className="mt-[2px]" src={user} alt='user'/>
                                <p className="mt-[5px]">Специалисты</p>
                            </Link>
                            <button className="h-[42px] flex flex-col justify-between items-center" disabled >
                                <img className="mt-[2px]" src={mail} alt='mail'/>
                                <p className="mt-[5px]">Сообщения</p>
                            </button>
                            <button className="h-[42px] flex flex-col justify-between items-center" disabled>
                                <img className="mt-[2px]" src={bell} alt='bell'/>
                                <p className="mt-[5px]">Уведомления</p>
                            </button>
                        </div>
                        <Link to="/lk" className="h-full flex justify-center items-center">
                            <Avatar className='h-[46px] w-[46px]' icon={<UserOutlined />} />
                        </Link>
                    </div>
                </header>
            ) : (
                <header className="flex w-full justify-between items-center px-[68px] py-[16px] max-w-[1440px]">
                    <Link className="text-[#2A5AB8] text-[36px] font-extrabold" to={"/"}>Rekru</Link>
                    <div className="w-full  flex items-start justify-between">
                        <div className="px-[42px] flex justify-between w-full  text-[16px] max-w-[445px]">
                            <Link to={'/news'} className="h-[42px] flex justify-center items-center">
                                <p className="mt-[5px]">Новости</p>
                            </Link>
                            <Link to={'/job'} className="h-[42px] flex justify-center items-center">
                                <p className="mt-[5px]">Вакансии</p>
                            </Link>
                            <Link to={'/spec'} className="h-[42px] flex justify-center items-center">
                                <p className="mt-[5px]">Специалисты</p>
                            </Link>
                            <button className="h-[42px] flex justify-center items-center">
                                <p className="mt-[5px]">Помощь</p>
                            </button>
                        </div>
                        <div className="bg-white w-full p-[15px] flex items-center max-w-[426px] h-[45px] rounded-[7px] ">
                            <button><img src={search} className="mr-[15px]" alt='src'/></button>
                            <input placeholder="Введите запрос..." className="h-[40px] w-full"/>
                        </div>
                        <button className="h-[46px] ml-[32px] max-w-[221px] w-full text-white text-[16px] rounded-[7px] bg-[#2A5AB8]">
                            Зарегистрироваться
                        </button>
                    </div>
                </header>
            )}
        </div>
    );
}

export default Header;

