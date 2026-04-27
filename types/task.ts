export interface Task {
    _id: string;
    name: string;
    data: string;
    isDone: boolean;
}

export interface GetAllTasks {
    result: Array<Task>;
} 

export interface TaskDone {
    isDone: boolean;
}