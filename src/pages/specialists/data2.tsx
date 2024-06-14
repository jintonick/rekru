// ./src/data2.ts
export interface WorkExperience {
    position: string;
    company: string;
    period: string;
    description: string;
}

export interface Resume {
    datePosted: string;
    name: string;
    title: string;
    experience: string;
    location: string;
    tags: string[];
    age: number;
    workExperience: WorkExperience[];
}

export const resumes: Resume[] = [
    {
        datePosted: 'Обновлено 18 марта',
        name: 'Иванов Иван Иванович',
        title: 'Frontend-программист',
        experience: 'Опыт работы 3 года 10 месяцев',
        location: 'Москва, удаленная работа',
        tags: ['JavaScript', 'HTML', 'CSS', 'React', 'Проактивность', 'Английский язык'],
        age: 39,
        workExperience: [
            {
                position: 'Разработчик',
                company: 'ООО "Компания"',
                period: 'Январь 2020 - Март 2023',
                description: 'Разработка и поддержка веб-приложений.'
            },
            {
                position: 'Старший разработчик',
                company: 'ООО "Другие технологии"',
                period: 'Апрель 2023 - Настоящее время',
                description: 'Ведение команды разработчиков и проектирование архитектуры.'
            }
        ]
    },
    {
        datePosted: 'Обновлено 18 марта',
        name: 'Иванов Иван Иванович',
        title: 'Frontend-программист',
        experience: 'Опыт работы 3 года 10 месяцев',
        location: 'Москва, удаленная работа',
        tags: ['JavaScript', 'HTML', 'CSS', 'React', 'Проактивность', 'Английский язык'],
        age: 39,
        workExperience: [
            {
                position: 'Разработчик',
                company: 'ООО "Компания"',
                period: 'Январь 2020 - Март 2023',
                description: 'Разработка и поддержка веб-приложений.'
            },
            {
                position: 'Старший разработчик',
                company: 'ООО "Другие технологии"',
                period: 'Апрель 2023 - Настоящее время',
                description: 'Ведение команды разработчиков и проектирование архитектуры.'
            }
        ]
    },
    // Добавьте еще резюме, если нужно
];

