import { IGenerateRefreshTokenDTO } from '@modules/users/dtos/IGenerateRefreshTokenDTO'
import { RefreshToken } from '@modules/users/infra/typeorm/entities/RefreshToken'
import { IRefreshTokenRepository } from '../IRefreshTokenRepository'

export class FakeRefreshTokenRepository implements IRefreshTokenRepository {
  private refreshTokens: RefreshToken[] = []

  public async findById (id: string): Promise<RefreshToken | undefined> {
    const refreshToken = this.refreshTokens.find(refreshToken => refreshToken.id === id)
    return refreshToken
  }

  public async create ({ userId, expiresIn }: IGenerateRefreshTokenDTO): Promise<RefreshToken> {
    const refreshToken = new RefreshToken()

    Object.assign(refreshToken, { userId, expiresIn })

    return refreshToken
  }

  public async save (refreshToken: RefreshToken): Promise<void> {
    this.refreshTokens.push(refreshToken)
  }

  public async deleteByUserId (userId: string): Promise<void> {
    this.refreshTokens.forEach(refreshToken => {
      if (refreshToken.userId === userId) {
        refreshToken = undefined
      }
    })
  }
}
