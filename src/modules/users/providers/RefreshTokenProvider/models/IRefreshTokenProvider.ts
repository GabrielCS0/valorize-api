import { RefreshToken } from '@modules/users/infra/typeorm/entities/RefreshToken'

export interface IRefreshTokenProvider {
  generateToken(userId: string): Promise<RefreshToken>
}
