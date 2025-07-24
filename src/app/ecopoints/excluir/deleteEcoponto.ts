import { deleteEco } from "../deleteEcoponto";

export const handleDeleteEcoponto = async (id: string, title: string) => {
    try {
        await deleteEco(id);
    } catch (error) {
        console.error("Erro ao excluir ecoponto:", error);
        throw error;
    }
};