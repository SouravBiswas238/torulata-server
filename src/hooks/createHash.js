import bcrypt from "bcrypt"

export default createHash = async (password) => {
    const saltRounds = 10;
    try {
        if (password) {
            const hashPassword = bcrypt.hash(password, saltRounds)
            return { hashPassword }
        }
    } catch (err) {
        return { error: err.message }
    }
}