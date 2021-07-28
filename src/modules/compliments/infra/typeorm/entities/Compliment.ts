import { Tag } from '@modules/tags/infra/typeorm/entities/Tag'
import { User } from '@modules/users/infra/typeorm/entities/User'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('compliments')
export class Compliment {
  @PrimaryColumn()
  readonly id: string

  @Column({ name: 'user_sender' })
  userSenderId: string

  @JoinColumn({ name: 'user_sender' })
  @ManyToOne(() => User)
  userSender: User

  @Column({ name: 'user_receiver' })
  userReceiverId: string

  @JoinColumn({ name: 'user_receiver' })
  @ManyToOne(() => User)
  userReceiver: User

  @Column({ name: 'tag_id' })
  tagId: string

  @JoinColumn({ name: 'tag_id' })
  @ManyToOne(() => Tag)
  tag: Tag

  @Column()
  message: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  constructor () {
    if (!this.id) this.id = uuid()
  }
}
