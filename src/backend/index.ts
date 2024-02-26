import { Server } from 'azle';
import express, { NextFunction, Request, Response } from 'express';

type Producto = {
    id: number;
    nombre: string;
    costo: string;
    uso: string;
    material: string;
    color: string;
    marca: string;
    cantidad: string;
}

let productos: Producto[] = [{
id: 1, 
nombre: 'recibos de pago',
costo: '$45',
uso: 'oficina',
material: 'papel enmicado',
color: 'beige',
marca: 'cosmografic',
cantidad: '2'

}];

function logger(req: Request, res: Response, next: NextFunction) {
    console.log("Hola a todos, somos Sweet developers <3");
    next();
}

export default Server(() => {
    const app = express();

    app.use(express.json());

    

    //GET
    app.get('/productos', (req, res) => {
        res.json(productos);
    });

    //POST
    app.post("/productos", (req, res) => {
        productos = [...productos, req.body]
        res.send("Esta Listo!");
    });

    //PUT
    app.put("/productos/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const producto = productos.find((producto) => producto.id === id);
    
        if (!producto) {
            res.status(404).send("No encontrado");
            return;
        }
    
        const updatedProducto = { ...producto, ...req.body };
        
        productos = productos.map((b) => b.id === updatedProducto.id ? updatedProducto : b);
    
        res.send("Listo");
    });

    //DELETE
    app.delete("/productos/:id", (req, res) => {
        const id = parseInt(req.params.id);
        productos = productos.filter((producto) => producto.id !== id);
        res.send("Hecho!");
    });
    
  
    return app.listen();
});
