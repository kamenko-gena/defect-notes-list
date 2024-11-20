import { UserInterface } from './user-interface';

export interface NoteInterface {
    id: string;
    author: UserInterface;
    date: [number, number, number];
    section: string;
    equipName: string;
    faultDescript: string;
    isCompleted: boolean;
    solutionDescript: string | null;
}
