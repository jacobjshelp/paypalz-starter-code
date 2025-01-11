import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import prisma from '../../prisma/PrismaClient'

class AuthService {
  constructor(private jwtSecret: string) {}

  public generateToken = (username: string): string => {
    return jwt.sign({ userId: username }, this.jwtSecret, {
      expiresIn: '1h',
    }) // Token expires in 1 hour
  }

  public hashPassword(password: string): Promise<string> {
    const saltRounds = 10

    return new Promise((resolve, reject) => {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) reject(err)
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) reject(err)
          resolve(hash)
        })
      })
    })
  }

  public async checkCredentials(username: string, password: string) {
    const successResult = {
      status: 200,
      message: 'Successfully authenticated',
    }
    const failResult = { status: 401, message: 'Invalid credentials' }
    try {
      const user = await prisma.member.findUniqueOrThrow({
        where: { username },
      })

      const passwordMatch = await bcrypt.compare(password, user.hashed_password)

      if (passwordMatch) {
        return successResult
      } else {
        return failResult
      }
    } catch (error) {
      return failResult
    }
  }
}

export default AuthService
