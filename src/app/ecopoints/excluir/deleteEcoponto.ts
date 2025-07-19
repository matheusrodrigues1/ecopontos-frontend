import { deleteEco } from "../deleteEcoponto";

export const handleDeleteEcoponto = async (id: string, title: string) => {
    if (!confirm(`Tem certeza que deseja excluir o ecoponto "${title}"?`)) {
        return;
    }

    try {
        await deleteEco(id);
        alert("Ecoponto excluído com sucesso!");
    } catch (error) {
        console.error("Erro ao excluir ecoponto:", error);
        alert("Erro ao excluir ecoponto.");
    }
};