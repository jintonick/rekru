import React, { useState, useEffect } from 'react';

interface WorkExperience {
    companyName: string;
    workPeriod: string;
    workDetails: string;
}

const ResumeForm: React.FC = () => {
    const [isHeaderFixed, setIsHeaderFixed] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        location: '',
        birthDate: '',
        phoneNumber: '',
        salary: '',
        experience: '',
        tax: '',
        education: '',
        skills: '',
        nationality: '',
        disability: '',
        companyName: '',
        workPeriod: '',
        workDetails: '',
        job_name: '',
    });
    const [skills, setSkills] = useState<string[]>([]);
    const [skillInput, setSkillInput] = useState('');
    const [workExperience, setWorkExperience] = useState<WorkExperience[]>([{ companyName: '', workPeriod: '', workDetails: '' }]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSkillInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSkillInput(e.target.value);
    };

    const handleSkillInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && skillInput.trim()) {
            setSkills([...skills, skillInput.trim()]);
            setSkillInput('');
        }
    };

    const removeSkill = (index: number) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    const handleWorkExperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const updatedWorkExperience = [...workExperience];
        updatedWorkExperience[index][name as keyof WorkExperience] = value;
        setWorkExperience(updatedWorkExperience);
    };

    const addWorkExperience = () => {
        setWorkExperience([...workExperience, { companyName: '', workPeriod: '', workDetails: '' }]);
    };

    const removeWorkExperience = (index: number) => {
        const updatedWorkExperience = workExperience.filter((_, i) => i !== index);
        setWorkExperience(updatedWorkExperience);
    };

    useEffect(() => {
        const handleScroll = () => {
            const header = document.getElementById('main-header');
            if (header) {
                const rect = header.getBoundingClientRect();
                setIsHeaderFixed(rect.bottom < 0);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const name = formData.name;
    const gender = formData.gender;
    const location = formData.location;
    const requiredFieldsComplete = name && gender && location;

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-[1440px] px-[70px] text-[16px]">
                <header id="main-header" className="flex justify-between items-center my-[30px]">
                    <div className="flex items-center gap-[10px]">
                        <h1 className="font-bold text-[28px]">Новое резюме</h1>
                        <span className="mt-[9px] text-[#777777]">последние изменения 16:35 4.06.24</span>
                    </div>
                    <div>
                        <button className="px-[12px] py-[10px] bg-[#DBDBDB] text-black rounded mr-[15px]">Сохранить изменения</button>
                        <button className={`px-[12px] py-[10px] ${requiredFieldsComplete ? 'bg-[#2A5AB8] text-white' : 'bg-gray-400 text-gray-600 cursor-not-allowed'} rounded`} disabled={!requiredFieldsComplete}>Опубликовать</button>
                    </div>
                </header>

                {isHeaderFixed && (
                    <div className="fixed bottom-[-20px] left-0 right-0 flex justify-center bg-[#ECECEC] items-center z-50 mb-[20px]">
                        <div className="w-full max-w-[1440px] flex justify-between px-[70px] py-[15px]">
                            <div className="flex items-center gap-[10px]">
                                <h1 className="font-bold text-[28px]">Новое резюме</h1>
                                <span className="mt-[9px] text-[#777777]">последние изменения 16:35 4.06.24</span>
                            </div>
                            <div>
                                <button className="px-[12px] py-[10px] bg-[#DBDBDB] text-black rounded mr-[15px]">Сохранить изменения</button>
                                <button className={`px-[12px] py-[10px] ${requiredFieldsComplete ? 'bg-[#2A5AB8] text-white' : 'bg-gray-400 text-gray-600 cursor-not-allowed'} rounded`} disabled={!requiredFieldsComplete}>Опубликовать</button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-4 p-[30px] grid grid-cols-[2.5fr_1fr] bg-white rounded-[12px] shadow mb-[80px]">
                    <form className="pr-[130px]">
                        <h1 className="text-[28px] font-bold mb-[40px]">Заполните основную информацию</h1>
                        <div className="mb-4">
                            <label className="block">Кем хотите работать?</label>
                            <input
                                type="text"
                                name="job_name"
                                value={formData.job_name}
                                onChange={handleChange}
                                className="mt-[13px] h-[44px] block w-full max-w-[464px] px-3 py-2 border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8]"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block">Как вас зовут?</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-[13px] h-[44px] block w-full max-w-[464px] px-3 py-2 border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8]"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Ваш пол</label>
                            <div className="mt-1 flex gap-2">
                                <button
                                    type="button"
                                    className={`px-4 py-2 rounded ${formData.gender === 'Мужской' ? 'bg-[#2A5AB8] text-white' : 'bg-gray-200 text-black'}`}
                                    onClick={() => setFormData({ ...formData, gender: 'Мужской' })}
                                >
                                    Мужской
                                </button>
                                <button
                                    type="button"
                                    className={`px-4 py-2 rounded ${formData.gender === 'Женский' ? 'bg-[#2A5AB8] text-white' : 'bg-gray-200 text-black'}`}
                                    onClick={() => setFormData({ ...formData, gender: 'Женский' })}
                                >
                                    Женский
                                </button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Где вы живете?</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="mt-[13px] h-[44px] block w-full max-w-[464px] px-3 py-2 border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8]"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Дата рождения</label>
                            <input
                                type="date"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                                className="mt-[13px] h-[44px] block w-full max-w-[464px] px-3 py-2 border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8]"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Номер телефона</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="mt-[13px] h-[44px] block w-full max-w-[464px] px-3 py-2 border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8]"
                            />
                        </div>
                        <div className="mb-[13px]">
                            <label className="block text-gray-700">Уровень з/п за период времени или за объем работы</label>
                            <div className="flex items-center max-w-[464px] py-[3px] h-[44px] border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8]">
                                <input
                                    type="text"
                                    name="salary"
                                    value={formData.salary}
                                    onChange={handleChange}
                                    className="h-full block w-full"
                                />
                                <select
                                    className="w-[85px] block bg-[#DBDBDB] h-[44px] px-[12px] py-[10px] rounded-[7px]"
                                    name="currency"
                                    onChange={handleChange}
                                >
                                    <option>RUB</option>
                                    <option>USD</option>
                                    <option>EUR</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="mt-1 flex flex-col">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="tax"
                                        value="До вычета налогов"
                                        checked={formData.tax === "До вычета налогов"}
                                        onChange={handleChange}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">До вычета налогов</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="tax"
                                        value="После вычета налогов"
                                        checked={formData.tax === "После вычета налогов"}
                                        onChange={handleChange}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">После вычета налогов</span>
                                </label>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Какое у вас образование?</label>
                            <input
                                type="text"
                                name="education"
                                value={formData.education}
                                onChange={handleChange}
                                className="mt-[13px] h-[44px] block w-full max-w-[464px] px-3 py-2 border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8]"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Какие у вас навыки?</label>
                            <div className="flex flex-wrap gap-2 mt-2 mb-[10px]">
                                {skills.map((skill, index) => (
                                    <div key={index} className="bg-blue-100 text-blue-600 px-2 py-1 rounded flex items-center">
                                        {skill}
                                        <button
                                            type="button"
                                            className="ml-2 text-red-600"
                                            onClick={() => removeSkill(index)}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <input
                                type="text"
                                value={skillInput}
                                onChange={handleSkillInputChange}
                                onKeyDown={handleSkillInputKeyDown}
                                className="h-[44px] px-3 py-2 border w-full max-w-[465px] border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8]"
                                placeholder="Введите навык и нажмите Enter"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Гражданство</label>
                            <input
                                type="text"
                                name="nationality"
                                value={formData.nationality}
                                onChange={handleChange}
                                className="mt-[13px] h-[44px] block w-full max-w-[464px] px-3 py-2 border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8]"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Есть ли у вас инвалидность?</label>
                            <input
                                type="text"
                                name="disability"
                                value={formData.disability}
                                onChange={handleChange}
                                className="mt-[13px] h-[44px] block w-full max-w-[464px] px-3 py-2 border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8]"
                            />
                        </div>

                        <h2 className="text-xl font-bold mb-4">Расскажите про свой рабочий опыт</h2>
                        {workExperience.map((experience, index) => (
                            <div key={index} className="mb-4 border p-4 rounded">
                                <div className="mb-2">
                                    <label className="block">Название компании</label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={experience.companyName}
                                        onChange={(e) => handleWorkExperienceChange(index, e)}
                                        className="mt-[13px] h-[44px] block w-full max-w-[464px] px-3 py-2 border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8]"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block">В какой период вы работали?</label>
                                    <input
                                        type="text"
                                        name="workPeriod"
                                        value={experience.workPeriod}
                                        onChange={(e) => handleWorkExperienceChange(index, e)}
                                        className="mt-[13px] h-[44px] block w-full max-w-[464px] px-3 py-2 border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8]"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block">Расскажите про ваши обязанности и достижения</label>
                                    <textarea
                                        name="workDetails"
                                        value={experience.workDetails}
                                        onChange={(e) => handleWorkExperienceChange(index, e)}
                                        className="mt-[13px] h-[88px] block w-full max-w-[464px] px-3 py-2 border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8]"
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="text-red-600"
                                    onClick={() => removeWorkExperience(index)}
                                >
                                    Удалить
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="px-4 py-2 bg-[#F7F7F7] rounded-[7px] w-full"
                            onClick={addWorkExperience}
                        >
                            Добавить опыт работы
                        </button>
                    </form>

                    <div>
                        <div className="h-full border-l-[1px] pl-4">
                            <h2 className="text-xl font-bold mb-4">Этапы создания</h2>
                            <ul>
                                <li className="mb-2 flex items-center">
                                    <div className={`w-[24px] h-[24px] flex justify-center items-center font-bold rounded-full ${name ? 'bg-[#2A5AB8] text-white' : 'bg-gray-400 text-gray-600'}`}>
                                        1
                                    </div>
                                    <span className={`ml-2 ${name ? 'text-[#2A5AB8]' : 'text-gray-500'}`}>Основная информация</span>
                                </li>
                                <li className="mb-2 flex items-center">
                                    <div className={`w-[24px] h-[24px] flex justify-center items-center font-bold rounded-full ${gender ? 'bg-[#2A5AB8] text-white' : 'bg-gray-400 text-gray-600'}`}>
                                        2
                                    </div>
                                    <span className={`ml-2 ${gender ? 'text-[#2A5AB8]' : 'text-gray-500'}`}>Контактные данные</span>
                                </li>
                                <li className="mb-2 flex items-center">
                                    <div className={`w-[24px] h-[24px] flex justify-center items-center font-bold rounded-full ${formData.education ? 'bg-[#2A5AB8] text-white' : 'bg-gray-400 text-gray-600'}`}>
                                        3
                                    </div>
                                    <span className={`ml-2 ${formData.education ? 'text-[#2A5AB8]' : 'text-gray-500'}`}>Квалификация</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeForm;

