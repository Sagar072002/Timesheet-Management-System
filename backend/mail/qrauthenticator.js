const qrcode=require('qrcode')
const {authenticator}=require('otplib')
const { User } = require("../db");

//function to generate qr code and two factor authentication code 
// verification is done by set2fa function
//if its verified it will be stored in database
async function qrgen(req,res){
    try {
        const {id}=req.body;
        const secret=authenticator.generateSecret();
        const uri=authenticator.keyuri(id,`Your Mail:${id}`,secret)
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
//verify 2FA with 6-digit one time code
async function set2fa(req,res){
    try {
        const {email,temp,code}=req.body;
        var user = await User.findOne({ where: { email } });
        const ver=authenticator.check(code,temp)
        if(ver){
            user.twofa=temp
            await user.save()
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