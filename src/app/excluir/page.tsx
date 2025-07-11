import React from "react";
import trashIcon from "../../../public/lixeira.png";
import Image from "next/image";

const Editar = () => {
  return (
    <div className="flex flex-col items-center w-screen h-screen gap-10 bg-white">
      <span className="font-bold text-2xl text-black !mt-10">
        Excluir Ecopontos
      </span>
      <div className="flex flex-col items-center justify-center gap-2">
        <span className="font-bold bg-[#093A3E] w-[381px] rounded-lg flex !pl-2 !pr-2 justify-between items-center h-[53px] text-xl text-white">
          Ecopontos Nome 1
          <Image
            src={trashIcon}
            alt="Lixeira"
            className="h-5 w-5 cursor-pointer"
          />
        </span>
        <span className="font-bold bg-[#093A3E] w-[381px] rounded-lg flex !pl-2 !pr-2 justify-between items-center h-[53px] text-xl text-white">
          Ecopontos Nome 1
          <Image
            src={trashIcon}
            alt="Lixeira"
            className="h-5 w-5 cursor-pointer"
          />
        </span>
        <span className="font-bold bg-[#093A3E] w-[381px] rounded-lg flex !pl-2 !pr-2 justify-between items-center h-[53px] text-xl text-white">
          Ecopontos Nome 1
          <Image
            src={trashIcon}
            alt="Lixeira"
            className="h-5 w-5 cursor-pointer"
          />
        </span>
      </div>
      <button className="!bg-[#093A3E] w-[223px] h-[53px] !text-white !rounded-lg">
        Concluir
      </button>
    </div>
  );
};

export default Editar;
