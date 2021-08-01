import { compare, hash } from 'bcryptjs'
import { IHashPasswordProvider } from '../models/IHashPasswordProvider'

export class HashPasswordProvider implements IHashPasswordProvider {
  generateHash (password: string): Promise<string> {
    return hash(password, 8)
  }

  compareHash (password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword)
  }
}
