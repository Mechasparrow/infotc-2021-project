import { College } from "./College";
import { Disclipline } from "./Disclipline";
import { Major } from "./Major";
import { Skill } from "./Skill";

export interface User {
    id: number;
    username: string;
    email: string;
    user_skills: Skill[];
    user_discliplines: Disclipline[];
    majors: Major[];
    colleges: College[];
}