const { MotelModel } = require('../models/motel.model')
const { UserModel } = require('../models/user.model')
const { RoomModel } = require('../models/room.model')
class MotelService {
    static async create_motel(author, motel_name, description, address, county, city, district, qty_room) {
        const auth = UserModel.findOne({_id: author})
        if(!auth) throw new Error ('Tai khoan cua ban khong ton tai')
        await MotelModel.create({
            author,
            motel_name,
            description,
            address,
            county,
            city,
            district,
            qty_room,
            status: 1
        }).then(result => result)
        console.log('motel: ' + motel);
        if(!motel) throw new Error ('Loi! Khong the tao thong tin nha tro.')
        for (let index = 0; index < motel.qty_room; index++) {
            console.log(index)
            await RoomModel.create(
                {
                    name:`Room ${index + 1}`,
                    status: true,
                    enter_date: Date.now(),
                    motel: motel._id
                }
            ).then(async result => {
                await MotelModel.findByIdAndUpdate(
                    {_id:motel._id},
                    {
                        $addToSet:{rooms:result._id}
                    },
                    {new : true}
                )
            })
            // console.log(roomInsert);
            // const motelUpdate = await MotelModel.findByIdAndUpdate(
            //     {_id:motel._id},
            //     {
            //         $addToSet:{rooms:roomInsert._id}
            //     },
            //     {new : true}
            // )
            // console.log(motelUpdate);
        }
        
        const userUpdate = await UserModel.findByIdAndUpdate(
            {_id:author},
            {
                $addToSet: {motels: motel._id}
            }
        ).select('email name')
        console.log(userUpdate)
        return {motel,userUpdate}
    }
}

module.exports = { MotelService }
