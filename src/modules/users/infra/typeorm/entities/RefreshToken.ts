import { Column, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('refresh_token')
class RefreshToken {
  @PrimaryColumn()
  readonly id: string

  @Column({ name: 'expires_in' })
  expiresIn: number

  @Column({ name: 'user_id' })
  userId: string

  constructor () {
    if (!this.id) this.id = uuid()
  }
}

export { RefreshToken }
