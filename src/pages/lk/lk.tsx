import React, { useState } from 'react';
import { Button } from 'antd';
import { useAuth } from "../../auth/auth_context";
import { useNavigate } from "react-router-dom";
import ResumeForm from "./resume_form";
import Schedule from "./schedule";
import ProfileEdit from "./profile_edit"; // Подключаем компонент ProfileEdit

import list from '../../imgs/list.svg';
import resume from '../../imgs/resume.svg';
import calendar from '../../imgs/calendar.svg';
import log_out from '../../imgs/log-out.svg';
import moment from 'moment';

enum ViewType {
    Profile,
    Resume,
    Schedule,
}

function Lk() {
    const [currentView, setCurrentView] = useState<ViewType>(ViewType.Profile);
    const [userData, setUserData] = useState({
        firstName: 'Иван',
        lastName: 'Иванов',
        birthDate: moment('1997-03-10', 'YYYY-MM-DD'),
        position: 'Менеджер',
        company: 'ООО Название',
    });

    const { logout, userType } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const renderCurrentView = () => {
        switch (currentView) {
            case ViewType.Profile:
                return <ProfileEdit />;
            case ViewType.Resume:
                return <ResumeForm />;
            case ViewType.Schedule:
                return <Schedule />;
            default:
                return <ProfileEdit />;
        }
    };

    return (
        <div className="flex px-[70px] gap-[33px] justify-center min-h-screen mb-[40px]">
            <div className="h-[300px] w-[240px] flex flex-col justify-between rounded-[7px] bg-white p-[10px]">
                <div>
                    <Button
                        className={`flex px-[14px] h-[44px] w-[220px] py-[12px] border-none shadow-none justify-start items-center gap-[8px] rounded-[7px] ${currentView === ViewType.Profile ? 'bg-[#EDF1FF]' : 'bg-white'}`}
                        onClick={() => setCurrentView(ViewType.Profile)}
                    >
                        <img src={list} alt="Профиль" />
                        <h1 className="text-[16px]">Профиль</h1>
                    </Button>
                    <Button
                        className={`flex mt-[5px] px-[14px] h-[44px] w-[220px] py-[12px] border-none shadow-none justify-start items-center gap-[8px] rounded-[7px] ${currentView === ViewType.Resume ? 'bg-[#EDF1FF]' : 'bg-white'}`}
                        onClick={() => setCurrentView(ViewType.Resume)}
                    >
                        <img className="h-[24px] w-[24px]" src={resume} alt="Резюме" />
                        <h1 className="text-[16px]">Резюме</h1>
                    </Button>
                    <Button
                        className={`flex mt-[5px] px-[14px] h-[44px] w-[220px] py-[12px] border-none shadow-none justify-start items-center gap-[8px] rounded-[7px] ${currentView === ViewType.Schedule ? 'bg-[#EDF1FF]' : 'bg-white'}`}
                        onClick={() => setCurrentView(ViewType.Schedule)}
                    >
                        <img className="h-[24px] w-[24px]" src={calendar} alt="Расписание" />
                        <h1 className="text-[16px]">Расписание встреч</h1>
                    </Button>
                </div>
                <div>
                    <Button type="link" className="flex px-[14px] h-[44px] text-[#B82A2A] py-[12px] justify-start items-center gap-[8px] w-full border-none shadow-none" onClick={handleLogout}>
                        <img src={log_out} alt="Выйти" />Выйти
                    </Button>
                </div>
            </div>
            <div className="max-w-[1037px] w-full h-full">
                {renderCurrentView()}
            </div>
        </div>
    );
}

export default Lk;

