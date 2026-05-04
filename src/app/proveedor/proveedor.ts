export class Proveedor {
    id?: any;
    nombre: string;
    direccion: string
    correo: string;
    telefono: string | number;

    constructor(nombre: string, direccion: string, correo: string, telefono: string | number, id?: any) {
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
        this.correo = correo;
        this.telefono = telefono;
    }
}
