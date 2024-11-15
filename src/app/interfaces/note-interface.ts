export interface NoteInterface {
    id: string;
    author: string;
    date: [number, number, number];
    section:
        | 'Пожарная автоматика'
        | 'Охранная сигнализация'
        | 'Управление доступом'
        | 'Видеонаблюдение';
    equipName: string;
    faultDescript: string;
    isCompleted: boolean;
    solutionDescript: string | null;
}
