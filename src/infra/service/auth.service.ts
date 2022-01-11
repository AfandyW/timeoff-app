import { hassPassword, comparePassword } from "./../../infra/helper/security/bycrpt";
import { createToken, ITokenData } from "./../../infra/helper/security/jwt";
import { userRepo } from "./../../infra/repository";

export class AuthService{
    async login(
        data: {
            username: string,
            password: string
        }
    ): Promise<ITokenData> {

        const user = await userRepo.findByUsername(data.username)
        const password = await hassPassword(data.password)

        await comparePassword(user.password, password)

        const token = await createToken(user)

        return token
    }
}