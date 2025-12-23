import userModal from "../modals/userModal.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
// Login function
const loginUser = async (req, res) => {
    const {email,password} = req.body

    try {
        const user = await userModal.findOne({email})
        if(!user) return res.json({message:"User not found",success:false});
    
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch) return res.json({message:"Invalid Email or Password",success:false})

    const token = createToken(user._id)
    res.json({token,success:true})
  }
  catch (error) {
    console.log(error);
    res.json({message:"Something went wrong",success:false})
  }
}

// create a token 
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET_KEY)
}

// Register function
const registerUser = async (req,res) =>{
    const {username,email,password} = req.body
    try {
        const exist = await userModal.findOne({email});
        if(exist) return res.json({message:"User already exist",success:false});

        // VALIDATION
        if (!validator.isEmail(email)) return res.json({message:"Invalid Email",success:false});
        if (password.length < 8) return res.json({message:"Password should be strong",success:false});

        // IF EVERYTHING WORKS
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        // NEW USER
        const newUser = new userModal({
            username:username,
            email:email,
            password:hashedPassword});

        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({token,success:true})    

    } 
    catch (error) {
        console.log(error);
        res.json({message:"Something went wrong",success:false})
    }
}
export {loginUser,registerUser}