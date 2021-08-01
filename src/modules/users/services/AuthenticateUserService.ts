import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { IAuthenticateUserDTO } from '../dtos/IAuthenticateUserDTO'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { IRefreshTokenProvider } from '../providers/RefreshTokenProvider/models/IRefreshTokenProvider'
import { ITokenProvider } from '../providers/TokenProvider/models/ITokenProvider'
import { IHashPasswordProvider } from '../providers/HashPasswordProvider/models/IHashPasswordProvider'
import { IRefreshTokenRepository } from '../repositories/IRefreshTokenRepository'

@injectable()
export class AuthenticateUserService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RefreshTokenRepository')
    private refreshTokenRepository: IRefreshTokenRepository,

    @inject('RefreshTokenProvider')
    private refreshTokenProvider: IRefreshTokenProvider,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,

    @inject('HashPasswordProvider')
    private hashPasswordProvider: IHashPasswordProvider
  ) {}

  async execute ({ email, password }: IAuthenticateUserDTO): Promise<Object> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) throw new AppError('Email or Password incorrect')

    const matchPassword = await this.hashPasswordProvider
      .compareHash(password, user.password)

    if (!matchPassword) throw new AppError('Email or Password incorrect')

    const token = this.tokenProvider.generateToken(user.email, user.id)

    await this.refreshTokenRepository.deleteByUserId(user.id)
    const refreshToken = await this.refreshTokenProvider.generateToken(user.id)

    return { token, refreshToken }
  }
}
