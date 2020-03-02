const { MotelModel } = require('../models/motel.model')
const { UserModel } = require('../models/user.model')
const { RoomModel } = require('../models/room.model')
class MotelService {
    static async create_motel(author, motel_name, description, address, county, city, district, qty_room) {
        const auth = UserModel.findOne({_id: author})
        console.log('auth: '+ (await auth))
        if(!(await auth)) throw new Error ('Tai khoan cua ban khong ton tai')
        return MotelModel.create({
            author,
            motel_name,
            description,
            address,
            county,
            city,
            district,
            qty_room,
            status: 1
        }).then(async motel => {
            for (let index = 0; index < motel.qty_room; index++) {
                await RoomModel.create(
                    {
                        name:`Room ${index + 1}`,
                        status: true,
                        enter_date: Date.now(),
                        motel: motel._id
                    }
                ).then(async result => {
                    const t = await MotelModel.findByIdAndUpdate(
                        {_id:motel._id},
                        {
                            $addToSet:{rooms:result._id}
                        },
                        {new : true}
                    )
                })
            }
            const userUpdate = await UserModel.findByIdAndUpdate(
                {_id:author},
                {
                    $addToSet: {motels: motel._id}
                },
                {new: true}
            ).select('email name')
            return {motel,userUpdate}
        })
    }
}

module.exports = { MotelService }
