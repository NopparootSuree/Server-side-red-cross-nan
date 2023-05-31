const LotterySchema = require('../models/lotterySchema')
const { v4: uuidv4 } = require('uuid');

exports.create_lottery = (req, res) => {
    const { lottery_no , reward_no } = req.body

    let id = uuidv4();

    let len_lottery = lottery_no.toString().length
    let len_reward = reward_no.toString().length

    if(!lottery_no || len_lottery != 6){
        return res.status(400).json({error: "กรุณาป้อนเลขหวยให้ครบ"})
    }

    if(!reward_no || len_reward != 1){
        return res.status(400).json({error: "กรุณาป้อนลำดับรางวัล"})
    }

    //เพิ่มข้อมูลลงในฐานข้อมูล
    LotterySchema.create({id, lottery_no, reward_no},(err, lottery) => {
        if(err) {
            res.status(400).json({error: "มีเลขซ้ำกัน"})
        }
        res.json(lottery)
    })
}

//ดึงข้อมูลทึกข้อมูลจาก Databaseโดยใช้ find(คำสั่ง Mongo)
exports.get_lotterys = (req, res) => {
    LotterySchema.find({}).sort({ "reward_no" : 1 }).exec((err, lottery) => {
        res.json(lottery)
    })
}

exports.reward_no1 = (req, res) => {
    LotterySchema.find({ reward_no: {$eq:1}}).exec((err, lottery) => {
        res.json(lottery)
    })
}

exports.reward_no2 = (req, res) => {
    LotterySchema.find({ reward_no: {$eq:2}}).exec((err, lottery) => {
        res.json(lottery)
    })
}

exports.reward_no3 = (req, res) => {
    LotterySchema.find({ reward_no: {$eq:3}}).exec((err, lottery) => {
        res.json(lottery)
    })
}

exports.reward_no4 = (req, res) => {
    LotterySchema.find({ reward_no: {$eq:4}}).exec((err, lottery) => {
        res.json(lottery)
    })
}

exports.reward_no5 = (req, res) => {
    LotterySchema.find({ reward_no: {$eq:5}}).exec((err, lottery) => {
        res.json(lottery)
    })
}

exports.reward_no6 = (req, res) => {
    LotterySchema.find({ reward_no: {$eq:6}}).exec((err, lottery) => {
        res.json(lottery)
    })
}

exports.reward_no7 = (req, res) => {
    LotterySchema.find({ reward_no: {$eq:7}}).exec((err, lottery) => {
        res.json(lottery)
    })
}


//ดึงบทความที่เราสนใจอ้างอิงจาก slug
exports.get_lottery = (req, res) => {
    const { id } = req.params 
    LotterySchema.findOne({id}).exec((err, lottery) => {
        res.json(lottery)
    })
}

exports.checkLottery = (req, res) => {
    let { lottery_no } = req.body
    let lottery_slice = lottery_no.slice(3)
    let lottery3 = `xxx${lottery_slice}`
    LotterySchema.find({ $or : [ {lottery_no: lottery_no}, {lottery_no: lottery3}]}).exec((err, lottery) => {
        res.json(lottery)
    })
}

//ลบข้อมูลอ้างอิงจาก slug
exports.remove_lottery = (req, res) => {
    const { id } = req.params
    LotterySchema.findOneAndRemove({id}).exec((err, lottery) => {
        if(err) console.log(err)
        res.json({
            message: "ลบข้อมูลเรียบร้อย"
        })
    })
}

exports.update_lottery = (req, res) => {
    const { id } = req.params
    //ส่งข้อมูล => title , content, author
    const { lottery_no, reward_no } = req.body

    LotterySchema.findOneAndUpdate({id}, {lottery_no, reward_no}, {new: true}).exec((err, lottery) => {
        if (err) console.log(err);
        res.json(lottery)
    })
}