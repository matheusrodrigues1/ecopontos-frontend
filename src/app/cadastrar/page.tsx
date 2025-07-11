import React from "react";

const Cadastrar = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-white">
      <span className="font-bold text-2xl">Cadastrar informações</span>
      <div className="flex flex-col items-center justify-center">
        <form className="flex flex-col gap-2 w-[340px]">
          <div>
            <label className="block text-[15px] text-[#093A3E] font-bold mb-1">
              Titulo
            </label>
            <input
              type="text"
              placeholder="Ecoponto Nome 1"
              className="w-full h-[40px] border-2 !bg-[#093A3E] !text-white !placeholder:text-[20px] border-[#093A3E] p-3 !rounded-lg !pl-3"
            />
          </div>
          <div>
            <label className="block text-[15px] text-[#093A3E] font-bold mb-1">
              Horario de funcionamento
            </label>
            <input
              type="text"
              placeholder="8h ás 17h"
              className="w-full h-[40px] border-2 !bg-[#093A3E] !text-white !placeholder:text-[20px] border-[#093A3E] p-3 !rounded-lg !pl-3"
            />
          </div>
          <div>
            <label className="block text-[15px] text-[#093A3E] font-bold mb-1">
              Intervalo
            </label>
            <input
              type="text"
              placeholder="12h ás 14h"
              className="w-full h-[40px] border-2 !bg-[#093A3E] !text-white !placeholder:text-[20px] border-[#093A3E] p-3 !rounded-lg !pl-3"
            />
          </div>
          <div>
            <label className="block text-[15px] text-[#093A3E] font-bold mb-1">
              CNPJ
            </label>
            <input
              type="text"
              placeholder="2940.0353.43042.09"
              className="w-full h-[40px] border-2 !bg-[#093A3E] !text-white !placeholder:text-[20px] border-[#093A3E] p-3 !rounded-lg !pl-3"
            />
          </div>
          <div>
            <label className="block text-[15px] text-[#093A3E] font-bold mb-1">
              Materiais aceitos
            </label>
            <input
              type="text"
              placeholder="papel, plástico, vidro e metal"
              className="w-full h-[40px] border-2 !bg-[#093A3E] !text-white !placeholder:text-[20px] border-[#093A3E] p-3 !rounded-lg !pl-3"
            />
          </div>
          <div>
            <label className="block text-[15px] text-[#093A3E] font-bold mb-1">
              Quantidade aceita
            </label>
            <input
              type="text"
              placeholder="*papel, plástico, vidro e metal"
              className="w-full h-[40px] border-2 !bg-[#093A3E] !text-white !placeholder:text-[20px] border-[#093A3E] p-3 !rounded-lg !pl-3"
            />
          </div>
          <div>
            <label className="block text-[15px] text-[#093A3E] font-bold mb-1">
              Endereço
            </label>
            <input
              type="text"
              placeholder="Rua dom valeriano, N°3675, santa esmeralda"
              className="w-full h-[40px] border-2 !bg-[#093A3E] !text-white !placeholder:text-[20px] border-[#093A3E] p-3 !rounded-lg !pl-3"
            />
          </div>
          <div>
            <label className="block text-[15px] text-[#093A3E] font-bold mb-1">
              Coordenadas
            </label>
            <input
              type="text"
              placeholder="-9.739824167864189, -36.648836656278135"
              className="w-full h-[40px] border-2 !bg-[#093A3E] !text-white !placeholder:text-[20px] border-[#093A3E] p-3 !rounded-lg !pl-3"
            />
          </div>
          <button
            type="submit"
            className="mt-9 self-center h-[40px] w-[200px] !bg-[#093A3E] !text-white !rounded-lg"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cadastrar;
