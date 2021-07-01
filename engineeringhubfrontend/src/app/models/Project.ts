/*
{
        "id": 1,
        "owningUser": 1,
        "owningGroup": 1,
        "name": "Semester Project #1",
        "created": "2021-06-18T04:24:57Z",
        "complete": false,
        "relatedProposal": 1,
        "interestedUsers": [],
        "private": false,
        "project_skills": [
            {
                "id": 4,
                "name": "Apache Web Server"
            }
        ],
        "project_discliplines": [
            {
                "id": 2,
                "name": "Algorithms"
            },
            {
                "id": 1,
                "name": "AI/ML"
            }
        ]
    }
    */

import { Disclipline } from "./Disclipline";
import { Skill } from "./Skill";

export interface Project {
    id: number,
    owningUser: number,
    owningGroup: number,
    name: string,
    created: Date,
    complete:boolean,
    relatedProposal: number,
    interestedUsers: number[],
    private:boolean,
    project_skills: Skill[],
    project_discliplines: Disclipline[]
}