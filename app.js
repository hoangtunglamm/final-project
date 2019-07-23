const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');


const categoryRouter = require('./api/category/route')
const productRouter = require('./api/product/route')
const authRouter = require('./api/auth/router')
const userRouter = require('./api/user/route')

let app = express();
const port = 8000;


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000
   }
}))
app.use('/static', express.static(__dirname + '/public'));

app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');


	
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));

	
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/final-project', {useNewUrlParser: true}, err => {
    if (err) console.error(err);
    else console.log("Database connect successful");
  });


app.use('/category', categoryRouter)
app.use('/product', productRouter)
app.use('/auth', authRouter)
app.use('/user', userRouter)

app.get('/', (req, res) =>{
    console.log(req.sessionID)
    res.send('ok')
})

app.listen(port, (err) =>{
    if(err) console.log(err)
    else console.log('Server is running on port '+port)
})