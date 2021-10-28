import Joi from "joi";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import { User } from "../../models";
import bcrypt from 'bcrypt';
import JwtService from "../../services/JwtService";

const registerController = {
   async register(req, res, next){

        //validate the request
            const registerSchema = Joi.object({
                name:Joi.string().min(3).max(30).required(),
                email:Joi.string().email().required(),
                password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
                repeat_password:Joi.ref('password')
            });
            console.log(req.body)
            const { error }= registerSchema.validate(req.body);

            if (error){
                return next(error);
            }

            //Check if user in the database already
            try{
                const exist = await User.exists({email:req.body.email});
                if(exist){
                    return next(CustomErrorHandler.alreadyExist('This Email is already Taken'));
                }
            }catch(err){
                return next(err);
            }

            //hash password

            const{name, email,password}=req.body;
            const hashPassword = await bcrypt.hash(req.body.password, 10);

        
        //prepare model
                const user = new User({
                    name:name,
                    email:email,
                    password:hashPassword


                })
        // store in database
        let access_token;
                try{
                    const result = await user.save();
                    console.log(result);
                  // generate jwt token
                    access_token = JwtService.sign({_id:result._id, role:result.role});
                





                }catch(err){
                    return next(err);
                }

     

        // send response


        res.json({access_token:access_token});
    }
}


export default registerController;