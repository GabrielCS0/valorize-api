export default {
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '30s'
  }
}
