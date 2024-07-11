import { Task } from '../../types';

export interface ITaskState {
  tasks: Task[];
}

const state: ITaskState = {
  tasks: [],
};

export default state;
