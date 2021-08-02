import { sign } from 'jsonwebtoken'
import { ITokenProvider } from '../models/ITokenProvider'

export class FakeTokenProvider implements ITokenProvider {
  public generateToken (userEmail: string, userId: string): string {
    const token = sign({
      email: userEmail
    }, 'secret7649874q12432lts', {
      subject: userId,
      expiresIn: '7s'
    })

    return token
  }
}
