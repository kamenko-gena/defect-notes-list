export interface NoteInterface {
    date: string;
    section:
        | 'Пожарная автоматика'
        | 'Охранная сигнализация'
        | 'Управление доступом'
        | 'Видеонаблюдение';
    equipName: string;
    faultDescript: string;
    solutionCheck: boolean;
    solutionDescript: string | null;
}
