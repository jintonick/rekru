import React, { useState, useEffect } from "react";
import { Pagination, Badge, Calendar, Modal, Button } from "antd";
import type { BadgeProps, CalendarProps } from 'antd';
import { useFilterVacanciesMutation } from '../../api/apiSlice';
import calendar_white from '../../imgs/calendar_white.svg';
import { Link } from "react-router-dom";
import type { Dayjs } from 'dayjs';
import plus_white from '../../imgs/plus_white.svg';
import arrow_down_gray from '../../imgs/arrow_down_gray.svg';
import './job_style.css';

type JobCategory = "active" | "draft" | "archive";

const getListData = (value: Dayjs) => {
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                { type: 'warning', content: 'This is warning event.' },
                { type: 'success', content: 'This is usual event.' },
            ];
            break;
        case 10:
            listData = [
                { type: 'warning', content: 'This is warning event.' },
                { type: 'success', content: 'This is usual event.' },
                { type: 'error', content: 'This is error event.' },
            ];
            break;
        case 15:
            listData = [
                { type: 'warning', content: 'This is warning event' },
                { type: 'success', content: 'This is very long usual event......' },
                { type: 'error', content: 'This is error event 1.' },
                { type: 'error', content: 'This is error event 2.' },
                { type: 'error', content: 'This is error event 3.' },
                { type: 'error', content: 'This is error event 4.' },
            ];
            break;
        default:
    }
    return listData || [];
};

const getMonthData = (value: Dayjs) => {
    if (value.month() === 8) {
        return 1394;
    }
};

type Vacancy = {
    id: number;
    name: string;
    city: string;
    salary_from: number;
    salary_to: number;
    skills: string[];
    experience: number;
    address: string;
    description: string;
    employment_type: number;
};

