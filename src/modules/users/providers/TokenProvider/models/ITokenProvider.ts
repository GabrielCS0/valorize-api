export interface ITokenProvider {
  generateToken (
    userEmail: string,
    userId: string
  ): string
}
