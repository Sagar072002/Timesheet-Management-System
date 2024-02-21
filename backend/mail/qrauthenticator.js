const qrcode=require('qrcode')
const {authenticator}=require('otplib')
const { User } = require("../db");



async function qrgen(req,res){
    try {
        const {id}=req.body;
        const secret=authenticator.generateSecret();
        const uri=authenticator.keyuri(id,`Your Mail:${id}`,secret)
        console.log("hell",secret)
        const image=await qrcode.toDataURL(uri);
        return res.status(200).json({
            temp:secret,
            image:image
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            error:error.message
        })
    }


}
async function set2fa(req,res){
    try {
        const {email,temp,code}=req.body;
        var user = await User.findOne({ where: { email } });
        console.log(user.email)
        console.log(user)
        const ver=authenticator.check(code,temp)
        console.log(ver,code,temp)
        if(ver){
            user.twofa=temp
            await user.save()
            console.log(ver)
            return res.status(200).json({
                success:true,
                "twofa":user.twofa
            })
        }
        else{
            return res.status(500).json({
                success:false,
                message:"invalid Auth Code"
            })
        }
        
        
    } catch (error) {
        return res.status(500).send({
            success:false,
            error:error.message
        })
    }


}



module.exports={qrgen,set2fa}