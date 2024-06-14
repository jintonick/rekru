import React from 'react';
import StageComponent from './stage';
import {Button, Input} from "antd";

interface Candidate {
    id: number;
    name: string;
    status: 'approved' | 'rejected' | 'pending';
}

interface Stage {
    id: number;
    name: string;
    candidates: Candidate[];
}

interface StagesListProps {
    stages: Stage[];
    expandedStage: number | null;
    isEditing: boolean;
    editingStage: number | null;
    stageNameEdit: string;
    newStageName: string;
    toggleExpandStage: (stageId: number) => void;
    handleEditStage: (stageId: number, name: string) => void;
    handleSaveStageName: (stageId: number) => void;
    handleDeleteStage: (stageId: number) => void;
    handleCandidateStatusChange: (stageId: number, candidateId: number, status: 'approved' | 'rejected') => void;
    setStageNameEdit: (name: string) => void;
    handleAddStage: () => void;
    setNewStageName: (name: string) => void;
    setIsEditing: (isEditing: boolean) => void;
}

const StagesList: React.FC<StagesListProps> = ({
                                                   stages,
                                                   expandedStage,
                                                   isEditing,
                                                   editingStage,
                                                   stageNameEdit,
                                                   newStageName,
                                                   toggleExpandStage,
                                                   handleEditStage,
                                                   handleSaveStageName,
                                                   handleDeleteStage,
                                                   handleCandidateStatusChange,
                                                   setStageNameEdit,
                                                   handleAddStage,
                                                   setNewStageName,
                                                   setIsEditing
                                               }) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-[28px] font-bold">Этапы отбора</h2>
                <Button className="px-[20px] h-[44px] py-[10px] text-[16px] text-white bg-[#2A5AB8] rounded-[7px]" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? 'Сохранить' : 'Редактировать'}
                </Button>
            </div>
            <StageComponent
                key={stages[0].id}
                stage={stages[0]}
                expandedStage={expandedStage}
                isEditing={false}
                editingStage={editingStage}
                stageNameEdit={stageNameEdit}
                toggleExpandStage={toggleExpandStage}
                handleEditStage={handleEditStage}
                handleSaveStageName={handleSaveStageName}
                handleDeleteStage={handleDeleteStage}
                handleCandidateStatusChange={handleCandidateStatusChange}
                setStageNameEdit={setStageNameEdit}
            />
            {stages.slice(1).map(stage => (
                <StageComponent
                    key={stage.id}
                    stage={stage}
                    expandedStage={expandedStage}
                    isEditing={isEditing}
                    editingStage={editingStage}
                    stageNameEdit={stageNameEdit}
                    toggleExpandStage={toggleExpandStage}
                    handleEditStage={handleEditStage}
                    handleSaveStageName={handleSaveStageName}
                    handleDeleteStage={handleDeleteStage}
                    handleCandidateStatusChange={handleCandidateStatusChange}
                    setStageNameEdit={setStageNameEdit}
                />
            ))}
            {isEditing && (
                <div className="mt-[20px] flex gap-[10px]">
                    <Input
                        placeholder="Название нового этапа"
                        value={newStageName}
                        onChange={e => setNewStageName(e.target.value)}
                    />
                    <Button className='bg-[#2A5AB8] text-white px-[12px] py-[10px] h-[44px]' onClick={handleAddStage}>
                        Добавить этап
                    </Button>
                </div>
            )}
        </div>
    );
}

export default StagesList;



