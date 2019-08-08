const categoryController = require('../category/controller')

async function categories(req, res, next){
    global.categories = await categoryController.findAllCategory();
    next()
}

module.exports = {categories}