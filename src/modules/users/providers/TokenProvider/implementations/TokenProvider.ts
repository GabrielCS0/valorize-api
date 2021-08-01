import auth from '@config/auth'
import { sign } from 'jsonwebtoken'
import { ITokenProvider } from '../models/ITokenProvider'

export class TokenProvider implements ITokenProvider {
  generateToken (
    userEmail: string,
    userId: string
  ): string {
    const { secret, expiresIn } = auth.jwt

    const token = sign({
      email: userEmail
    }, secret, {
      subject: userId,
      expiresIn
    })

    return token
  }
}
