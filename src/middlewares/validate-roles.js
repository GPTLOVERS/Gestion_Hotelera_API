export const hasRoles = (...roles) => {
    return (req,res,next) =>{
        if(!req.usuario){
            return res.status(500).json({
                success: false,
                message: "El rol nececita ser verificado antes de verificar el token"
            })
        }

        if(!roles.includes(req.usuario.role)){
            return res.status(401).json({
                success: false,
                message:`The service requires certain roles: ${roles}`
            })
        }
        next()
    }
}