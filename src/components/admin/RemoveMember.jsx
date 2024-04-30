import { Button } from "../../components/ui/button";
import usdt from "../../../public/images/token-swap/tether.svg";
import Image from "next/image";
import { getProvider } from "@/constants/providers";
import { getDAOContract, getSavingsContract, getUSDTContract } from "@/constants/contracts";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { useState } from "react";

export default function RemoveMember() {
    const { walletProvider } = useWeb3ModalProvider();
    const [memberAddress, setMemberAddress] = useState("");
  
    const readWriteProvider = getProvider(walletProvider);
    const handleRemoveMember = async () => {
      try {
        const signer = readWriteProvider
          ? await readWriteProvider.getSigner()
          : null;
        const contract = getDAOContract(signer);
  
        const removeMember = await contract.removeMember(memberAddress);
        const receipt = await removeMember.wait();
  
        console.log(receipt);
      } catch (error) {
        console.error("Error  handling remove member:", error);
        throw error;
      }
    };

  return (
    <div className="mb-0 border-t" id="deposit">
      <h3 className="font-bold text-xl mt-8">Remove a member</h3>

      <label className="block p-4 px-0 pb-1 font-semibold">
        Member Address:
      </label>
      <div className="border flex justify-between items-center bg-transparent w-full border-slate-700 rounded-2xl py-3 px-2 pl-3 outline-none transition-all duration-300 focus:border-blue-500">
        <input
          type="number"
          placeholder="Amount..."
          className="bg-transparent w-[80%] invisibile h-[full] outline-none"
          onChange={(e)=>{setMemberAddress(e.target.value)}}
        />{" "}
    
      </div>


      <Button
        variant={"outline"}
        className="py-3 px-6 mt-4 gap-2 rounded-2xl border bg-[#0267FF] text-white text-sm w-fit"
        translate="no"
        onClick={handleRemoveMember}
      >
        Remove member
      </Button>

    </div>
  );
}