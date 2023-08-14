import { User } from './User'
import { Message } from './Message'

export interface Forum {
  id: string
  name: string
  private: boolean
  admin: User
  users: User[]
  messages: Message[]
  requests: User[]
}