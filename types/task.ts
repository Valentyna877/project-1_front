export interface GetTask {
    _id: string;
    name: string;
    date: string;
    isDone: boolean;
}

export interface GetAllTasks {
    result: Array<GetTask>;
} 

export interface TaskDone {
    isDone: boolean;
}

export interface Task {
  name: string;
  date: string;
  isDone: boolean;
}
