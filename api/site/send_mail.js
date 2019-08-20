const nodemailer  = require('nodemailer')
const sendMailOder = (mail ) =>{
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		  user: 'lamptit96@gmail.com',
		  pass: 'meyuptrmbhplvsnn'
		}
	  });
      let email = [mail]
	  const mailOptions = {
		from: 'lam hoang',
		to: email,
		subject: 'HTLam-project',
        text: 'cảm ơn anh đã đọc đến tận chỗ này :3'
    
	  };
	  
	  transporter.sendMail(mailOptions, function(error, info){
		if (error) {
		  console.log(error);
		} else {
		  console.log('Email sent: ' + info.response);
		  res.json(req.body)
		}
	  });
}

module.exports = {sendMailOder}