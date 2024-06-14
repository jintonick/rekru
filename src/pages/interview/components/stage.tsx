import React from 'react';
import { Button, Input } from 'antd';
import { EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import arrow_down from '../../../imgs/arrow_down.svg';
import arrow_up from '../../../imgs/arrow_up.svg';

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

interface StageComponentProps {
    stage: Stage;
    expandedStage: number | null;
    isEditing: boolean;
    editingStage: number | null;
    stageNameEdit: string;
    toggleExpandStage: (stageId: number) => void;
    handleEditStage: (stageId: number, name: string) => void;
    handleSaveStageName: (stageId: number) => void;
    handleDeleteStage: (stageId: number) => void;
    handleCandidateStatusChange: (stageId: number, candidateId: number, status: 'approved' | 'rejected') => void;
    setStageNameEdit: (name: string) => void;
}

const StageComponent: React.FC<StageComponentProps> = ({
                                                           stage,
                                                           expandedStage,
                                                           isEditing,
                                                           editingStage,
                                                           stageNameEdit,
                                                           toggleExpandStage,
                                                           handleEditStage,
                                                           handleSaveStageName,
                                                           handleDeleteStage,
                                                           handleCandidateStatusChange,
                                                           setStageNameEdit
                                                       }) => {
    return (
        <div>
            <div className="flex justify-between items-center border-b-[#DBDBDB] border-b-[1px] py-[20px]">
                {editingStage === stage.id ? (
                    <div className="flex items-center gap-2">
                        <Input
                            value={stageNameEdit}
                            onChange={e => setStageNameEdit(e.target.value)}
                            autoFocus
                        />
                        <Button className="border-none shadow-none" icon={<CheckOutlined />} onClick={() => handleSaveStageName(stage.id)} />
                        <Button className="border-none shadow-none" icon={<CloseOutlined />} onClick={() => setStageNameEdit('')} />
                    </div>
                ) : (
                    <div className="flex gap-[8px] items-end">
                        <h3 className="text-[20px] font-bold flex gap-[8px]">{stage.name}</h3>
                        {!isEditing ? (
                            <h3 className="text-[14px] text-[#C4C4C4] mb-[2px]">{stage.candidates.length} кандидатов</h3>
                        ) : (
                            <div></div>
                        )}
                    </div>
                )}
                {isEditing ? (
                    <div className="flex">
                        <Button className="border-none shadow-none" icon={<EditOutlined />} onClick={() => handleEditStage(stage.id, stage.name)} />
                        {stage.id !== 0 && (
                            <Button className="border-none shadow-none" icon={<CloseOutlined />} onClick={() => handleDeleteStage(stage.id)} />
                        )}
                    </div>
                ) : (
                    <button onClick={() => toggleExpandStage(stage.id)} className="w-[20px] h-[20px] transition-transform duration-300">
                        {expandedStage === stage.id ? <img src={arrow_up} alt="Up Arrow" /> : <img src={arrow_down} alt="Down Arrow" />}
                    </button>
                )}
            </div>
            {!isEditing && (
                <div className={`overflow-hidden transition-max-height duration-300 ${expandedStage === stage.id ? 'max-h-screen' : 'max-h-0'}`}>
                    {stage.candidates.map(candidate => (
                        <div key={candidate.id} className="flex justify-between items-center border-t-[1px] py-[10px]">
                            <div className="flex items-center gap-[10px]">
                                <div className="w-[44px] h-[44px] rounded-full bg-[#9CE7C7]"></div>
                                <span>{candidate.name}</span>
                            </div>
                            <div className="mr-[10px] flex items-center gap-[10px]">
                                <Button
                                    className="bg-[#EDF1FF] border-none shadow-none"
                                    icon={<CheckOutlined />}
                                    onClick={() => handleCandidateStatusChange(stage.id, candidate.id, 'approved')}
                                />
                                <Button
                                    className="bg-[#FFEDED] border-none shadow-none"
                                    icon={<CloseOutlined />}
                                    onClick={() => handleCandidateStatusChange(stage.id, candidate.id, 'rejected')}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default StageComponent;




