import { RefreshToken } from '@modules/users/infra/typeorm/entities/RefreshToken'
import { RefreshTokenRepository } from '@modules/users/infra/typeorm/repositories/RefreshTokenRepository'
import { IRefreshTokenRepository } from '@modules/users/repositories/IRefreshTokenRepository'
import { IRefreshTokenProvider } from '../models/IRefreshTokenProvider'
import dayjs from 'dayjs'

export class RefreshTokenProvider implements IRefreshTokenProvider {
  private refreshTokenRepository: IRefreshTokenRepository

  constructor () {
    this.refreshTokenRepository = new RefreshTokenRepository()
  }

  public async generateToken (userId: string): Promise<RefreshToken> {
    const expiresIn = dayjs().add(30, 'second').unix()

    const refreshToken = await this.refreshTokenRepository.create({
      userId,
      expiresIn
    })

    await this.refreshTokenRepository.save(refreshToken)

    return refreshToken
  }
}
