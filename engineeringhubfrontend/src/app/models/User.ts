import { Disclipline } from "./Disclipline";
import { Skill } from "./Skill";

export interface User {
    id: number;
    username: string;
    email: string;
    user_skills: Skill[];
    user_discliplines: Disclipline[];
}