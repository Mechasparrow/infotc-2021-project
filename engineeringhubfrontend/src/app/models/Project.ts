import { Disclipline } from "./Disclipline";
import { Skill } from "./Skill";

export interface Project {
    id: number,
    owningUser: number,
    owningGroup: number,
    description:string,
    name: string,
    created: Date,
    complete:boolean,
    relatedProposal: number,
    interestedUsers: number[],
    private:boolean,
    project_skills: Skill[],
    project_discliplines: Disclipline[]
}