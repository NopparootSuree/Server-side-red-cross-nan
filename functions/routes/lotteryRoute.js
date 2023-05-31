const express = require('express')
const router = express.Router()
const { create_lottery, get_lotterys, get_lottery, remove_lottery, update_lottery
    , reward_no1, reward_no2, reward_no3, reward_no4, reward_no5, reward_no6, reward_no7, checkLottery } = require('../controllers/lotteryController')
// const { requireLogin } = require('../controllers/loginController')

router.post('/create', create_lottery)
router.get('/lotterys', get_lotterys)
router.get('/lottery/:id', get_lottery)
router.delete('/lottery/:id', remove_lottery)
router.put('/lottery/:id', update_lottery)
router.get('/reward_no1', reward_no1)
router.get('/reward_no2', reward_no2)
router.get('/reward_no3', reward_no3)
router.get('/reward_no4', reward_no4)
router.get('/reward_no5', reward_no5)
router.get('/reward_no6', reward_no6)
router.get('/reward_no7', reward_no7)
router.post('/checkLottery', checkLottery)

module.exports = router