import { IGenerateRefreshTokenDTO } from '@modules/users/dtos/IGenerateRefreshTokenDTO'
import { IRefreshTokenRepository } from '@modules/users/repositories/IRefreshTokenRepository'
import { getRepository, Repository } from 'typeorm'
import { RefreshToken } from '../entities/RefreshToken'

export class RefreshTokenRepository implements IRefreshTokenRepository {
  private ormRefreshTokenRepository: Repository<RefreshToken>

  constructor () {
    this.ormRefreshTokenRepository = getRepository(RefreshToken)
  }

  public async findById (id: string): Promise<RefreshToken | undefined> {
    const refreshToken = await this.ormRefreshTokenRepository.findOne(id)
    return refreshToken
  }

  public async create ({ userId, expiresIn }: IGenerateRefreshTokenDTO): Promise<RefreshToken> {
    const refreshToken = this.ormRefreshTokenRepository.create({
      userId,
      expiresIn
    })

    return refreshToken
  }

  public async save (refreshToken: RefreshToken): Promise<void> {
    await this.ormRefreshTokenRepository.save(refreshToken)
  }

  public async deleteByUserId (userId: string): Promise<void> {
    await this.ormRefreshTokenRepository.delete({ userId })
  }
}
