import { Task } from '@/types';

export interface IProjectState {
  tasks: Task[];
}

const state: IProjectState = {
  tasks: [],
};

export default state;
