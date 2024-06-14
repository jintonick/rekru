import React, { useState } from 'react';
import list from '../../imgs/list.svg';
import minus from '../../imgs/minus.svg';
import plus from '../../imgs/plus.svg';
import resume from '../../imgs/resume.svg';
import log_out from '../../imgs/log-out.svg';
import { useAuth } from "../../auth/auth_context";
import { useNavigate } from "react-router-dom";
import {Avatar, Button, Calendar, DatePicker, Input, TimePicker } from 'antd';
import {EditOutlined, SaveOutlined, UserOutlined} from '@ant-design/icons';
import ResumeForm from "../resume/resume_form";
import moment from 'moment';

function Lk() {
    const [isEditing, setIsEditing] = useState(false);
    const [userName, setUserName] = useState('Иванов Иван Иванович');
    const [birthDate, setBirthDate] = useState(moment('1997-03-10', 'YYYY-MM-DD'));
    const [company, setCompany] = useState('ООО Название');
    const [showResumeForm, setShowResumeForm] = useState(false);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
    };

    const { logout, userType } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="flex px-[70px] gap-[33px] justify-center min-h-screen mb-[40px]">
            <div className="h-[300px] w-[240px] flex flex-col justify-between rounded-[7px] bg-white p-[10px]">
                <div>
                    <Button
                        className={`flex px-[14px] h-[44px] w-[220px] py-[12px] border-none shadow-none justify-start items-center gap-[8px] rounded-[7px] ${!showResumeForm ? 'bg-[#EDF1FF]' : 'bg-white'}`}
                        onClick={() => setShowResumeForm(false)}
                    >
                        <img src={list} />
                        <h1 className="text-[16px]">Профиль</h1>
                    </Button>
                    <Button
                        className={`flex mt-[5px] px-[14px] h-[44px] w-[220px] py-[12px] border-none shadow-none justify-start items-center gap-[8px] rounded-[7px] ${showResumeForm ? 'bg-[#EDF1FF]' : 'bg-white'}`}
                        onClick={() => setShowResumeForm(true)}
                    >
                        <img className="h-[24px] w-[24px]" src={resume} />
                        <h1 className="text-[16px]">Резюме</h1>
                    </Button>
                </div>
                <div>
                    <Button className="flex px-[14px] h-[44px] py-[12px] justify-start items-center gap-[8px] w-full border-none shadow-none" onClick={handleLogout}>
                        <img src={log_out} />
                        <h1 className="text-[#B82A2A]">Выйти</h1>
                    </Button>
                </div>
            </div>
            <div className=" max-w-[1037px] w-full rounded-[7px] bg-white p-[30px] min-h-screen">
                {showResumeForm ? (
                        <div className="min-h-screen">
                            <ResumeForm />
                        </div>
                ) : (
                    <div>
                        <div className="flex justify-start gap-[50px]">
                            <div className="w-[159px]">
                                <Avatar className="w-[159px] h-[157px] rounded-[7px]" shape="square" icon={<UserOutlined />} />
                                <Button
                                    className="bg-[#EDF1FF] border-none shadow-none w-full h-[44px] mt-[20px]"
                                    icon={isEditing ? <SaveOutlined /> : <EditOutlined />}
                                    onClick={isEditing ? handleSaveClick : handleEditClick}
                                >
                                    {isEditing ? 'Сохранить' : 'Редактировать'}
                                </Button>
                            </div>
                            <div className="max-w-[199px] w-full">
                                <h3 className="text-[12px] font-bold mb-[10px]">Имя пользователя</h3>
                                {isEditing ? (
                                    <Input
                                        value={userName}
                                        onChange={e => setUserName(e.target.value)}
                                        className="mb-[20px] text-[18px]"
                                    />
                                ) : (
                                    <p className="mb-[20px] text-[18px]">{userName}</p>
                                )}
                                <h3 className="text-[12px] font-bold mb-[10px]">Дата рождения</h3>
                                {isEditing ? (
                                    <DatePicker
                                        value={birthDate}
                                        onChange={date => setBirthDate(date)}
                                        className="mb-[20px] text-[18px]"
                                    />
                                ) : (
                                    <p className="mb-[20px] text-[18px]">{birthDate.format('DD.MM.YYYY')}</p>
                                )}
                                <h3 className="text-[12px] font-bold mb-[10px]">Компания</h3>
                                <p className="mb-[20px] text-[18px]">{company}</p>
                            </div>
                        </div>
                        {userType === 'recruiter' ? (
                            <div className="flex flex-col w-full mt-[20px]">
                                <h3 className="text-[18px] font-bold mb-[10px]">Расписание</h3>
                                <div className="h-full w-full flex justify-start gap-[30px] bg-[#F1F3F4] rounded-[7px] p-[20px]">
                                    <div className="w-[285px]">
                                        <Calendar fullscreen={false} />
                                    </div>
                                    <div className="">
                                        <div className="mb-4">
                                            <p className="text-[14px] font-bold mb-[10px]">Перерыв между интервью</p>
                                            <div className='h-[44px] w-[185px] flex items-center justify-between p-[10px] bg-white rounded-[7px]'>
                                                <button className="border-none shadow-none"><img src={minus} /></button>
                                                <Input className="border-none shadow-none text-[16px] w-[90px]" defaultValue="15 минут" />
                                                <button className="border-none shadow-none"><img className="w-[24px]" src={plus} /></button>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[14px] font-bold mb-[10px]">Количество интервью в день</p>
                                            <div className='h-[44px] w-[185px] flex items-center justify-between p-[10px] bg-white rounded-[7px]'>
                                                <button className="border-none shadow-none"><img src={minus} /></button>
                                                <Input className="border-none shadow-none text-[16px] w-[110px]" defaultValue="1 интервью" />
                                                <button className="border-none shadow-none"><img className="w-[24px]" src={plus} /></button>
                                            </div>
                                        </div>
                                        <div className="mt-[20px]">
                                            <p className="text-[14px] font-bold mb-[10px]">Рабочий день</p>
                                            <TimePicker.RangePicker className=" h-[44px] rounded-[7px] border-none" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Lk;
