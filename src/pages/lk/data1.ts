// ./src/data.ts
export interface Job {
    title: string;
    salary: string;
    location: string;
    datePosted: string;
    tags: string[];
    description: string;
    experience: string;
    employmentType: string;
}

export const jobs: Job[] = [
    {
        title: "Программист Python",
        salary: "60000-70000 руб",
        location: "Москва, удаленная работа",
        datePosted: "23 апреля",
        tags: ["JavaScript", "HTML", "CSS", "React", "Проактивность", "Английский язык"],
        description: "Москва, удаленная работа",
        experience: "От 1 года до 3 лет",
        employmentType: "Полная занятость",
    },
    {
        title: "Программист JavaScript",
        salary: "70000-80000 руб",
        location: "Санкт-Петербург, удаленная работа",
        datePosted: "24 апреля",
        tags: ["Node.js", "Express", "MongoDB", "Teamwork", "Английский язык"],
        description: "Санкт-Петербург, удаленная работа",
        experience: "От 3 лет до 5 лет",
        employmentType: "Частичная занятость",
    },
    {
        title: "Программист Java",
        salary: "80000-90000 руб",
        location: "Новосибирск, удаленная работа",
        datePosted: "25 апреля",
        tags: ["Spring", "Hibernate", "MySQL", "Communication", "Английский язык"],
        description: "Новосибирск, удаленная работа",
        experience: "Больше 5 лет",
        employmentType: "Проектная работа",
    },
    {
        title: "Программист Ruby",
        salary: "60000-70000 руб",
        location: "Екатеринбург, удаленная работа",
        datePosted: "26 апреля",
        tags: ["Ruby on Rails", "PostgreSQL", "Agile", "Teamwork", "Английский язык"],
        description: "Екатеринбург, удаленная работа",
        experience: "Неважно",
        employmentType: "Стажировка",
    },
    {
        title: "Программист PHP",
        salary: "60000-70000 руб",
        location: "Казань, удаленная работа",
        datePosted: "27 апреля",
        tags: ["Laravel", "PHP", "MySQL", "Teamwork", "Английский язык"],
        description: "Казань, удаленная работа",
        experience: "От 3 лет до 5 лет",
        employmentType: "Полная занятость",
    },
];
