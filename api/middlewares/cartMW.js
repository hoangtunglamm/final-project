
const cartMW = (req, res, next) =>{
    global.carts = req.session.cart || [];
    next() 
}
module.exports ={cartMW}