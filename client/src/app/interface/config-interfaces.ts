export interface I_producto {
    descripcion: string
    genero: string
    inventario: I_inventario
    precioProveedor: Number
    precioPublico: Number
    producto: string
    proveedor: string
    urlImage: string
}


export interface I_inventario {
    talla: string
    cantidad: number
    checked: boolean | null
}

export interface I_usuario {
    email: string
    clave: string
}
