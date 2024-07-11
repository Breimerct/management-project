import { Project } from '../../types';

export interface IProjectState {
  projects: Project[];
}

const state: IProjectState = {
  projects: [],
};

export default state;
