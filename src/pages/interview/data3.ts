// ./src/data3.ts
export interface Candidate {
    id: number;
    name: string;
    status: 'approved' | 'rejected' | 'pending';
}

export interface Stage {
    id: number;
    name: string;
    candidates: Candidate[];
}

export const stages: Stage[] = [
    {
        id: 1,
        name: 'Первичный отбор',
        candidates: [
            { id: 1, name: 'Иван Иванов', status: 'pending' },
            { id: 2, name: 'Петр Петров', status: 'pending' }
        ]
    },
    {
        id: 2,
        name: 'Техническое интервью',
        candidates: [
            { id: 3, name: 'Сергей Сергеев', status: 'pending' },
            { id: 3, name: 'Сергей Сергеев', status: 'pending' }
        ]
    },
    {
        id: 3,
        name: 'Финальное интервью',
        candidates: [
            { id: 3, name: 'Сергей Сергеев', status: 'pending' }
        ]
    }
];
