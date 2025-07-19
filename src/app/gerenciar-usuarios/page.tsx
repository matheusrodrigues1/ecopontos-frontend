"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "../utils/axios";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../hooks/useAuth";
import { useToastContext } from "../../contexts/ToastContext";
import { UserDeleteResponse } from "@/app/gerenciar-usuarios/delete";
import { User } from "@/app/types/user/user";


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
      const response = await axios.get("http://localhost:3001/users");
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
      <div className="flex flex-col items-center w-screen h-screen gap-10 bg-white justify-center">
        <span className="font-bold text-2xl text-red-600">Acesso negado. Apenas administradores podem acessar esta página.</span>
        <button
          onClick={() => router.push('/menu')}
          className="px-6 py-3"
          style={{
            backgroundColor: '#093A3E',
            color: '#0000000',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
          }}
        >
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
      await axios.post("http://localhost:3001/auth/register", formData);
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

      await axios.put(`http://localhost:3001/users/${editData.id}`, updateData);
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

  const handleDelete = async (userId: string, userName: string) => {
    if (userId === user?.id) {
      showWarning("Você não pode excluir sua própria conta!");
      return;
    }

    if (!confirm(`Tem certeza que deseja excluir o usuário "${userName}"?`)) {
      return;
    }

    try {
      await UserDeleteResponse(userId)
        .then(() => {
          showSuccess(`Usuário "${userName}" excluído com sucesso!`);
        })
        .catch((error) => {
          console.error("Erro ao excluir usuário:", error);
          showError("Erro ao excluir usuário");
        })
        .finally(() => {
          setIsLoading(true);
          loadUsers();
        });
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      showError("Erro ao excluir usuário");
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
      <div className="flex flex-col items-center w-screen min-h-screen gap-6 bg-white py-8">
        <div className="flex items-center justify-between w-full max-w-6xl px-4 !pt-4">
          <button
            onClick={() => router.push('/menu')}
            className="px-10 py-3"
            style={{
              backgroundColor: '#093A3E',
              color: 'white',
              border: '5px solid transparent',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0c4a4f';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#093A3E';
            }}
          >
            ← Voltar
          </button>
          <span className="font-bold text-3xl text-black">Gerenciar Usuários</span>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
            style={{
              backgroundColor: showCreateForm ? '#093A3E' : '#0c4a4f',
              border: '5px solid transparent',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = showCreateForm ? '#0c4a4f' : '#093A3E';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = showCreateForm ? '#093A3E' : '#0c4a4f';
            }}
          >
            {showCreateForm ? 'Cancelar' : 'Criar Usuário'}
          </button>
        </div>

        {showCreateForm && (
          <div className="w-full max-w-md p-8 bg-white border border-gray-200 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center text-[#093A3E] mb-6">
              Criar Novo Usuário
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#093A3E] focus:border-transparent"
                  style={{ color: '#111827' }}
                  placeholder="Digite o nome do usuário"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#093A3E] focus:border-transparent"
                  style={{ color: '#111827' }}
                  placeholder="Digite o email do usuário"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#093A3E] focus:border-transparent"
                  style={{ color: '#111827' }}
                  placeholder="Digite a senha (mínimo 6 caracteres)"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4"
                style={{
                  backgroundColor: '#093A3E',
                  color: 'white',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = showCreateForm ? '#0c4a4f' : '#093A3E';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = showCreateForm ? '#093A3E' : '#0c4a4f';
                }}
              >
                {isLoading ? "Criando..." : "Criar Usuário"}
              </button>
            </form>
          </div>
        )}

        <div className="w-full max-w-6xl">
          <h2 className="text-2xl font-bold text-[#093A3E] mb-6">Lista de Usuários</h2>

          {isLoadingUsers ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#093A3E]"></div>
              <span className="ml-4 text-gray-600">Carregando usuários...</span>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              {users.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p className="text-lg">Nenhum usuário encontrado.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nome
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tipo
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Criado em
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((userData) => (
                        <tr key={userData.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            {editingUser === userData.id ? (
                              <input
                                type="text"
                                name="name"
                                value={editData.name}
                                onChange={handleEditChange}
                                className="w-full px-2 py-1 border border-gray-300 rounded"
                                style={{ color: '#111827' }}
                              />
                            ) : (
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <div className="h-10 w-10 rounded-full bg-[#093A3E] flex items-center justify-center">
                                    <span className="text-white font-medium">
                                      {userData.name.charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {userData.name}
                                  </div>
                                </div>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {editingUser === userData.id ? (
                              <input
                                type="email"
                                name="email"
                                value={editData.email}
                                onChange={handleEditChange}
                                className="w-full px-2 py-1 border border-gray-300 rounded"
                                style={{ color: '#111827' }}
                              />
                            ) : (
                              <div className="text-sm text-gray-900">{userData.email}</div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${userData.role === 'admin'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-green-100 text-green-800'
                              }`}>
                              {userData.role === 'admin' ? 'Administrador' : 'Usuário'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(userData.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {editingUser === userData.id ? (
                              <div className="flex gap-2">
                                <form onSubmit={handleEditSubmit} className="flex gap-2">
                                  <input
                                    type="password"
                                    name="password"
                                    value={editData.password}
                                    onChange={handleEditChange}
                                    placeholder="Nova senha (opcional)"
                                    className="px-2 py-1 border border-gray-300 rounded text-xs"
                                    style={{ color: '#111827' }}
                                  />
                                  <button
                                    type="submit"
                                    disabled={isLoading}
                                    style={{
                                      backgroundColor: '#ADFF2F',
                                      color: '#111827',
                                      borderRadius: '8px',
                                      padding: '0.5rem 1rem',
                                      fontSize: '14px',
                                      fontWeight: '500',
                                      cursor: 'pointer',
                                      transition: 'background-color 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.backgroundColor = '#9ACD32';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.backgroundColor = '#ADFF2F';
                                    }}
                                  >
                                    Salvar
                                  </button>
                                </form>
                                <button
                                  onClick={() => setEditingUser(null)}
                                  style={{
                                    backgroundColor: '#f3f4f6',
                                    color: '#111827',
                                    borderRadius: '8px',
                                    padding: '0.5rem 1rem',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#e5e7eb';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                                  }}
                                >
                                  Cancelar
                                </button>
                              </div>
                            ) : (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEdit(userData)}
                                  style={{
                                    backgroundColor: '#00CED1',
                                    color: '#111827',
                                    borderRadius: '8px',
                                    padding: '0.5rem 1rem',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#008B8B';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#00CED1';
                                  }}
                                >
                                  Editar
                                </button>
                                {userData.id !== user?.id && (
                                  <button
                                    onClick={() => handleDelete(userData.id, userData.name)}
                                    style={{
                                      backgroundColor: '#FF6347',
                                      color: 'white',
                                      borderRadius: '8px',
                                      padding: '0.5rem 1rem',
                                      fontSize: '14px',
                                      fontWeight: '500',
                                      cursor: 'pointer',
                                      transition: 'background-color 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.backgroundColor = '#800000';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.backgroundColor = '#FF6347';
                                    }}
                                  >
                                    Excluir
                                  </button>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default GerenciarUsuarios;
