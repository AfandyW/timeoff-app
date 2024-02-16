
import { User } from './../../../domain/user/model'

import jwt from 'jsonwebtoken'

interface IDataStoredInToken {
    employee_id: number,
    user_id: number,
}

export interface ITokenData{
    token : string,
    expiresIn : number,
}

export async function createToken(user: User): Promise<ITokenData>{
    const exp = parseInt(process.env.JWT_EXP!)
    const expiresIn = 60 * exp;
    const secret = process.env.JWT_SECRET!;
    const dataStoredInToken: IDataStoredInToken = {
        employee_id: user.employee_id!,
        user_id: user.id!,
    };
    return {
        token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        expiresIn,
    };

}