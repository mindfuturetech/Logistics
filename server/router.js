const { Router } = require('express')
const controller = require('./controller/freight')
const router = Router()


router.get("/list-freight", controller.ListFreight)
router.post("/add-freight", controller.AddFreight)
router.post("/update-freight", controller.UpdateFreight)


module.exports = router