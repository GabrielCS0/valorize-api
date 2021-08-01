import { IGenerateRefreshTokenDTO } from '../dtos/IGenerateRefreshTokenDTO'
import { RefreshToken } from '../infra/typeorm/entities/RefreshToken'

export interface IRefreshTokenRepository {
  findById(id: string): Promise<RefreshToken | undefined>
  create(data: IGenerateRefreshTokenDTO): Promise<RefreshToken>
  save(refreshToken: RefreshToken): Promise<void>
  deleteByUserId(userId: string): Promise<void>
}
