import Eventos from "../eventos/eventos.model.js";
import Usuario from "../usuarios/usuarios.model.js";

export const emailExist = async(email = "") =>{
    const exist = await Usuario.findOne({email});
    if(exist){
        throw new Error(`The email ${email} is already registered`);
    }

};

export const userNameExist = async(userName = "") =>{
    const exist = await Usuario.findOne({userName});
    if(exist){
        throw new Error(`The userName ${userName} is already registered`);
    }

}

export const uidExist = async(uid = "") =>{
    const exist = await Usuario.findById(uid);
    if(!exist){
        throw new Error("No exixte el ID proporcionado");
    }    
};

export const uidExistE = async(uid = "") =>{
    const exist = await Eventos.findById(uid);
    if(!exist){
        throw new Error("No exixte el ID proporcionado");
    }
}