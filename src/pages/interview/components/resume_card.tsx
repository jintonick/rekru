import React from 'react';
import { Resume } from '../../specialists/data2';
import share from '../../../imgs/share.svg';
import dots_horizontal from '../../../imgs/dots-horizontal.svg';
import {Button} from "antd";

interface ResumeCardProps {
    resume: Resume;
    index: number;
    expandedResume: number | null;
    toggleExpand: (index: number) => void;
}

const ResumeCard: React.FC<ResumeCardProps> = ({ resume, index, expandedResume, toggleExpand }) => {
    return (
        <div key={index} className="bg-white border-t-[#DBDBDB] border-t-[1px] pb-[5px] pt-[10px]">
            <div className="">
                <div className="flex justify-between items-center">
                    <h2 className="text-[14px] text-[#BBBBBB]">{resume.datePosted}</h2>
                    <div className="flex gap-[10px]">
                        <img src={share} alt="Share" />
                        <img src={dots_horizontal} alt="More" />
                    </div>
                </div>
                <div className="flex justify-start items-center gap-[8px]">
                    <h2 className="text-[22px] font-bold">{resume.name}</h2>
                    <span className="text-[#BBBBBB] mt-[5px]">{resume.age} лет</span>
                </div>
                <h3 className="text-[20px] mb-[30px]">{resume.title}</h3>
                <div className={`overflow-hidden transition-max-height duration-300 ${expandedResume === index ? 'max-h-screen' : 'max-h-0'}`}>
                    {expandedResume === index && (
                        <div className="mb-[30px]">
                            <h4 className="font-bold">Опыт работы</h4>
                            {resume.workExperience.map((work, i) => (
                                <div key={i} className="mt-2">
                                    <h5 className="font-semibold">{work.position}</h5>
                                    <p className="text-[#777777]">{work.company}</p>
                                    <p className="text-[#777777]">{work.period}</p>
                                    <p>{work.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="text-[#777777] mb-[30px]">{resume.experience}</div>
                <div className="flex flex-wrap gap-[10px] my-[30px]">
                    {resume.tags.map((tag, i) => (
                        <span key={i} className="bg-[#F7F7F7] px-[12px] py-[10px] rounded-[5px]">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="flex justify-between items-center mb-[20px]">
                    <div className="flex gap-[15px]">
                        <button className="px-[12px] py-[10px] h-[44px] text-white bg-[#2A5AB8] rounded-[7px]">Пригласить на первый этап</button>
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
    );
}

export default ResumeCard;
