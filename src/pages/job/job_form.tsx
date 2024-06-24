import React, { useState, useEffect } from 'react';
import { useCreateVacancyMutation } from '../../api/apiSlice';

const JobForm: React.FC = () => {
    const [isHeaderFixed, setIsHeaderFixed] = useState(false);
    const [skills, setSkills] = useState<string[]>([]);
    const [skillInput, setSkillInput] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        company_name: '',
        city: '',
        salary_from: '',
        salary_to: '',
        address: '',
        experience: '',
        description: '',
        employment_type: '',
        user_type: '1',
        skills: []
    });

    const [createVacancy, { isLoading }] = useCreateVacancyMutation();

    const handleSkillInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && skillInput.trim()) {
            e.preventDefault(); // Предотвращает отправку формы
            setSkills([...skills, skillInput.trim()]);
            setSkillInput('');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const removeSkill = (index: number) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    const handleSkillInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSkillInput(e.target.value);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const vacancyData = {
            name: formData.name,
            experience: parseInt(formData.experience),
            city: formData.city,
            employment_type: parseInt(formData.employment_type),
            salary_from: parseInt(formData.salary_from),
            salary_to: parseInt(formData.salary_to),
            company_name: formData.company_name,
            skills,
            address: formData.address,
            description: formData.description,
        };
        try {
            const response = await createVacancy(vacancyData).unwrap();
            console.log('Вакансия создана:', response);
            alert('Вакансия успешно создана');
        } catch (error) {
            console.error('Ошибка при создании вакансии:', error);
            alert('Ошибка при создании вакансии');
        }
    };

    const requiredFieldsComplete = formData.name && formData.employment_type && formData.description && formData.experience && formData.company_name && formData.city && formData.salary_from && formData.salary_to && formData.address;

    const isSalaryFromValid = parseInt(formData.salary_from) >= 100000;
    const isSalaryToValid = parseInt(formData.salary_to) <= 200000;

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-[1440px] px-[70px] text-[16px]">
                <header id="main-header" className="flex justify-between items-center my-[30px]">
                    <div className="flex items-center gap-[10px]">
                        <h1 className="font-bold text-[28px]">Новая вакансия</h1>
                        <span className="mt-[9px] text-[#777777]">последние изменения 16:35 4.06.24</span>
                    </div>
                    <div>
                        <button className="px-[12px] py-[10px] bg-[#DBDBDB] text-black rounded mr-[15px]">Сохранить изменения</button>
                        <button className={`px-[12px] py-[10px] ${requiredFieldsComplete && isSalaryFromValid && isSalaryToValid ? 'bg-[#2A5AB8] text-white' : 'bg-gray-400 text-gray-600 cursor-not-allowed'} rounded`} disabled={!requiredFieldsComplete || !isSalaryFromValid || !isSalaryToValid} onClick={handleSubmit}>Опубликовать</button>
                    </div>
                </header>
                <div className="mt-4 p-[30px] grid grid-cols-[2.5fr_1fr] bg-white rounded-[12px] shadow">
                    <form className="pr-[130px]" onSubmit={handleSubmit} onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}>
                        <h1 className="text-2xl font-bold mb-[40px]">Основная информация</h1>
                        <div className="mb-4">
                            <label className="block">Название вакансии</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-[13px] h-[44px] block w-full max-w-[464px] px-3 py-2 border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8]"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block">Название компании</label>
                            <input
                                type="text"
                                name="company_name"
                                value={formData.company_name}
                                onChange={handleChange}
                                className="mt-[13px] h-[44px] block w-full max-w-[464px] px-3 py-2 border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8]"
                            />
                        </div>
                        <label className="block my-[10px]">Тип Специалиста</label>
                        <div className="mt-1 flex flex-col">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="user_type"
                                    value="1"
                                    checked={formData.user_type === "1"}
                                    onChange={handleChange}
                                    className="form-radio"
                                />
                                <span className="ml-2">Аналитик</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="user_type"
                                    value="2"
                                    checked={formData.user_type === "2"}
                                    onChange={handleChange}
                                    className="form-radio"
                                />
                                <span className="ml-2">Dev-ops</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="user_type"
                                    value="3"
                                    checked={formData.user_type === "3"}
                                    onChange={handleChange}
                                    className="form-radio"
                                />
                                <span className="ml-2">Team Leed</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="user_type"
                                    value="4"
                                    checked={formData.user_type === "4"}
                                    onChange={handleChange}
                                    className="form-radio"
                                />
                                <span className="ml-2">Системный инженер</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="user_type"
                                    value="4"
                                    checked={formData.user_type === "5"}
                                    onChange={handleChange}
                                    className="form-radio"
                                />
                                <span className="ml-2">Phyton разработчки</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="user_type"
                                    value="4"
                                    checked={formData.user_type === "6"}
                                    onChange={handleChange}
                                    className="form-radio"
                                />
                                <span className="ml-2">Тестировщик</span>
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">В каком городе ищем сотрудника?</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
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
                                    onChange={handleChange}
                                    className="w-full h-[44px] border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8] px-[12px]"
                                />
                                <input
                                    type="number"
                                    name="salary_to"
                                    placeholder="До"
                                    onChange={handleChange}
                                    className="w-full h-[44px] border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8] px-[12px]"
                                />
                                <select
                                    className="w-[85px] bg-[#DBDBDB] h-[44px] px-[12px] py-[10px] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8]"
                                    name="currency"
                                    onChange={handleChange}
                                >
                                    <option>RUB</option>
                                    <option>USD</option>
                                    <option>EUR</option>
                                </select>
                            </div>
                            {!isSalaryFromValid && <p className="text-red-600">Минимальная зарплата должна быть не менее 100000</p>}
                            {!isSalaryToValid && <p className="text-red-600">Максимальная зарплата должна быть не более 200000</p>}
                        </div>
                        <div className="mb-4">
                            <label className="flex items-end gap-[4px]">Адрес офиса <p className="text-[#BBBBBB] text-[12px] mb-[2px]">(если есть)</p></label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="mt-1 block w-full max-w-[464px] px-3 py-2 border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8]"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Опыт работы</label>
                            <div className="mt-1 flex flex-col">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="experience"
                                        value="1"
                                        checked={formData.experience === "1"}
                                        onChange={handleChange}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">Неважно</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="experience"
                                        value="2"
                                        checked={formData.experience === "2"}
                                        onChange={handleChange}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">От 1 года до 3 лет</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="experience"
                                        value="3"
                                        checked={formData.experience === "3"}
                                        onChange={handleChange}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">От 3 лет до 5 лет</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="experience"
                                        value="4"
                                        checked={formData.experience === "4"}
                                        onChange={handleChange}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">Больше 5 лет</span>
                                </label>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Опишите вакансию</label>
                            <label className="text-[#BBBBBB]">Пожалуйста, следуйте</label>
                            <a className="text-[#2A5AB8] ml-[4px]">правилам публикации вакансии</a>
                            <textarea
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={5}
                            ></textarea>
                        </div>

                        <div className="mb-4 mt-[20px]">
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
                            <h2 className="text-xl font-bold mb-4">Дополнительно</h2>
                            <label className="block">Тип занятости</label>
                            <div className="mt-1 flex flex-col">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="employment_type"
                                        value="1"
                                        checked={formData.employment_type === "1"}
                                        onChange={handleChange}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">Полная занятость</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="employment_type"
                                        value="2"
                                        checked={formData.employment_type === "2"}
                                        onChange={handleChange}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">Частичная занятость</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="employment_type"
                                        value="3"
                                        checked={formData.employment_type === "3"}
                                        onChange={handleChange}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">Проектная работа</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="employment_type"
                                        value="4"
                                        checked={formData.employment_type === "4"}
                                        onChange={handleChange}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">Стажировка</span>
                                </label>
                            </div>
                        </div>
                        <button type="submit" className="hidden" />
                    </form>

                    <div>
                        <div className="h-full border-l-[1px] pl-4">
                            <h2 className="text-xl font-bold mb-4">Этапы создания</h2>
                            <ul>
                                <li className="mb-2 flex items-center">
                                    <div className={`w-[24px] h-[24px] flex justify-center items-center font-bold rounded-full ${formData.name ? 'bg-[#2A5AB8] text-white' : 'bg-gray-400 text-gray-600'}`}>
                                        1
                                    </div>
                                    <span className={`ml-2 ${formData.name ? 'text-[#2A5AB8]' : 'text-gray-500'}`}>Имя вакансии</span>
                                </li>
                                <li className="mb-2 flex items-center">
                                    <div className={`w-[24px] h-[24px] flex justify-center items-center font-bold rounded-full ${formData.company_name ? 'bg-[#2A5AB8] text-white' : 'bg-gray-400 text-gray-600'}`}>
                                        2
                                    </div>
                                    <span className={`ml-2 ${formData.company_name ? 'text-[#2A5AB8]' : 'text-gray-500'}`}>Название компании</span>
                                </li>
                                <li className="mb-2 flex items-center">
                                    <div className={`w-[24px] h-[24px] flex justify-center items-center font-bold rounded-full ${formData.city ? 'bg-[#2A5AB8] text-white' : 'bg-gray-400 text-gray-600'}`}>
                                        3
                                    </div>
                                    <span className={`ml-2 ${formData.city ? 'text-[#2A5AB8]' : 'text-gray-500'}`}>Город</span>
                                </li>
                                <li className="mb-2 flex items-center">
                                    <div className={`w-[24px] h-[24px] flex justify-center items-center font-bold rounded-full ${formData.salary_from ? 'bg-[#2A5AB8] text-white' : 'bg-gray-400 text-gray-600'}`}>
                                        4
                                    </div>
                                    <span className={`ml-2 ${formData.salary_from ? 'text-[#2A5AB8]' : 'text-gray-500'}`}>Зарплата от</span>
                                </li>
                                <li className="mb-2 flex items-center">
                                    <div className={`w-[24px] h-[24px] flex justify-center items-center font-bold rounded-full ${formData.salary_to ? 'bg-[#2A5AB8] text-white' : 'bg-gray-400 text-gray-600'}`}>
                                        5
                                    </div>
                                    <span className={`ml-2 ${formData.salary_to ? 'text-[#2A5AB8]' : 'text-gray-500'}`}>Зарплата до</span>
                                </li>
                                <li className="mb-2 flex items-center">
                                    <div className={`w-[24px] h-[24px] flex justify-center items-center font-bold rounded-full ${formData.address ? 'bg-[#2A5AB8] text-white' : 'bg-gray-400 text-gray-600'}`}>
                                        6
                                    </div>
                                    <span className={`ml-2 ${formData.address ? 'text-[#2A5AB8]' : 'text-gray-500'}`}>Адрес</span>
                                </li>
                                <li className="mb-2 flex items-center">
                                    <div className={`w-[24px] h-[24px] flex justify-center items-center font-bold rounded-full ${formData.experience ? 'bg-[#2A5AB8] text-white' : 'bg-gray-400 text-gray-600'}`}>
                                        7
                                    </div>
                                    <span className={`ml-2 ${formData.experience ? 'text-[#2A5AB8]' : 'text-gray-500'}`}>Опыт работы</span>
                                </li>
                                <li className="mb-2 flex items-center">
                                    <div className={`w-[24px] h-[24px] flex justify-center items-center font-bold rounded-full ${formData.description ? 'bg-[#2A5AB8] text-white' : 'bg-gray-400 text-gray-600'}`}>
                                        8
                                    </div>
                                    <span className={`ml-2 ${formData.description ? 'text-[#2A5AB8]' : 'text-gray-500'}`}>Описание</span>
                                </li>
                                <li className="mb-2 flex items-center">
                                    <div className={`w-[24px] h-[24px] flex justify-center items-center font-bold rounded-full ${skills.length > 0 ? 'bg-[#2A5AB8] text-white' : 'bg-gray-400 text-gray-600'}`}>
                                        9
                                    </div>
                                    <span className={`ml-2 ${skills.length > 0 ? 'text-[#2A5AB8]' : 'text-gray-500'}`}>Навыки</span>
                                </li>
                                <li className="mb-2 flex items-center">
                                    <div className={`w-[24px] h-[24px] flex justify-center items-center font-bold rounded-full ${formData.employment_type ? 'bg-[#2A5AB8] text-white' : 'bg-gray-400 text-gray-600'}`}>
                                        10
                                    </div>
                                    <span className={`ml-2 ${formData.employment_type ? 'text-[#2A5AB8]' : 'text-gray-500'}`}>Тип занятости</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <header id="main-header" className="flex justify-between items-center mb-[80px] mt-[20px]">
                    <div className="flex items-center gap-[10px]">
                        <h1 className="font-bold text-[28px]">Новое резюме</h1>
                        <span className="mt-[9px] text-[#777777]">последние изменения 16:35 4.06.24</span>
                    </div>
                    <div>
                        <button className="px-[12px] py-[10px] bg-[#DBDBDB] text-black rounded mr-[15px]">Сохранить изменения</button>
                        <button className={`px-[12px] py-[10px] ${requiredFieldsComplete && isSalaryFromValid && isSalaryToValid ? 'bg-[#2A5AB8] text-white' : 'bg-gray-400 text-gray-600 cursor-not-allowed'} rounded`} disabled={!requiredFieldsComplete || !isSalaryFromValid || !isSalaryToValid} onClick={handleSubmit}>Опубликовать</button>
                    </div>
                </header>
            </div>
        </div>
    );
};

export default JobForm;





