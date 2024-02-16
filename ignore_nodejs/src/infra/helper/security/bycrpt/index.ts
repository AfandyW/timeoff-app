import bcrypt from 'bcrypt'
import { NotFoundError } from '../../error'

export async function hassPassword(plainPassword: string): Promise<string>{
    const hashedPassword = await bcrypt.hash(plainPassword, 10)
    return hashedPassword
} 

export async function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean>{
    const comparePass = await bcrypt.compare(plainPassword, hashedPassword)

    if (!comparePass) throw new NotFoundError("Wrong Password")

    return comparePass
}