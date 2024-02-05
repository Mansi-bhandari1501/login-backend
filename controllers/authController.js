import { comparePassword, hashPassword } from '../helpers/authHelper.js'
import userModel from '../models/userModel.js';
import JWT from "jsonwebtoken";

export const registerController = async (req, resp) => {
    try {
        const { name, email, password,address, phone , answer } = req.body
        //validations
        if (!name) {
            return resp.send({ error: 'Name is required' })
        }
        if (!email) {
            return resp.send({ error: 'email is required' })
        }
        if (!password) {
            return resp.send({ error: 'password is required' })
        }
        if (!phone) {
            return resp.send({ error: 'phone no.is required' })
        }
        if (!address) {
            return resp.send({ error: 'address is required' })
        }
        if (!address) {
            return resp.send({ error: 'answer is required' })
        }
        //check user
        const existinguser = await userModel.findOne({ email });
        //existing user
        if (existinguser) {
            return resp.status(200).send({
                success: true,
                message: 'Already Register please login'
            })
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save password
        const user =  await new userModel({
          name,
          email,
          address,
          password:hashedPassword,
          phone,
          answer,
          }).save();
        
         resp.status(201).send({
            success:true,
            message:'user Register Successfully',
            user
        })
    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message: 'Error in Registeration ',
            error
        })
    }

}


// export const loginController = async(req, resp)=>{
//     const {email,password}=req.body;
//     try {
//         const isuserValid = await userModel.findOne({email})

//         if(!isuserValid){
//             throw new Error("user does not exist");
//         }
//         const isPasswordCorrect = comparePassword(password,isuserValid.password);
//         if(!isPasswordCorrect){
//             throw new Error("password not correct");
//         }
//         resp.status(200).json({
//             message:"user logged in successfully"
//         })
//     } catch (error) {
//         console.log(error);
//         resp.status(500).json({
//             error: "user logged in failed"
//         })
//     }
// }


// POST LOGIN
export const loginController = async (req, res) => {
    try {
      const { email, password } = req.body;
      //validation
      if (!email || !password) {
        return res.status(404).send({
          success: false,
          message: "Invalid email or password",
        });
      }
      //check user
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Email is not registerd",
        });
      }
      const match = await comparePassword(password, user.password);
      if (!match) {
        return res.status(200).send({
          success: false,
          message: "Invalid Password",
        });
      }
      //TOKEN
      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({
        success: true,
        message: "login successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          adddress: user.address,
          role: user.role,
          answer: user.answer,
        },
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in login",
        error,
      });
    }
  };
  //forgotPasswordController

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
  //test controller
  export const testController = (req,res)=>{
    console.log('protected Router');
  }
// export default {registerController};