export interface IAuthService {
    supabase_url : string
    anon_key : string
}
export interface ConfigData {
    authService : IAuthService
  }