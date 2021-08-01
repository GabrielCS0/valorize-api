import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { IRefreshTokenRepository } from '../repositories/IRefreshTokenRepository'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { ITokenProvider } from '../providers/TokenProvider/models/ITokenProvider'
import { IRefreshTokenProvider } from '../providers/RefreshTokenProvider/models/IRefreshTokenProvider'
import dayjs from 'dayjs'

@injectable()
export class UserRefreshTokenService {
  constructor (
    @inject('RefreshTokenRepository')
    private refreshTokenRepository: IRefreshTokenRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,

    @inject('RefreshTokenProvider')
    private refreshTokenProvider: IRefreshTokenProvider
  ) {}

  async execute (refreshTokenId: string) {
    const refreshToken = await this.refreshTokenRepository.findById(refreshTokenId)

    if (!refreshToken) throw new AppError('Refresh Token does not exists')

    const user = await this.usersRepository.findById(refreshToken.userId)
    const token = this.tokenProvider.generateToken(user.email, user.id)

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    )

    if (refreshTokenExpired) {
      await this.refreshTokenRepository.deleteByUserId(user.id)

      const refreshToken = await this.refreshTokenProvider.generateToken(
        user.id
      )

      return { token, refreshToken }
    }

    return { token }
  }
}
