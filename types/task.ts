
export interface GetAllTasks {
    _id: string;
    name: string;
    date: string;
    isDone: boolean;
} 



export interface TaskDone {
    isDone: boolean;
    taskId: string;
}

export interface Task {
  name: string;
  date: string;
  isDone: boolean;
}
