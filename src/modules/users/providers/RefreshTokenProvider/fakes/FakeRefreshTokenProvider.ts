import { RefreshToken } from '@modules/users/infra/typeorm/entities/RefreshToken'
import { FakeRefreshTokenRepository } from '@modules/users/repositories/fakes/FakeRefreshTokenRepository'
import { IRefreshTokenProvider } from '../models/IRefreshTokenProvider'
import dayjs from 'dayjs'

export class FakeRefreshTokenProvider implements IRefreshTokenProvider {
  constructor (
    private fakeRefreshTokenRepository: FakeRefreshTokenRepository
  ) {}

  public async generateToken (userId: string): Promise<RefreshToken> {
    const expiresIn = dayjs().add(7, 'second').unix()

    const refreshToken = await this.fakeRefreshTokenRepository.create({
      userId,
      expiresIn
    })

    await this.fakeRefreshTokenRepository.save(refreshToken)
    return refreshToken
  }
}
