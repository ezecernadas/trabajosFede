require('dotenv').config();
const apik = process.env.API_KEY;
function chechAPK(req, res, next){
    const apk_h = req.headers['x-api-key'];
    if(apk_h && apk_h === apik){
        next();
    }else{
        res.status(401).json({message: "APK Invalida"});
    }
}

module.exports = chechAPK;