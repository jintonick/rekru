// ./src/ResumeListing.tsx
import React, { useState, useEffect } from 'react';
import {Button, Checkbox, message, Pagination, Radio, Select} from 'antd';
import { useFilterResumeMutation } from '../../api/apiSlice';
import search_gray from '../../imgs/search_gray.svg';
import share from '../../imgs/share.svg';
import dots_horizontal from '../../imgs/dots-horizontal.svg';

interface WorkExperience {
    position?: string;
    address?: string;
    description?: string;
    period?: string;
}

interface Resume {
    id?: number;
    fio: string;
    position: string;
    gender: number;
    address: string;
    birth_date: string;
    phone: string;
    salary_from: number;
    salary_to: number;
    education: string;
    skills: string[];
    nationality: string;
    disabilities: boolean;
    workExperience?: WorkExperience[];
}

const ResumeListing: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedResume, setExpandedResume] = useState<number | null>(null);
    const resumesPerPage = 5;
    const [filteredResumes, setFilteredResumes] = useState<Resume[]>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const info = () => {
        messageApi.info('Cори, эта функция очень дорогая, а у нас нет столько времени');
    };
    const paginatedResumes = filteredResumes.slice(
        (currentPage - 1) * resumesPerPage,
        currentPage * resumesPerPage
    );

    const [filterResume, { isLoading, isError }] = useFilterResumeMutation();

    useEffect(() => {
        // Вызовите мутацию для фильтрации резюме
        filterResume({ education: false })
            .unwrap()
            .then((result: Resume[]) => {
                setFilteredResumes(result); // Предполагается, что результат - это массив резюме
            })
            .catch((error: any) => {
                console.error('Failed to fetch resumes:', error);
            });
    }, [filterResume]);

    const toggleExpand = (index: number) => {
        setExpandedResume(expandedResume === index ? null : index);
    };

    return (
        <div className="w-full flex justify-center mb-[80px]">
            {contextHolder}
            <div className="w-full flex justify-between gap-[20px] max-w-[1440px] px-[70px] text-[16px]">
                <div className="bg-white w-full max-w-[307px] h-full rounded-[12px] p-[20px]">
                    <div className="mb-[20px]">
                        <h3 className="font-bold">Регион</h3>
                        <div className="flex justify-between items-center mr-[10px] h-[32px] border-[#DBDBDB] border-[1px] rounded-[5px] my-[14px]">
                            <input className="h-full w-full rounded-[5px]"/>
                            <button className="m-[10px]">
                                <img src={search_gray}/>
                            </button>
                        </div>
                        <ul>
                            <li className="flex items-center"><Checkbox className="border-[#DBDBDB] mr-[8px]" type="checkbox" id="region1" name="region1" /><label htmlFor="region1">Москва и Московская область</label></li>
                            <li className="flex items-center"><Checkbox className="border-[#DBDBDB] mr-[8px] " type="checkbox" id="region2" name="region2" /><label htmlFor="region2">Санкт-Петербург</label></li>
                            <li className="flex items-center"><Checkbox className=" border-[#DBDBDB] mr-[8px] " type="checkbox" id="region3" name="region3" /><label htmlFor="region3">Казань</label></li>
                            <li className="flex items-center"><Checkbox className=" border-[#DBDBDB] mr-[8px] " type="checkbox" id="region4" name="region4" /><label htmlFor="region4">Владимир</label></li>
                            <li className="flex items-center"><Checkbox className=" border-[#DBDBDB] mr-[8px]" type="checkbox" id="region5" name="region5" /><label htmlFor="region5">Астрахань</label></li>
                        </ul>
                    </div>
                    <div className="mb-[20px]">
                        <h3 className="font-bold">Специальность</h3>
                        <div className="flex justify-between items-center mr-[10px] h-[32px] border-[#DBDBDB] border-[1px] rounded-[5px] my-[14px]">
                            <input className="h-full w-full rounded-[5px]"/>
                            <button className="m-[10px]">
                                <img src={search_gray}/>
                            </button>
                        </div>
                        <ul>
                            <li className="flex items-center"><Checkbox className="border-[#DBDBDB] mr-[8px]" type="checkbox" id="speciality1" name="speciality1" /><label htmlFor="speciality1">Менеджер</label></li>
                            <li className="flex items-center"><Checkbox className="border-[#DBDBDB] mr-[8px]" type="checkbox" id="speciality2" name="speciality2" /><label htmlFor="speciality2">Курьер</label></li>
                            <li className="flex items-center"><Checkbox className="border-[#DBDBDB] mr-[8px]" type="checkbox" id="speciality3" name="speciality3" /><label htmlFor="speciality3">Инженер</label></li>
                            <li className="flex items-center"><Checkbox className="border-[#DBDBDB] mr-[8px]" type="checkbox" id="speciality4" name="speciality4" /><label htmlFor="speciality4">Повар</label></li>
                            <li className="flex items-center"><Checkbox className="border-[#DBDBDB] mr-[8px]" type="checkbox" id="speciality5" name="speciality5" /><label htmlFor="speciality5">Архитектор</label></li>
                        </ul>
                    </div>
                    <div className="mb-[20px]">
                        <h3 className="font-bold mb-[14px]">Пол</h3>
                        <ul>
                            <li className="flex items-center "><Radio className="h-[16px] w-[16px] mr-[10px]" type="radio" id="male" name="gender" /><label htmlFor="male">Мужской</label></li>
                            <li className="flex items-center"><Radio className="h-[16px] w-[16px] mr-[10px]" type="radio" id="female" name="gender" /><label htmlFor="female">Женский</label></li>
                            <li className="flex items-center"><Radio className="h-[16px] w-[16px] mr-[10px]" type="radio" id="any" name="gender" /><label htmlFor="any">Неважно</label></li>
                        </ul>
                    </div>
                    <div className="mb-[20px]">
                        <h3 className="font-bold mb-2">Опыт работы</h3>
                        <ul>
                            <li className="flex items-center"><Radio className="h-[16px] w-[16px] mr-[10px]" type="radio" id="experience1" name="experience" /><label htmlFor="experience1">Неважно</label></li>
                            <li className="flex items-center"><Radio className="h-[16px] w-[16px] mr-[10px]" type="radio" id="experience2" name="experience" /><label htmlFor="experience2">От 1 года до 3 лет</label></li>
                            <li className="flex items-center"><Radio className="h-[16px] w-[16px] mr-[10px]" type="radio" id="experience3" name="experience" /><label htmlFor="experience3">От 3 лет до 5 лет</label></li>
                            <li className="flex items-center"><Radio className="h-[16px] w-[16px] mr-[10px]" type="radio" id="experience4" name="experience" /><label htmlFor="experience4">Больше 5 лет</label></li>
                        </ul>
                    </div>
                    <div className="mb-[20px]">
                        <h3 className="font-bold mb-2">Готовность к переезду</h3>
                        <ul>
                            <li className="flex items-center"><Radio className="h-[16px] w-[16px] mr-[10px]" type="radio" id="relocation1" name="relocation" /><label htmlFor="relocation1">Не готов</label></li>
                            <li className="flex items-center"><Radio className="h-[16px] w-[16px] mr-[10px]" type="radio" id="relocation2" name="relocation" /><label htmlFor="relocation2">Готов внутри страны</label></li>
                            <li className="flex items-center"><Radio className="h-[16px] w-[16px] mr-[10px]" type="radio" id="relocation3" name="relocation" /><label htmlFor="relocation3">Готов по всему миру</label></li>
                        </ul>
                    </div>
                    <div className="mb-[20px]">
                        <h3 className="font-bold mb-2">Образование</h3>
                        <ul>
                            <li className="flex items-center"><Radio className="h-[16px] w-[16px] mr-[10px]" type="radio" id="education1" name="education" /><label htmlFor="education1">Больше одного высшего</label></li>
                            <li className="flex items-center"><Radio className="h-[16px] w-[16px] mr-[10px]" type="radio" id="education2" name="education" /><label htmlFor="education2">Неоконченное высшее</label></li>
                            <li className="flex items-center"><Radio className="h-[16px] w-[16px] mr-[10px]" type="radio" id="education3" name="education" /><label htmlFor="education3">Среднее специальное</label></li>
                            <li className="flex items-center"><Radio className="h-[16px] w-[16px] mr-[10px]" type="radio" id="education4" name="education" /><label htmlFor="education4">Среднее</label></li>
                            <li className="flex items-center"><Radio className="h-[16px] w-[16px] mr-[10px]" type="radio" id="education5" name="education" /><label htmlFor="education5">Неважно</label></li>
                        </ul>
                    </div>
                </div>
                <div className="h-full bg-white min-h-screen w-full rounded-[12px] py-[30px]">
                    <header className="px-[30px]">
                        <div className="flex gap-[8px] items-end mb-[20px]">
                            <h1 className="text-[28px] font-bold">Лучшие специалисты</h1>
                            <p className="text-[#777777] mb-[5px]">на момент 4.06.24</p>
                        </div>
                        <div className="max-w-[764px] w-full flex gap-[10px]">
                            <input
                                type="text"
                                placeholder="Иван Иванов или Маркетолог 2 года опыта Москва офис"
                                className="w-full h-[44px] px-4 py-[8px] bg-[#F7F7F7] rounded-[7px]"
                            />
                            <button className="h-[44px] w-[83px] bg-[#2A5AB8] text-white rounded-[7px]" onClick={info}>
                                Поиск
                            </button>
                        </div>
                    </header>
                    <div className="flex justify-start text-[#777777] gap-[30px] my-[10px] px-[30px]">
                        <Select
                            defaultValue="1"
                            style={{ width: 170 }}
                            className="border-none"
                            options={[
                                { value: '1', label: 'За всё время' },
                                { value: '2', label: 'Последние 24 часа' },
                                { value: '3', label: 'Последние 7 дней' },
                                { value: '4', label: 'Последний месяц' },
                            ]}
                        />
                        <Select
                            defaultValue="1"
                            style={{ width: 140 }}
                            className="border-none"
                            options={[
                                { value: '1', label: 'Популярные' },
                                { value: '2', label: 'Недавние' },
                            ]}
                        />
                    </div>
                    <div className="min-h-screen flex flex-col justify-between">
                        <div>
                            {paginatedResumes.map((resume, index) => (
                                <div key={resume.id} className="bg-white border-t-[#DBDBDB] border-t-[1px]">
                                    <div className="px-[30px] py-[20px]">
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-[14px] text-[#BBBBBB]">{`пол ${resume.gender}`}</h2>
                                            <div className="flex gap-[10px]">
                                                <img src={share} alt="Share" />
                                                <img src={dots_horizontal} alt="More" />
                                            </div>
                                        </div>
                                        <div className="flex justify-start items-center gap-[8px]">
                                            <h2 className="text-[22px] font-bold">{resume.fio}</h2>
                                            <span className="text-[#BBBBBB] mt-[5px]">10 лет</span>
                                        </div>
                                        <h3 className="text-[20px] mb-[30px]">{resume.position}</h3>
                                        {expandedResume === index && (
                                            <div className="mb-[30px]">
                                                <h4 className="font-bold">Опыт работы</h4>
                                                {resume?.workExperience?.map((work, i) => (
                                                    <div key={i} className="mt-2">
                                                        <h5 className="font-semibold">{work.position}</h5>
                                                        <p className="text-[#777777]">{work.address}</p>
                                                        <p className="text-[#777777]">2 года</p>
                                                        <p>{work.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <div className="text-[#777777] mb-[30px]">{resume.education}</div>
                                        <div className="flex flex-wrap gap-[10px] my-[30px]">
                                            {resume?.skills?.map((tag, i) => (
                                                <span key={i} className="bg-[#F7F7F7] px-[12px] py-[10px] rounded-[5px]">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="flex gap-[15px]">
                                                <button className="w-[118px] h-[44px] text-white bg-[#2A5AB8] rounded-[7px]" onClick={info}>Написать</button>
                                                <button className="w-[95px] h-[44px] bg-[#DBDBDB] rounded-[7px]" onClick={info}>Сохранить</button>
                                            </div>
                                            <Button
                                                type="link"
                                                onClick={() => toggleExpand(index)}
                                                className="mt-4 text-[#2A5AB8] text-[16px]"
                                            >
                                                {expandedResume === index ? 'Свернуть' : 'Развернуть'}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="w-full justify-center flex">
                            <Pagination
                                current={currentPage}
                                pageSize={resumesPerPage}
                                total={filteredResumes.length}
                                onChange={page => setCurrentPage(page)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeListing;

