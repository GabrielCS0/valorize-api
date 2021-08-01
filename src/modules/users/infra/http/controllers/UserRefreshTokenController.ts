import { UserRefreshTokenService } from '@modules/users/services/UserRefreshTokenService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class UserRefreshTokenController {
  async handle (req: Request, res: Response): Promise<Response> {
    const { refreshTokenId } = req.body

    const userRefreshTokenService = container.resolve(UserRefreshTokenService)

    const refreshToken = await userRefreshTokenService.execute(refreshTokenId)

    return res.status(200).json(refreshToken)
  }
}
