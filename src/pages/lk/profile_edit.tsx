import React from 'react';
import {Upload, Button, Input, DatePicker, InputNumber, Avatar} from 'antd';
import NewsCard from "../../components/news_card";
import {UserOutlined} from '@ant-design/icons';

const ProfileEdit: React.FC = () => {
    return (
        <div>
            <div className="w-full py-[30px] px-[48px] rounded-[7px] bg-white mb-[24px]">
                <div className="flex flex-col justify-between items-start">
                    <h1 className='text-[18px] font-bold text-[#21272A] mb-[24px]'>Аватар профиля</h1>
                    <div className='flex w-full pb-[24px] border-b-[1px] border-b-[#DDE1E6]'>
                        <div className='flex gap-[24px] pr-[48px]'>
                            <Avatar className='w-[98px] h-[98px]' icon={<UserOutlined />} />
                            <div className='flex flex-col justify-center'>
                                <Button className="w-[194px] h-[48px] border-[2px] border-[#2A5AB8] text-[16px] text-[#2A5AB8] rounded-[7px]">Изменить аватар</Button>
                                <Button className="border-none text-[16px] shadow-none text-[#B82A2A]">удалить</Button>
                            </div>
                        </div>
                        <div className="pl-[31px] border-l-[1px] border-l-[#DDE1E6]">
                            <h2 className="text-[18px] mb-[8px]">Требования к фото</h2>
                            <div className='text-[14px]'>
                                <p>1. Мин. 400 x 400px</p>
                                <p>2. Макс. 2MB</p>
                                <p>3. Лицо либо логотип компании</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-[24px]">
                    <h2 className="text-lg font-bold mb-[24px]">Данные профиля</h2>
                    <div className="flex gap-[16px]">
                        <div className='w-full'>
                            <p className="text-[14px] mb-[8px]">Имя</p>
                            <Input className="h-[48px] rounded-[12px] text-[16px] border-[C1C7CD] mb-[16px]" placeholder="Имя" />
                            <p className="text-[14px] mb-[8px]">Дата рождения</p>
                            <DatePicker placeholder="Дата рождения" className="h-[48px] rounded-[12px] text-[16px] mb-[16px] w-full border-[C1C7CD]" />
                            <p className="text-[14px] mb-[8px]">Компания</p>
                            <Input className="h-[48px] rounded-[12px] text-[16px] border-[C1C7CD]" placeholder="Компания" />
                        </div>
                        <div className="w-full">
                            <p className="text-[14px] mb-[8px]">Фамилия</p>
                            <Input className="h-[48px] rounded-[12px] text-[16px] mb-[16px] border-[C1C7CD]" placeholder="Фамилия" />
                            <p className="text-[14px] mb-[8px]">Город</p>
                            <Input className="h-[48px] rounded-[12px] text-[16px] mb-[16px] border-[C1C7CD]" placeholder="Город" />
                            <p className="text-[14px] mb-[8px]">Должность</p>
                            <Input className="h-[48px] rounded-[12px] text-[16px] border-[C1C7CD]" placeholder="Должность" />
                        </div>
                    </div>
                </div>

                <div className="w-full flex justify-end">
                    <Button className="h-[48px] w-[152px] rounded-[7px] bg-[#F1F3F4] text-[#2A5AB8] text-[16px]">Редактировать</Button>
                </div>
            </div>
            <div className="h-full bg-white rounded-[7px] w-full px-[40px] py-[30px]">
                <div className="w-full flex justify-between mb-[20px]">
                    <h1 className="text-[18px] font-bold text-[#21272A]">Публикации</h1>
                    <h1 className="text-[18px] font-bold text-[#2A5AB8]">Статистика</h1>
                </div>
                <NewsCard />
            </div>
        </div>
    );
};

export default ProfileEdit;
