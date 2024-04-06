export interface IAuthService {
    signUp(data : any): Promise<any>;
    login(data : any): Promise<any>;
  }