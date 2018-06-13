export class ScanData
{
    info: string;
    tipo: string;

    constructor( datos: string)
    {
        this.tipo = "No se le encuentra forma";
        this.info = datos;
        
        if(datos.startsWith("http"))
          this.tipo = "http";
        else if(datos.startsWith("geo"))
          this.tipo ="mapa";
        else if (datos.startsWith("BEGIN:VCARD"))
          this.tipo = "contacto";
        else if(datos.startsWith("MATMSG"))
          this.tipo = "email";
    }
}