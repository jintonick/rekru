import React, {useState} from "react";
import list from '../../imgs/list.svg'
import heart from '../../imgs/heart.svg'
import clock from '../../imgs/clock.svg'
import officebuilding from '../../imgs/office-building.svg'
import calendar from '../../imgs/calendar.svg'
import arrdown from '../../imgs/arr_down.svg'
import informationcircle from '../../imgs/information-circle.svg'
import {useAuth} from "../../auth/auth_context";

interface Company {
    name: string;
    members: number;
}

const companies: Company[] = [
    { name: 'VK Group', members: 236456 },
    { name: 'Альфа Банк', members: 153456 },
    { name: 'Тинькофф Груп', members: 276456 },
    { name: 'Одноклассники', members: 23456 },
    { name: 'Компания 5', members: 123456 },
    { name: 'Компания 6', members: 654321 },
    { name: 'Компания 7', members: 987654 },
];
function NavBar(){
    const [showAll, setShowAll] = useState(false);
    const { isLoggedIn } = useAuth();

    const displayedCompanies = showAll ? companies : companies.slice(0, 4);
    return(
        <div>
            {isLoggedIn ? (
            <div className=" w-[243px] h-[284px] flex flex-col justify-between py-[12px]">
                <button className="ml-[14px] flex justify-start items-center">
                    <img className='mr-[8px]' src={list}/>
                    <p>Мои подписки</p>
                </button>
                <button className="ml-[14px] flex justify-start items-center">
                    <img className='mr-[8px]' src={heart}/>
                    <p>Популярное</p>
                </button>
                <button className="ml-[14px] flex justify-start items-center">
                    <img className='mr-[8px]' src={clock}/>
                    <p>Новое</p>
                </button>
                <button className="ml-[14px]  flex justify-start items-center">
                    <img className='mr-[8px]' src={officebuilding}/>
                    <p>Компании</p>
                </button>
                <button className="ml-[14px]  flex justify-start items-center">
                    <img className='mr-[8px]' src={calendar}/>
                    <p>События</p>
                </button>
                <button className="ml-[14px]  flex justify-start items-center">
                    <img className='mr-[8px]' src={informationcircle}/>
                    <p>Поддержка</p>
                </button>
            </div>
                ) : (<div></div>)}
            <div className="w-[243px]  py-[12px] font-semibold">
                <h2 className="text-lg font-semibold mb-4">Вас заинтересует</h2>
                <ul>
                    {displayedCompanies.map((company, index) => (
                        <li key={index} className="mb-2 flex justify-start items-center gap-[8px]">
                            <div className="h-[40px] w-[40px] rounded-full bg-blue-600"></div>
                            <div className="flex-col flex ">
                                <span className="text-[16px] text-[#21272A]">{company.name}</span>
                                <span className="text-[12px] font-light text-[#21272A]">{company.members.toLocaleString()} участников</span>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="flex w-full justify-center">
                    <button
                        className="mt-4 text-[#21272A] flex"
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ?
                            <div className="flex flex-col items-center">
                                <h1>Показать меньше</h1>
                                <img className="rotate-180" src={arrdown}/>
                            </div>
                            :
                            <div className="flex flex-col items-center">
                                <h1>Показать больше</h1>
                                <img src={arrdown}/>
                            </div>}
                    </button>
                </div>
            </div>
            <h1 className="mt-[20px] font-bold text-[#213A8B]">Оформить подписку</h1>
        </div>
    )
}
export default NavBar;