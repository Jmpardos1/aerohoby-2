export class Proveedor {
    nombre: string;
    direccion: string
    correo: string;
    telefono: string;

    constructor(nombre: string, direccion: string, correo: string, telefono: string) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.correo = correo;
        this.telefono = telefono;
    }
}
