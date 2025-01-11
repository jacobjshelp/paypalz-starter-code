import express, { Request, Response } from 'express'
import MemberAndGroupService from './services/MemberAndGroupService'
import AuthService from './services/AuthService'
import 'dotenv/config'

const jwtSecret = process.env.JWT_SECRET
if (!jwtSecret) throw new Error('Missing ENV variables')

const memberAndGroupService = new MemberAndGroupService()
const authService = new AuthService(jwtSecret)

const port = 3000
const app = express()
app.use(express.json())

app.get('/groups', async (req: Request, res: Response) => {
  const username = req.query.username

  const groups = await memberAndGroupService.getGroupsForUser(
    username as string
  )

  res.status(200).json(groups)
})

app.post('/authenticate', async (req: Request, res: Response) => {
  const { username, password } = req.body

  const { status, message } = await authService.checkCredentials(
    username,
    password
  )

  if (status === 200) {
    const token = authService.generateToken(username)
    res.status(status).json({ token, username })
  } else {
    res.status(status).json({ message })
  }
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})