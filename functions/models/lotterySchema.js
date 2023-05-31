const mongoose = require('mongoose');

const lotterySchema = mongoose.Schema({
    lottery_no: {
        type: String,
        require: true
    },
    reward_no: {
        type: Number,
        require: true
    },
    id: {
        type: String,
        lowercase: true,
        unique: true
    }
}
,{timestamps: true})

module.exports = mongoose.model("lottery", lotterySchema)