import { IHashPasswordProvider } from '../models/IHashPasswordProvider'

export class FakeHashPasswordProvider implements IHashPasswordProvider {
  public async generateHash (password: string): Promise<string> {
    return password
  }

  public async compareHash (password: string, hashedPassword: string): Promise<boolean> {
    return password === hashedPassword
  }
}
