export interface IHashPasswordProvider {
  generateHash(password: string): Promise<string>
  compareHash(password: string, hashedPassword: string): Promise<Boolean>
}
