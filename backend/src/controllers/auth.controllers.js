import bcrypt from 'bcryptjs'

export const signup = async (req,res) =>{
    const {firstName,email,password} = req.body
    try {
        if(firstName === '' || email === '' || password === ''){
            res.status(400).json({message: 'there are empty fields'})
        }
        if(password.length < 6){
            res.status(400).json({message: 'password is short than 6'})
        }
        


    } catch (error) {
        
    }
}