import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JobCard from '../job/job-card';
import { useGetVacancyByIdQuery, useResponseQuery, useFilterResumeMutation } from '../../api/apiSlice';
import sparkles from '../../imgs/sparkles.svg';
import dots_horizontal from '../../imgs/dots-horizontal.svg';
import share from '../../imgs/share.svg';
import { Select, Button, message } from 'antd';
import StageList from './components/stage_list';
import { stages as initialStages } from './data3';

const { Option } = Select;

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

export interface Stage {
    id: number;
    name: string;
    candidates: Candidate[];
}

export interface Candidate {
    id: number;
    name: string;
    status: 'approved' | 'rejected' | 'pending';
}

const Interview: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: job, error, isLoading } = useGetVacancyByIdQuery(id);
    const { data: response, error: responseError, isLoading: responseLoading } = useResponseQuery(id);
    const [filterResume, { isLoading: isLoadingResumes, isError }] = useFilterResumeMutation();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [expandedResume, setExpandedResume] = useState<number | null>(null);
    const [expandedStage, setExpandedStage] = useState<number | null>(null);
    const [editingStage, setEditingStage] = useState<number | null>(null);
    const [newStageName, setNewStageName] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [stageNameEdit, setStageNameEdit] = useState<string>('');
    const [isSalaryVisible, setIsSalaryVisible] = useState(false);
    const [stages, setStages] = useState<Stage[]>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const info = () => {
        messageApi.info('Cори, эта функция очень дорогая, а у нас нет столько времени');
    };

    useEffect(() => {
        filterResume({ education: false })
            .unwrap()
            .then((result: Resume[]) => {
                setResumes(result.slice(0, 5));
                setStages([{ id: 0, name: 'Отобранные кандидаты', candidates: result.slice(0, 5).map(resume => ({ id: resume.id ?? 0, name: resume.fio, status: 'pending' })) }, ...initialStages]);
            })
            .catch((error: any) => {
                console.error('Failed to fetch resumes:', error);
            });
    }, [filterResume]);

    const toggleExpand = (index: number) => {
        setExpandedResume(expandedResume === index ? null : index);
    };

    const toggleExpandStage = (stageId: number) => {
        setExpandedStage(expandedStage === stageId ? null : stageId);
    };

    const handleCandidateStatusChange = (stageId: number, candidateId: number, status: 'approved' | 'rejected') => {
        const updatedStages = stages.map(stage => {
            if (stage.id === stageId) {
                return {
                    ...stage,
                    candidates: stage.candidates.map(candidate => {
                        if (candidate.id === candidateId) {
                            return { ...candidate, status };
                        }
                        return candidate;
                    })
                };
            }
            return stage;
        });
        setStages(updatedStages);
    };

    const handleEditStage = (stageId: number, name: string) => {
        setEditingStage(stageId);
        setStageNameEdit(name);
    };

    const handleSaveStageName = (stageId: number) => {
        const updatedStages = stages.map(stage => {
            if (stage.id === stageId) {
                return { ...stage, name: stageNameEdit };
            }
            return stage;
        });
        setStages(updatedStages);
        setEditingStage(null);
    };

    const handleAddStage = () => {
        const newStage: Stage = {
            id: stages.length + 1,
            name: newStageName,
            candidates: []
        };
        setStages([...stages, newStage]);
        setNewStageName('');
    };

    const handleDeleteStage = (stageId: number) => {
        const updatedStages = stages.filter(stage => stage.id !== stageId);
        setStages(updatedStages);
    };

    const handleFetchTopResumes = async () => {
        const resumeIds = resumes.map(resume => resume.id?.toString() ?? '').filter(id => id !== '');
        const requestData = {
            vacancy_type: 'Аналитик',
            resume_ids: resumeIds,
        };

        try {
            const response = await fetch('/get_top_resumes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Failed to fetch top resumes:', error);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading job</div>;

    return (
        <div className="w-full min-h-screen flex justify-center px-[70px] gap-[28px] my-[20px]">
            {contextHolder}
            <div className="w-full max-w-[773px] min-h-screen rounded-[12px]">
                {job && <JobCard job={job} alwaysOpen />}
                <div className="px-[30px] bg-white rounded-[12px] mt-[30px]">
                    <div className="flex w-full justify-between items-center">
                        <h2 className="font-bold text-[24px] my-[30px]">Отклики на вакансию</h2>
                        <Button
                            className="flex gap-[8px] justify-center items-center text-white text-[16px] py-[10px] px-[12px] bg-[#712AB8] h-[44px] rounded-[7px]"
                            onClick={handleFetchTopResumes}
                        >
                            <img className="mt-[5px]" src={sparkles} />
                            <h1>Отобрать лучших</h1>
                        </Button>
                    </div>
                    <div className="flex gap-[26px] mb-[20px]">
                        <Select defaultValue="Опыт работы" placeholder="Опыт работы" className="w-full h-[44px] rounded-[7px]">
                            <Option value="Неважно">Неважно</Option>
                            <Option value="От 1 года до 3 лет">От 1 года до 3 лет</Option>
                            <Option value="От 3 лет до 5 лет">От 3 лет до 5 лет</Option>
                            <Option value="Больше 5 лет">Больше 5 лет</Option>
                        </Select>
                        <Select defaultValue="Male" placeholder="Пол" className="w-full h-[44px] rounded-[7px]">
                            <Option value="Male">Мужчина</Option>
                            <Option value="Female">Женщина</Option>
                        </Select>
                        <Select defaultValue="Male" placeholder="Гибкость" className="w-full h-[44px] rounded-[7px]">
                            <Option value="Male">гибкий</Option>
                            <Option value="Female">не гибкий</Option>
                        </Select>
                        <div className="relative">
                            <button
                                className="w-full min-w-[150px] h-[44px] text-[13px] border-[1px] border-gray-300 px-[12px] bg-white rounded-[7px] focus:outline-none"
                                onClick={() => setIsSalaryVisible(!isSalaryVisible)}
                            >
                                Заработная плата
                            </button>
                            <div className={`transition-all absolute duration-500 ease-in-out ${isSalaryVisible ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                                <div className="bg-white p-4 w-[150px] border-[1px] rounded-[7px] shadow-md mt-2">
                                    <div className="flex flex-col ">
                                        <input
                                            type="text"
                                            name="salaryFrom"
                                            placeholder="От"
                                            className="w-full h-[44px] border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8] px-[12px]"
                                        />
                                        <input
                                            type="text"
                                            name="salaryTo"
                                            placeholder="До"
                                            className="w-full h-[44px] border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8] px-[12px]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {resumes.map((resume, index) => (
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
                                        {resume.workExperience?.map((work, i) => (
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
                                    {resume.skills.map((tag, i) => (
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
            </div>
            <div className="w-full max-w-[508px] h-full rounded-[12px] bg-white p-[20px]">
                <StageList
                    stages={stages}
                    expandedStage={expandedStage}
                    isEditing={isEditing}
                    editingStage={editingStage}
                    stageNameEdit={stageNameEdit}
                    newStageName={newStageName}
                    toggleExpandStage={toggleExpandStage}
                    handleEditStage={handleEditStage}
                    handleSaveStageName={handleSaveStageName}
                    handleDeleteStage={handleDeleteStage}
                    handleCandidateStatusChange={handleCandidateStatusChange}
                    setStageNameEdit={setStageNameEdit}
                    handleAddStage={handleAddStage}
                    setNewStageName={setNewStageName}
                    setIsEditing={setIsEditing}
                />
            </div>
        </div>
    );
};

export default Interview;





