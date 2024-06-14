import React from 'react';
import StageComponent from './stage';
import { Stage, Candidate } from './interview';
import { Button, Input } from 'antd';

interface StageListProps {
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
}

const StageList: React.FC<StageListProps> = ({
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
                                                 setNewStageName
                                             }) => {
    return (
        <>
            {stages.map((stage, index) => (
                <div key={stage.id}>
                    <StageComponent
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
                </div>
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
        </>
    );
}

export default StageList;
