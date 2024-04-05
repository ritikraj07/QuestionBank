const Mail = require("../Script/mail")

let count = 0;
const SendMail = (req, res, next) => {
    const mail = new Mail();
    mail.setTo("ritikra3rrr@gmail.com");
    mail.setSubject(`Sheet Downloaded`);
    mail.setText(`Download number ${count}`)
    mail.send();
    count++;
    next();
}

module.exports = SendMail;