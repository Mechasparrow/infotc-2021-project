export interface GroupEvent {
    id: number, 
    group: number, 
    name: string,
    timeStart: Date,
    timeEnd: Date,
    description: string,
    location: string,
    users: number[]
}