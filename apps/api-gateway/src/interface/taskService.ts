export interface ITaskService {
    signUp(data : any): Promise<any>;
    login(data : any): Promise<any>;
  }