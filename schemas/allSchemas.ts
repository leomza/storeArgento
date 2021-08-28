const S = require('fluent-json-schema')

const ROLES = {
    admin: 'admin',
    user: 'user',
}

//Use Fluent to create and validate the schemas
export const registerSchemaFJS = S.object()
    .prop('username', S.string().minLength(4).required())
    .prop('email', S.string().format(S.FORMATS.EMAIL).required())
    .prop('password', S.string().minLength(6).required())
    .prop('repassword', S.string().minLength(6).required())
    .prop('role', S.string().enum(Object.values(ROLES)))
    .valueOf();

export const productSchemaFJS = S.object()
    .prop('product', S.string().required())
    .prop('description', S.string().minLength(6).required())
    .prop('price', S.number().required())
    .prop('stock', S.integer().required())
    .prop('image')
    .valueOf();