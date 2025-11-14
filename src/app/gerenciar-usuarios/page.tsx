"use client";
import React, { useState, useEffect, useCallback } from "react";
import ConfirmDialog from "../components/ConfirmDialog";
import { useRouter } from "next/navigation";
import axios from "../utils/axios";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../hooks/useAuth";
import { useToastContext } from "../../contexts/ToastContext";
import { UserDeleteResponse } from "@/app/gerenciar-usuarios/delete";
import { User } from "@/app/types/user/user";
import getUsers from "./search";
import registerUser from "./register";
import updateUser from "./update";
import styles from "./style.module.css";

const GerenciarUsuarios = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [editData, setEditData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });
  const [users, setUsers] = useState<User[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<{ id: string; name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuth();
  const { showSuccess, showError, showWarning } = useToastContext();

  const loadUsers = useCallback(async () => {
    try {
      setIsLoadingUsers(true);
      const response = await getUsers();
      console.log("Usuários carregados:", response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
      showError("Erro ao carregar lista de usuários");
    } finally {
      setIsLoadingUsers(false);
    }
  }, [showError]);

  useEffect(() => {
    if (user && user.role === 'admin') {
      loadUsers();
    }
  }, [user, loadUsers]);

  if (user && user.role !== 'admin') {
    return (
      <div className={styles.container} style={{ justifyContent: "center", gap: "1rem" }}>
        <span className={styles.title} style={{ color: "#dc2626", fontSize: "1.5rem" }}>
          Acesso negado. Apenas administradores podem acessar esta página.
        </span>
        <button onClick={() => router.push('/menu')} className={styles.accessButton}>
          Voltar ao Menu
        </button>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await registerUser(formData);

      showSuccess("Usuário criado com sucesso!");

      setFormData({
        name: "",
        email: "",
        password: "",
      });
      setShowCreateForm(false);
      loadUsers();
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      let errorMessage = "Erro ao atualizar usuário";
      if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as { response?: { data?: { message?: string } } };
        errorMessage = err.response?.data?.message || errorMessage;
      }
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (userData: User) => {
    setEditData({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      password: "",
    });
    setEditingUser(userData.id);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updateData: { name: string; email: string; password?: string } = {
        name: editData.name,
        email: editData.email,
      };

      if (editData.password.trim()) {
        updateData.password = editData.password;
      }

      await updateUser(editData.id, updateData);
      showSuccess("Usuário atualizado com sucesso!");
      setEditingUser(null);
      loadUsers();
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      let errorMessage = "Erro ao atualizar usuário";
      if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as { response?: { data?: { message?: string } } };
        errorMessage = err.response?.data?.message || errorMessage;
      }
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (userId: string, userName: string) => {
    if (userId === user?.id) {
      showWarning("Você não pode excluir sua própria conta!");
      return;
    }
    setPendingDelete({ id: userId, name: userName });
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      await UserDeleteResponse(pendingDelete.id);
      showSuccess(`Usuário "${pendingDelete.name}" excluído com sucesso!`);
      setConfirmOpen(false);
      setPendingDelete(null);
      setIsLoading(true);
      loadUsers();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      showError("Erro ao excluir usuário");
      setConfirmOpen(false);
      setPendingDelete(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={() => router.push('/menu')} className={styles.backButton}>
            ← Voltar
          </button>

          <span className={styles.title}>Gerenciar Usuários</span>

          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className={styles.botaoCadastrar}
          >
            {showCreateForm ? 'Cancelar' : 'Criar Usuário'}
          </button>
        </div>

        {showCreateForm && (
          <div className={styles.formContainer}>
            <h2 className={styles.title} style={{ fontSize: 20, textAlign: "center", color: "#093A3E", marginBottom: 16 }}>
              Criar Novo Usuário
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="Digite o nome do usuário"
                />
              </div>

              <div>
                <label htmlFor="email" style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="Digite o email do usuário"
                />
              </div>

              <div>
                <label htmlFor="password" style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className={styles.input}
                  placeholder="Digite a senha (mínimo 6 caracteres)"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={styles.submitButton}
              >
                {isLoading ? "Criando..." : "Criar Usuário"}
              </button>
            </form>
          </div>
        )}

        <div style={{ width: "100%", maxWidth: 1224, marginTop: 32 }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#093A3E", marginBottom: 24 }}>Lista de Usuários</h2>

          {isLoadingUsers ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "3rem 0" }}>
              <div className={styles.spinner} />
              <span style={{ marginLeft: 16, color: "#4b5563" }}>Carregando usuários...</span>
            </div>
          ) : (
            <div className={styles.userListContainer}>
              <div style={{ backgroundColor: "#fff", borderRadius: 12, boxShadow: "0 4px 6px rgba(0,0,0,0.06)", overflow: "hidden", border: "1px solid #E5E7EB" }}>
                {(!users || users.length === 0) ? (
                  <div className={styles.emptyState}>
                    <p style={{ fontSize: "1.125rem", marginBottom: 8 }}>Nenhum usuário encontrado.</p>
                    <p style={{ color: "#9CA3AF" }}>Clique em "Criar Usuário" para adicionar um novo usuário.</p>
                  </div>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table className={styles.userTable}>
                      <thead className={styles.tableHeader}>
                        <tr style={{ backgroundColor: "#000" }}>
                          <th className={styles.tableCell}>Nome</th>
                          <th className={styles.tableCell}>Email</th>
                          <th className={styles.tableCell}>Tipo</th>
                          <th className={styles.tableCell}>Criado em</th>
                          <th className={styles.tableCell}>Ações</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((userData, idx) => {
                          const key = (userData as any).id || (userData as any)._id || `user-${idx}`;
                          return (
                            <tr key={key} className={styles.tableRow ?? ""}>
                              <td className={styles.tableCell}>
                                {editingUser === userData.id ? (
                                  <input
                                    type="text"
                                    name="name"
                                    value={editData.name}
                                    onChange={handleEditChange}
                                    className={styles.editInput}
                                  />
                                ) : (
                                  <div style={{ display: "flex", alignItems: "center" }}>
                                    <div className={styles.avatar}>
                                      <span>{userData.name.charAt(0).toUpperCase()}</span>
                                    </div>
                                    <div style={{ marginLeft: 12 }}>
                                      <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{userData.name}</div>
                                    </div>
                                  </div>
                                )}
                              </td>

                              <td className={styles.tableCell}>
                                {editingUser === userData.id ? (
                                  <input
                                    type="email"
                                    name="email"
                                    value={editData.email}
                                    onChange={handleEditChange}
                                    className={styles.editInput}
                                  />
                                ) : (
                                  <div style={{ fontSize: 14, color: "#111827" }}>{userData.email}</div>
                                )}
                              </td>

                              <td className={styles.tableCell}>
                                <span className={`${styles.badge} ${userData.role === 'admin' ? styles.adminBadge : styles.userBadge}`}>
                                  {userData.role === 'admin' ? 'Administrador' : 'Usuário'}
                                </span>
                              </td>

                              <td className={styles.tableCell} style={{ color: "#6b7280" }}>
                                {formatDate(userData.createdAt)}
                              </td>

                              <td className={styles.tableCell}>
                                {editingUser === userData.id ? (
                                  <div className={styles.actions}>
                                    <form onSubmit={handleEditSubmit} style={{ display: "flex", gap: 8 }}>
                                      <input
                                        type="password"
                                        name="password"
                                        value={editData.password}
                                        onChange={handleEditChange}
                                        placeholder="Nova senha (opcional)"
                                        className={styles.editInput}
                                        style={{ width: 180 }}
                                      />
                                      <button type="submit" disabled={isLoading} className={styles.saveButton}>
                                        Salvar
                                      </button>
                                    </form>
                                    <button onClick={() => setEditingUser(null)} className={styles.cancelButton}>
                                      Cancelar
                                    </button>
                                  </div>
                                ) : (
                                  <div className={styles.actions}>
                                    <button onClick={() => handleEdit(userData)} className={styles.editButton}>
                                      Editar
                                    </button>
                                    {userData.id !== user?.id && (
                                      <button onClick={() => handleDeleteClick(userData.id, userData.name)} className={styles.deleteButton}>
                                        Excluir
                                      </button>
                                    )}
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Confirmar exclusão"
        message={pendingDelete ? `Tem certeza que deseja excluir o usuário "${pendingDelete.name}"?` : ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => { setConfirmOpen(false); setPendingDelete(null); }}
      />
    </ProtectedRoute>
  );
};

export default GerenciarUsuarios;
