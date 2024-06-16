// ./src/JobForm.tsx
import React, { useState, useEffect } from 'react';

const JobForm: React.FC = () => {
    const [isHeaderFixed, setIsHeaderFixed] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        field: '',
        city: '',
        salary: '',
        tax: '',
        officeAddress: '',
        experience: '',
        description: '',
        employmentType: '',
        schedule: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
    const titlee = formData.title
    const fieldd = formData.employmentType
    const descriptionn = formData.description
    const requiredFieldsComplete = titlee && fieldd && descriptionn;

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
                        <button className={`px-[12px] py-[10px] ${requiredFieldsComplete ? 'bg-[#2A5AB8] text-white' : 'bg-gray-400 text-gray-600 cursor-not-allowed'} rounded`} disabled={!requiredFieldsComplete}>Опубликовать</button>
                    </div>
                </header>
                <div className="mt-4 p-[30px] grid grid-cols-[2.5fr_1fr] bg-white rounded-[12px] shadow">
                    <form className="pr-[130px]">
                        <h1 className="text-2xl font-bold mb-[40px]">Основная информация</h1>
                        <div className="mb-4">
                            <label className="block">Название вакансии</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="mt-[13px] h-[44px] block w-full max-w-[464px] px-3 py-2 border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8]"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block">Название компании</label>
                            <input
                                type="text"
                                name="field"
                                value={formData.field}
                                onChange={handleChange}
                                className="mt-[13px] h-[44px] block w-full max-w-[464px] px-3 py-2 border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8]"
                            />
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
                                    type="text"
                                    name="salaryFrom"
                                    placeholder="От"
                                    onChange={handleChange}
                                    className="w-full h-[44px] border border-[#DBDBDB] rounded-[7px] focus:outline-none focus:ring-[#2A5AB8] focus:border-[#2A5AB8] px-[12px]"
                                />
                                <input
                                    type="text"
                                    name="salaryTo"
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
                        </div>
                        <div className="mb-4">
                            <label className="flex items-end gap-[4px]">Адрес офиса <p className="text-[#BBBBBB] text-[12px] mb-[2px]">(если есть)</p></label>
                            <input
                                type="text"
                                name="officeAddress"
                                value={formData.officeAddress}
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
                                        value="Неважно"
                                        checked={formData.experience === "Неважно"}
                                        onChange={handleChange}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">Неважно</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="experience"
                                        value="От 1 года до 3 лет"
                                        checked={formData.experience === "От 1 года до 3 лет"}
                                        onChange={handleChange}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">От 1 года до 3 лет</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="experience"
                                        value="От 3 лет до 5 лет"
                                        checked={formData.experience === "От 3 лет до 5 лет"}
                                        onChange={handleChange}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">От 3 лет до 5 лет</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="experience"
                                        value="Больше 5 лет"
                                        checked={formData.experience === "Больше 5 лет"}
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

                        <div className="mb-4">
                            <h2 className="text-xl font-bold mb-4">Дополнительно</h2>
                            <label className="block">Тип занятости</label>
                            <div className="mt-1 flex flex-col">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="employmentType"
                                        value="Полная занятость"
                                        checked={formData.employmentType === "Полная занятость"}
                                        onChange={handleChange}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">Полная занятость</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="employmentType"
                                        value="Частичная занятость"
                                        checked={formData.employmentType === "Частичная занятость"}
                                        onChange={handleChange}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">Частичная занятость</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="employmentType"
                                        value="Проектная работа"
                                        checked={formData.employmentType === "Проектная работа"}
                                        onChange={handleChange}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">Проектная работа</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="employmentType"
                                        value="Стажировка"
                                        checked={formData.employmentType === "Стажировка"}
                                        onChange={handleChange}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">Стажировка</span>
                                </label>
                            </div>

                            <label className="block mt-4">График работы</label>
                            <div className="mt-1 flex flex-col">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="schedule"
                                        value="Работа по выходным"
                                        checked={formData.schedule === "Работа по выходным"}
                                        onChange={handleChange}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">Работа по выходным</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="schedule"
                                        value="Удаленная работа"
                                        checked={formData.schedule === "Удаленная работа"}
                                        onChange={handleChange}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">Удаленная работа</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="schedule"
                                        value="5/2 в неделю"
                                        checked={formData.schedule === "5/2 в неделю"}
                                        onChange={handleChange}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">5/2 в неделю</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="schedule"
                                        value="6/1 в неделю"
                                        checked={formData.schedule === "6/1 в неделю"}
                                        onChange={handleChange}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">6/1 в неделю</span>
                                </label>
                            </div>
                        </div>
                    </form>

                    <div>
                        <div className="h-full border-l-[1px] pl-4">
                            <h2 className="text-xl font-bold mb-4">Этапы создания</h2>
                            <ul>
                                <li className="mb-2 flex items-center">
                                    <div className={`w-[24px] h-[24px] flex justify-center items-center font-bold rounded-full ${titlee ? 'bg-[#2A5AB8] text-white' : 'bg-gray-400 text-gray-600'}`}>
                                        1
                                    </div>
                                    <span className={`ml-2 ${titlee ? 'text-[#2A5AB8]' : 'text-gray-500'}`}>Основная информация</span>
                                </li>
                                <li className="mb-2 flex items-center">
                                    <div className={`w-[24px] h-[24px] flex justify-center items-center font-bold rounded-full ${descriptionn ? 'bg-[#2A5AB8] text-white' : 'bg-gray-400 text-gray-600'}`}>
                                        2
                                    </div>
                                    <span className={`ml-2 ${descriptionn ? 'text-[#2A5AB8]' : 'text-gray-500'}`}>Описание вакансии</span>
                                </li>
                                <li className="mb-2 flex items-center">
                                    <div className={`w-[24px] h-[24px] flex justify-center items-center font-bold rounded-full ${fieldd ? 'bg-[#2A5AB8] text-white' : 'bg-gray-400 text-gray-600'}`}>
                                        3
                                    </div>
                                    <span className={`ml-2 ${fieldd ? 'text-[#2A5AB8]' : 'text-gray-500'}`}>Дополнительные сведения</span>
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
                        <button className={`px-[12px] py-[10px] ${requiredFieldsComplete ? 'bg-[#2A5AB8] text-white' : 'bg-gray-400 text-gray-600 cursor-not-allowed'} rounded`} disabled={!requiredFieldsComplete}>Опубликовать</button>
                    </div>
                </header>
            </div>
        </div>
    );
};

export default JobForm;


