import React, { useState } from 'react';
import share from '../../imgs/share.svg';
import dots_horizontal from '../../imgs/dots-horizontal.svg';
import {Job} from './data'

interface JobCardProps {
    job: Job;
    alwaysOpen?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, alwaysOpen = false }) => {
    const [isOpen, setIsOpen] = useState(alwaysOpen);

    return (
        <div className="bg-white px-[30px] py-[20px] rounded-[10px]">
            <div className="flex justify-between items-center">
                <h2 className="text-[14px] text-[#BBBBBB]">{job.lastUpdated}</h2>
                <div className="flex gap-[10px]">
                    <img src={share} alt="Share" />
                    <img src={dots_horizontal} alt="More" />
                </div>
            </div>
            <h2 className="text-[22px] font-bold">{job.title}</h2>
            <div className="text-[20px] mb-[30px]">{job.salary}</div>
            <div className="text-[#777777]">{job.location}</div>
            {isOpen && (
                <div className="my-[20px]">
                    <div className="flex items-center jusify-start h-full w-full gap-[12px]">
                        <div className="w-[64px] h-[64px] bg-[#2A5AB8] rounded-full">

                        </div>
                        <div className="h-full">
                            <h4 className="font-bold">{job.companyName}</h4>
                            <div className="flex items-center">
                                <span className="text-red-500">Отзывы {job.reviews}</span>
                                <span className="text-yellow-500 ml-2">⭐ {job.rating}</span>
                            </div>
                        </div>
                    </div>
                    <p className="mt-[20px]">{job.description}</p>
                </div>
            )}
            <div className="flex flex-wrap gap-[10px] my-[30px]">
                {job.requiredSkills.map((skill: string, i:number) => (
                    <span key={i} className="bg-[#F7F7F7] px-[12px] py-[10px] rounded-[5px]">
                        {skill}
                    </span>
                ))}
            </div>
            <div className="w-full flex justify-between items-center">
                {alwaysOpen ?
                <div className="flex justify-between w-full gap-[15px]">
                    <div className="flex gap-[15px]">
                        <button className="h-[44px] py-[10px] px-[12px] text-white bg-[#2A5AB8] rounded-[7px]">Отредактировать</button>
                        <button className="py-[10px] px-[12px]  h-[44px] bg-[#DBDBDB] rounded-[7px]">Архивировать</button>
                        <button className="py-[10px] px-[12px]  h-[44px] bg-[#DBDBDB] rounded-[7px]">Сохранить</button>
                    </div>
                    <div>
                        <button className="w-[95px] h-[44px] bg-[#B82A2A] rounded-[7px] text-white">Удалить</button>
                    </div>
                </div>
                    :
                <div className="flex gap-[15px]">
                    <button className="w-[118px] h-[44px] text-white bg-[#2A5AB8] rounded-[7px]">Откликнуться</button>
                    <button className="w-[95px] h-[44px] bg-[#DBDBDB] rounded-[7px]">Сохранить</button>
                </div>
                }
                {alwaysOpen ? (<div></div>) :
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="mt-4 text-blue-600"
                    >
                        {isOpen ? 'Свернуть' : 'Развернуть'}
                    </button>
                }
            </div>
        </div>
    );
};

export default JobCard;
