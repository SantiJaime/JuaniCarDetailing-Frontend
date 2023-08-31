import * as yup from 'yup'

const errorUsersSchema = yup.object().shape({
    email: yup.string().email("Formato Email inválido").required("Campo correo electrónico obligatorio"),
    username: yup.string().required("Campo nombre de usuario obligatorio"),
    pass: yup.string().required("Campo contraseña obligatorio").min(8, "La contraseña debe ser de al menos 8 caracteres"),
    repeatPass: yup.string().required("Campo repetir contraseña obligatorio")
})

export const errorUsersOnAdminSchema = yup.object().shape({
    email: yup.string().email("Formato Email inválido").required("Campo correo electrónico obligatorio"),
    username: yup.string().required("Campo nombre de usuario obligatorio"),
    pass: yup.string().required("Campo contraseña obligatorio").min(8, "La contraseña debe ser de al menos 8 caracteres"),
})

export const errorLoginSchema = yup.object().shape({
    email: yup.string().email("Formato Email inválido").required("Campo correo electrónico obligatorio"),
    pass: yup.string().required("Campo contraseña obligatorio").min(8, "Mínimo de 8 caracteres"),
})

export const errorServiceSchema = yup.object().shape({
    nombre: yup.string().required("Campo nombre del servicio obligatorio"),
    descripcion: yup.string().required("Campo descripción obligatorio"),
    img: yup.string().required("Campo URL de imagen obligatorio").url("Formato URL inválido")
})

export default errorUsersSchema