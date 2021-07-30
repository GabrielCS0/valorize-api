import { Request, Response } from 'express'
import rateLimit from 'express-rate-limit'

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 110,
  keyGenerator (req: Request): string {
    return req.ip
  },
  handler (_, res: Response): void {
    res.status(429).json({
      status: 'error',
      message: 'Too many requests, please try again later.'
    })
  }
})