function JobAdmin() {
    const [sortField, setSortField] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<JobCategory>("active");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortKey, setSortKey] = useState("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [jobs, setJobs] = useState<Vacancy[]>([]);
    const [filterVacancies, { isLoading, data }] = useFilterVacanciesMutation();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await filterVacancies({ "salary_from": 100000, archived: false }).unwrap();
                setJobs(response.vacancies);
            } catch (error) {
                console.error('Ошибка при получении вакансий:', error);
            }
        };

        fetchJobs();
    }, [filterVacancies]);

    const monthCellRender = (value: Dayjs) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type as BadgeProps['status']} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };

    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const sortedJobs = [...jobs].sort((a, b) => {
        if (!sortKey) return 0;
        if (sortOrder === "asc") {
            return a[sortKey as keyof Vacancy] > b[sortKey as keyof Vacancy] ? 1 : -1;
        } else {
            return a[sortKey as keyof Vacancy] < b[sortKey as keyof Vacancy] ? 1 : -1;
        }
    });

    const jobsPerPage = 5;
    const paginatedJobs = sortedJobs.slice(
        (currentPage - 1) * jobsPerPage,
        currentPage * jobsPerPage
    );

    const handleSort = (key: string) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortOrder("asc");
        }
        setSortField(key);
    };

    const categories = [
        { label: "Активные", key: "active" as JobCategory, count: jobs.length },
        { label: "Черновик", key: "draft" as JobCategory, count: 0 },
        { label: "Архив", key: "archive" as JobCategory, count: 0 },
    ];

    return (
        <div className="w-full min-h-screen flex justify-center">
            <div className="w-full max-w-[1440px] px-[70px]">
                <header className=" flex justify-start gap-[10px] items-end mt-[30px]">
                    <h1 className="text-[28px] font-bold">Ваши вакансии</h1>
                    <span className="text-[#777777] mb-[4px]">последние изменения 16:35 4.06.24</span>
                </header>
                <div className="h-full mt-[30px] rounded">
                    <div className="flex justify-between mb-[30px]">
                        <div className="flex justify-start gap-[15px]">
                            {categories.map(({ label, key, count }) => (
                                <button
                                    key={key}
                                    onClick={() => setSelectedCategory(key)}
                                    className={`animated-button px-[12px] py-[10px] flex rounded-[7px] ${
                                        selectedCategory === key ? "bg-[#2A5AB8] text-white" : "bg-[#DBDBDB] text-gray-600"
                                    }`}
                                >
                                    <div className={`w-[24px] h-[24px] font-bold mr-[8px] rounded-full ${
                                        selectedCategory === key ? "bg-white text-[#2A5AB8]" : "bg-[#ECECEC] text-[#777777]"
                                    }`}>
                                        {count >= 9 ? (<div>9+</div>) : <div>{count}</div>}
                                    </div>
                                    <h1 >{label}</h1>
                                </button>
                            ))}
                        </div>
                        <div className="flex">
                            <Link to={'/job/new_job/'} className="animated-button flex px-[12px] py-[10px] bg-[#2A5AB8] text-white rounded-[7px]">
                                <img src={plus_white} className="mr-2" />
                                Добавить вакансию
                            </Link>
                            <button className="animated-button px-[12px] py-[10px] ml-[15px] bg-[#2A5AB8] text-white rounded-[7px] flex" onClick={showModal}>
                                <img className="fill-white mr-[8px]" src={calendar_white}/>
                                Календарь
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between text-[#777777] font-semibold px-[40px] py-[20px] border-b-[1px] border-b-[#BBBBBB] border-t-[1px] border-t-[#BBBBBB]">
                        <div className="">Название вакансии</div>
                        <div className="sortable-header" onClick={() => handleSort("lastUpdated")}>
                            Дата изменения
                            <img
                                src={arrow_down_gray}
                                alt="Sort"
                                className={`w-[24px] h-[24px] ${sortField === "lastUpdated" ? (sortOrder === "asc" ? "rotate-0" : "rotate-180") : ""}`}
                            />
                        </div>
                        <div className="sortable-header ml-[60px] mr-[20px]" onClick={() => handleSort("status")}>
                            Статус
                            <img
                                src={arrow_down_gray}
                                alt="Sort"
                                className={`w-[24px] h-[24px] ${sortField === "status" ? (sortOrder === "asc" ? "rotate-0" : "rotate-180") : ""}`}
                            />
                        </div>
                        <div className="sortable-header mr-[100px]" onClick={() => handleSort("applicants")}>
                            Отклики
                            <img
                                src={arrow_down_gray}
                                alt="Sort"
                                className={`w-[24px] h-[24px] ${sortField === "applicants" ? (sortOrder === "asc" ? "rotate-0" : "rotate-180") : ""}`}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-[15px] h-[670px] pt-[20px]">
                        {paginatedJobs.map((job, index) => (
                            <div key={job.id} className="bg-white flex justify-between items-center truncate h-[117px] px-[40px] py-[20px] rounded-[10px] border-b">
                                <div className="flex flex-col text-[16px] text-[#777777]">
                                    <h2 className="font-bold text-[22px] text-black truncate">{job.name}</h2>
                                    <p className="truncate">{job.city}</p>
                                    <p className="mt-[20px] truncate">{`${job.salary_from} - ${job.salary_to}`}</p>
                                </div>
                                <div>2024.06.29</div>
                                <div>Активен</div>
                                <Button type="link">
                                    <Link className="text-[#2A5AB8] text-[16px] truncate" to={`/interview/${job.id}`}>
                                        Перейти к подбору кандидатов
                                    </Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                    <div className="pt-[5px] mb-[5px]">
                        {jobs.length > 5 ? (
                            <Pagination
                                current={currentPage}
                                pageSize={jobsPerPage}
                                total={jobs.length}
                                onChange={page => setCurrentPage(page)}
                            />
                        ) : (<div></div>)}
                    </div>
                </div>
            </div>
            <Modal title="Календарь" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} className="w-[1000px]" width={1200}>
                <Calendar cellRender={cellRender} />
            </Modal>
        </div>
    );
}

export default JobAdmin;


