import mongoose  from "mongoose";

const articulosSchema = new mongoose.Schema({
    nombre:{ type: String, require: true},
    precio:{type: Number, require: true},
    descripcion:{type: String}

})

const Articulo = mongoose.model('Articulo', articulosSchema);

export default Articulo;