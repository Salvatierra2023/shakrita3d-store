export type EstadoEncargo = "En proceso" | "Listo";

export type FiltroEstado = "Todos" | EstadoEncargo;

export type Encargo = {
    id: string;
    nombre: string;
    whatsapp: string;
    idea: string;
    estado: EstadoEncargo;
    created_at: string;
};
