import { messagesFromServer } from './message'
import { usersFromServer } from './user'

export const forumsFromServer = [
  {
    id: "1",
    name: "Chat",
    private: false,
    admin: usersFromServer[0],
    users: [usersFromServer[0]],
    messages: [messagesFromServer[0], messagesFromServer[1]],
    requests: [],
  },
  {
    id: "2",
    name: "Chat2",
    private: false,
    admin: usersFromServer[1],
    users: [usersFromServer[1]],
    messages: [],
    requests: [],
  },
  {
    id: "3",
    name: "Chat1",
    private: true,
    admin: usersFromServer[2],
    users: [usersFromServer[2]],
    messages: [],
    requests: [usersFromServer[1]],
  }
]
