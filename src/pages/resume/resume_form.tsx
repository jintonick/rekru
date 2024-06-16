import React, { useState, useEffect } from 'react';
import { Button, Radio, DatePicker, Select } from "antd";
import { useCreateResumeMutation } from '../../api/apiSlice';
import moment from 'moment';

const { RangePicker } = DatePicker;

const educationLevels = [
    { label: "Среднее", value: 1 },
    { label: "Среднее специальное", value: 2 },
    { label: "Неоконченное высшее", value: 3 },
    { label: "Высшее", value: 4 },
    { label: "Бакалавр", value: 5 },
    { label: "Магистр", value: 6 },
    { label: "Кандидат наук", value: 7 },
    { label: "Доктор наук", value: 8 }
];

const skillsOptions = [
    "Python", "SQL", "PostgreSQL", "Английский язык", "Redis", "Django",
    "FastAPI", "RabbitMQ", "aiohttp", "Kafka", "Docker", "grafana",
    "prometheus", "pytest", "Git", "Linux", "Web Scrapping", "SQLAlchemy",
    "REST API", "machine learning"
].map(skill => ({ label: skill, value: skill }));

interface WorkExperience {
    companyName: string;
    timeFrom: string;
    timeTo: string;
    description: string;
}

const ResumeForm: React.FC = () => {
    const [isHeaderFixed, setIsHeaderFixed] = useState(false);
    const [formData, setFormData] = useState({
        fio: '',
        gender: 1, // 1 for male, 2 for female
        address: '',
        birth_date: '1966-01-03T00:06:56.52Z',
        phone: '',
        salary_from: 0,
        salary_to: 0,
        education: '',
        position: '',
        skills: [] as string[],
        nationality: '',
        disabilities: false,
        workExperience: [{ companyName: '', timeFrom: '1966-03-03T00:06:56.52Z', timeTo: '1966-04-03T00:06:56.52Z', description: '' }]
    });
    const [createResume] = useCreateResumeMutation();

    const handleChange = (name: string, value: any) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSkillChange = (value: string[]) => {
        setFormData({ ...formData, skills: value });
    };

    const handleWorkExperienceChange = (index: number, field: string, value: any) => {
        const updatedWorkExperience = [...formData.workExperience];
        (updatedWorkExperience[index] as any)[field] = value;
        setFormData({ ...formData, workExperience: updatedWorkExperience });
    };

    const addWorkExperience = () => {
        setFormData({ ...formData, workExperience: [...formData.workExperience, { companyName: '', timeFrom: '', timeTo: '', description: '' }] });
    };

    const removeWorkExperience = (index: number) => {
        const updatedWorkExperience = formData.workExperience.filter((_, i) => i !== index);
        setFormData({ ...formData, workExperience: updatedWorkExperience });
    };

    const handleGenderChange = (e: any) => {
        setFormData({ ...formData, gender: e.target.value });
    };

    const handleDisabilitiesChange = (e: any) => {
        setFormData({ ...formData, disabilities: e.target.value === 'yes' });
    };

    const handleSubmit = async () => {
        try {
            // Convert date formats
            const updatedWorkExperience = formData.workExperience.map(exp => ({
                ...exp,
                timeFrom: moment(exp.timeFrom).format("YYYY-MM-DDTHH:mm:ss.SSZ"),
                timeTo: moment(exp.timeTo).format("YYYY-MM-DDTHH:mm:ss.SSZ")
            }));
            const updatedFormData = { ...formData, workExperience: updatedWorkExperience, birth_date: moment(formData.birth_date).format("YYYY-MM-DDTHH:mm:ss.SSZ") };

            await createResume(updatedFormData);
            // Handle success, e.g., show a message or redirect
        } catch (error) {
            console.error(error);
            // Handle error, e.g., show an error message
        }
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

    const requiredFieldsComplete = formData.fio && formData.gender && formData.address && formData.birth_date;

    return (
        <div className="w-full flex justify-center min-h-screen">
            <div className="w-full max-w-[1440px] text-[16px]">
                <header id="main-header" className="flex justify-between items-center mb-[30px]">
                    <div className="flex items-center gap-[10px]">
                        <h1 className="font-bold text-[28px]">Новое резюме</h1>
                        <span className="mt-[9px] text-[#777777]">последние изменения 16:35 4.06.24</span>
                    </div>
                    <div>
                        <button className="px-[12px] py-[10px] bg-[#DBDBDB] text-black rounded mr-[15px]">Сохранить изменения</button>
                        <button onClick={handleSubmit} className={`px-[12px] py-[10px] ${requiredFieldsComplete ? 'bg-[#2A5AB8] text-white' : 'bg-gray-400 text-gray-600 cursor-not-allowed'} rounded`} disabled={!requiredFieldsComplete}>Опубликовать</button>
                    </div>
                </header>
                <div className="mt-4 grid grid-cols-[2.5fr_1fr] bg-white rounded-[12px] mb-[80px]">
                    <form className="pr-[130px]">
                        <h1 className="text-[28px] font-bold mb-[40px]">Заполните основную информацию</h1>
                        <div className="mb-4">
                            <label className="block">Кем хотите работать?</label>
                            <input
                                type="text"
                                name="position"
                                value={formData.position}
                                onChange={(e) => handleChange('position', e.target.value)}
                                className="mt-[13px] h-[44px] block w-full max-w-[464px] px-3 py-2 border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8]"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block">Как вас зовут?</label>
                            <input
                                type="text"
                                name="fio"
                                value={formData.fio}
                                onChange={(e) => handleChange('fio', e.target.value)}
                                className="mt-[13px] h-[44px] block w-full max-w-[464px] px-3 py-2 border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8]"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Ваш пол</label>
                            <Radio.Group onChange={handleGenderChange} value={formData.gender}>
                                <Radio value={1}>Мужской</Radio>
                                <Radio value={2}>Женский</Radio>
                            </Radio.Group>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Где вы живете?</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={(e) => handleChange('address', e.target.value)}
                                className="mt-[13px] h-[44px] block w-full max-w-[464px] px-3 py-2 border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8]"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Дата рождения</label>
                            <input
                                type="date"
                                name="birth_date"
                                value={formData.birth_date}
                                onChange={(e) => handleChange('birth_date', e.target.value)}
                                className="mt-[13px] h-[44px] block w-full max-w-[464px] px-3 py-2 border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8]"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Номер телефона</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                                className="mt-[13px] h-[44px] block w-full max-w-[464px] px-3 py-2 border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8]"
                            />
                        </div>
                        <div className="mb-[13px]">
                            <label className="block text-gray-700">Уровень з/п за период времени или за объем работы</label>
                            <div className="flex items-center max-w-[464px] py-[3px] space-x-[10px]">
                                <input
                                    type="number"
                                    name="salary_from"
                                    placeholder="От"
                                    onChange={(e) => handleChange('salary_from', e.target.value)}
                                    className="w-full h-[44px] border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8] px-[12px]"
                                />
                                <input
                                    type="number"
                                    name="salary_to"
                                    placeholder="До"
                                    onChange={(e) => handleChange('salary_to', e.target.value)}
                                    className="w-full h-[44px] border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8] px-[12px]"
                                />
                                <select
                                    className="w-[85px] bg-[#DBDBDB] h-[44px] px-[12px] py-[10px] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8]"
                                    name="currency"
                                    onChange={(e) => handleChange('currency', e.target.value)}
                                >
                                    <option>RUB</option>
                                    <option>USD</option>
                                    <option>EUR</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Какое у вас образование?</label>
                            <Select
                                style={{ width: '100%', height: '44px' }}
                                onChange={(value) => handleChange('education', value)}
                                options={educationLevels}
                                value={formData.education}
                                placeholder="Выберите уровень образования"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Какие у вас навыки?</label>
                            <Select
                                mode="tags"
                                style={{ width: '100%', height: '44px' }}
                                onChange={handleSkillChange}
                                value={formData.skills}
                                tokenSeparators={[',']}
                                options={skillsOptions}
                                placeholder="Введите навык и нажмите Enter"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Гражданство</label>
                            <input
                                type="text"
                                name="nationality"
                                value={formData.nationality}
                                onChange={(e) => handleChange('nationality', e.target.value)}
                                className="mt-[13px] h-[44px] block w-full max-w-[464px] px-3 py-2 border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8]"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Есть ли у вас инвалидность?</label>
                            <Radio.Group onChange={handleDisabilitiesChange} value={formData.disabilities ? 'yes' : 'no'}>
                                <Radio value="yes">Да</Radio>
                                <Radio value="no">Нет</Radio>
                            </Radio.Group>
                        </div>

                        <h2 className="text-xl font-bold mb-4">Расскажите про свой рабочий опыт</h2>
                        {formData.workExperience.map((experience, index) => (
                            <div key={index} className="mb-4 border p-4 rounded">
                                <div className="mb-2">
                                    <label className="block">Название компании</label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={experience.companyName}
                                        onChange={(e) => handleWorkExperienceChange(index, 'companyName', e.target.value)}
                                        className="mt-[13px] h-[44px] block w-full max-w-[464px] px-3 py-2 border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8]"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block">В какой период вы работали?</label>
                                    <RangePicker
                                        onChange={(dates, dateStrings) => handleWorkExperienceChange(index, 'workPeriod', dateStrings)}
                                        format="YYYY-MM-DD"
                                        className="w-full max-w-[464px] h-[44px]"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block">Расскажите про ваши обязанности и достижения</label>
                                    <textarea
                                        name="description"
                                        value={experience.description}
                                        onChange={(e) => handleWorkExperienceChange(index, 'description', e.target.value)}
                                        className="mt-[13px] h-[88px] block w-full max-w-[464px] px-3 py-2 border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8]"
                                    />
                                </div>
                                <Button
                                    type="link"
                                    className="text-red-600 text-[16px]"
                                    onClick={() => removeWorkExperience(index)}
                                >
                                    Удалить
                                </Button>
                            </div>
                        ))}
                        <Button
                            className="px-4 py-2 bg-[#F7F7F7] h-[44px] border-none shadow-none text-[16px] rounded-[7px] w-full"
                            onClick={addWorkExperience}
                        >
                            Добавить опыт работы
                        </Button>
                    </form>

                    <div>
                        <div className="h-full border-l-[1px] pl-4">
                            <h2 className="text-xl font-bold mb-4">Этапы создания</h2>
                            <ul>
                                <li className="mb-2 flex items-center">
                                    <div className={`w-[24px] h-[24px] flex justify-center items-center font-bold rounded-full ${formData.fio ? 'bg-[#2A5AB8] text-white' : 'bg-gray-400 text-gray-600'}`}>
                                        1
                                    </div>
                                    <span className={`ml-2 ${formData.fio ? 'text-[#2A5AB8]' : 'text-gray-500'}`}>Основная информация</span>
                                </li>
                                <li className="mb-2 flex items-center">
                                    <div className={`w-[24px] h-[24px] flex justify-center items-center font-bold rounded-full ${formData.gender ? 'bg-[#2A5AB8] text-white' : 'bg-gray-400 text-gray-600'}`}>
                                        2
                                    </div>
                                    <span className={`ml-2 ${formData.gender ? 'text-[#2A5AB8]' : 'text-gray-500'}`}>Контактные данные</span>
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




