import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import JobCard from '../job/job-card';
import { useGetVacancyByIdQuery } from '../../api/apiSlice';
import { resumes } from '../specialists/data2';
import lightning_bolt from '../../imgs/lightning-bolt.svg';
import { stages as initialStages } from './data3';
import { Button, Input } from 'antd';
import ResumeCard from './components/resume_card';
import StageList from './components/stage_list';

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

    const [expandedResume, setExpandedResume] = useState<number | null>(null);
    const [expandedStage, setExpandedStage] = useState<number | null>(null);
    const [stages, setStages] = useState<Stage[]>([{ id: 0, name: 'Отобранные кандидаты', candidates: resumes.map(resume => ({ id: resume.age, name: resume.name, status: 'pending' })) }, ...initialStages]);
    const [editingStage, setEditingStage] = useState<number | null>(null);
    const [newStageName, setNewStageName] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [stageNameEdit, setStageNameEdit] = useState<string>('');

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

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading job</div>;

    return (
        <div className="w-full min-h-screen flex justify-center px-[70px] gap-[28px] my-[20px]">
            <div className="w-full max-w-[773px] min-h-screen rounded-[12px] bg-white ">
                {job && <JobCard job={job} alwaysOpen />}
                <div className="px-[30px] bg-white rounded-[12px]">
                    <div className="flex w-full justify-between items-center">
                        <h2 className="font-bold text-[24px] my-[30px]">Отклики на вакансию</h2>
                        <button className="flex gap-[8px] justify-center items-center text-white py-[10px] px-[12px] bg-[#712AB8] h-[44px] rounded-[7px]">
                            <h1>Отобрать лучших</h1>
                            <img src={lightning_bolt} />
                        </button>
                    </div>
                    {resumes.map((resume, index) => (
                        <ResumeCard
                            key={index}
                            resume={resume}
                            index={index}
                            expandedResume={expandedResume}
                            toggleExpand={toggleExpand}
                        />
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
}

export default Interview;



