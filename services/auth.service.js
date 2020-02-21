const { hash, compare } = require('../libs/bcrypt');
const { sign, verify } = require('../libs/jwt');
const { UserModel } = require('../models/user.model')

class AuthService {

    static async signUp(account, password, email ,name, phone){
        const passwordHash = await hash(password);
        if(!passwordHash) throw new Error('CANNOT_FIND_USER')
        const user = await UserModel.create(
            {
                account,
                password: passwordHash, 
                email,
                name, 
                phone,
                level: 2, 
                status: 1
            })
        if(!user) throw new Error('CANNOT_CREATE_USER')
        return{
            _id: user._id,
            account: user.account,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            phone: user.phone,
            level: user.level,
            status: user.status
        }
    }

    static async signIn(account, password){
        const user = await UserModel.findOne({ account })
        if(!user) throw new Error('Tài khoản hoặc mật khẩu không chính xác!')
        const checkPass = await compare(user.password, password)
        if(!checkPass) throw new Error('Tài khoản hoặc mật khẩu không chính xác!')
        const token = await sign({ _id: user._id })
        if(!token) throw new Error('CANNOT_CREATE_TOKEN')
        return{
            user:{
                _id: user._id,
                account: user.account,
                email: user.email,
                name: user.name,
                avatar: user.avatar,
                level: user.level,
                status: user.status
            },
            token
        }

    }
    static async signInToken(token){
        const data = await verify(token);
        const {account, password} = data;
        return this.signIn(account, password)
        .then(async result => {
            const data = await sign(result.user)
            console.log(data)
            return {
                user : data,
                token: result.token
            }
        })
    }
}
module.exports = { AuthService }
