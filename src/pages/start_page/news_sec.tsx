import React from "react";
import smile from '../imgs/smile.svg'
import copy from '../imgs/copy.svg'
import pizza from '../imgs/pizza.svg'
import linkedin from '../imgs/linkedin.svg'
import twitter from '../imgs/twitter.svg'
import instagram from '../imgs/instagram.svg'
import facebook from '../imgs/facebook.svg'
import people from '../imgs/people.svg'
import Phone from '../imgs/Phone.svg'
import darrel from '../imgs/darrel.png'
import savan from '../imgs/savan.png'
import dianne from '../imgs/dianne.png'
import kristin from '../imgs/kristin.png'

const data =[
        {
            name: 'Darrell Steward',
            role: 'UI Designer & Co-founder',
            image: darrel,
            social: ['linkedin', 'twitter', 'facebook'],
        },
        {
            name: 'Savannah Nguyen',
            role: 'UX Designer & Co-founder',
            image: savan,
            social: ['linkedin', 'twitter', 'facebook'],
        },
        {
            name: 'Dianne Russell',
            role: 'Developer',
            image: dianne,
            social: ['linkedin', 'twitter', 'facebook'],
        },
        {
            name: 'Kristin Watson',
            role: 'Sr. Product Designer',
            image: kristin,
            social: ['linkedin', 'twitter', 'facebook'],
        },
]
const NewsSec: React.FC = () => {
    return (
        <div className="min-h-screen px-[80px] text-[#21272A]">
            <section className="text-center mb-[80px]">
                <h1 className="text-[42px] font-bold mb-[48px]">Лучшие специалисты и эффективная алгоритимизация</h1>
                <p className=" mb-[48px] text-[18px]">
                    Rhoncus morbi at augue nec, in id ullamcorper at sit. Condimentum sit nunc in eros scelerisque sed.
                </p>
                <div className="flex justify-between h-[80px] gap-[24px]">
                    <div className="flex justify-start items-center text-start bg-white w-full p-[16px]">
                        <img src={smile}/>
                        <div className="ml-[16px]">
                            <p className="text-[24px] font-bold">250 тыс.+</p>
                            <p className="text-gray-600">Удаленных соглашений</p>
                        </div>
                    </div>
                    <div className="flex justify-start items-center text-start bg-white w-full p-[16px]">
                        <img src={copy}/>
                        <div className="ml-[16px]">
                            <p className="text-2xl font-bold">600+</p>
                            <p className="text-gray-600">Заявок в день</p>
                        </div>
                    </div>
                    <div className="flex justify-start items-center text-start bg-white w-full p-[16px]">
                        <img src={pizza}/>
                        <div className="ml-[16px]">
                            <p className="text-2xl font-bold">1.8K+</p>
                            <p className="text-gray-600">Отзывов в день</p>
                        </div>
                    </div>
                    <div className="flex justify-start items-center text-start bg-white w-full p-[16px]">
                        <img src={people}/>
                        <div className="ml-[16px]">
                            <p className="text-2xl font-bold">11K+</p>
                            <p className="text-gray-600">В среднем у пользователя</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mb-[80px]">
                <h2 className="text-3xl font-bold text-center mb-8">Топ лучших специалистов</h2>
                <div className="flex justify-between gap-[16px]">
                    {data.map((person, index) => (
                        <div key={index} className="text-center">
                            <img
                                src={person.image}
                                className="w-[308px] h-[303px] bg-[#2A5AB8] mb-[20px]"
                            />
                            <h3 className="text-[18px]">{person.name}</h3>
                            <p className="text-[#697077] text-[18px]">{person.role}</p>
                            <div className="flex justify-center space-x-2">
                                {person.social.map((network, idx) => (
                                    <a key={idx} href="#" className="text-blue-600">
                                        <i className={`fab fa-${network}`}></i>
                                    </a>
                                ))}
                            </div>
                            <div className="w-full flex justify-center mt-[22px]">
                                <div className="w-full max-w-[144px] flex justify-between">
                                    <button><img src={linkedin}/></button>
                                    <button><img src={twitter}/></button>
                                    <button><img src={instagram}/></button>
                                    <button><img src={facebook}/></button>
                                </div>
                            </div>
                            <div className="w-full flex justify-center">
                                <button className="mt-[15px] py-[16px] h-[48px] w-[180px] border-[#2A5AB8] border-[2px] text-[#2A5AB8] flex items-center justify-center">
                                    <h1 className="font-medium">Contact {person.name.split(' ')[0]}</h1>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <section className="flex gap-[80px]">
                <div className="px-[76px] max-w-[526px] w-full">
                    <img src={Phone}/>
                </div>
                <div>
                    <h2 className="text-[54px] font-bold my-[80px]">Скачивайте приложение</h2>
                    <p className="mb-[80px] text-[18px]">
                        Nec massa viverra eget feugiat pellentesque. Feugiat adipiscing massa vitae auctor mi massa. Sodales libero viverra cursus sed duis luctus nulla. In malesuada vulputate pharetra ipsum orci.
                    </p>
                    <div className="flex justify-start space-x-4">
                        <a href="#" className="bg-black text-white px-4 py-2 rounded">App Store</a>
                        <a href="#" className="bg-black text-white px-4 py-2 rounded">Google Play</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NewsSec;
