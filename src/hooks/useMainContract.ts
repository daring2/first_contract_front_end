import { useEffect, useState } from "react";
import { MainContract } from "../contracts/MainContract";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract } from "ton-core";
import { toNano } from "ton-core";
import { useTonConnect } from "./useTonConnect";

export function useMainContract() {
  const client = useTonClient();
  const { sender } = useTonConnect();
  
  const [contractData, setContractData] = useState<null | {
    counter_value: number;
    recent_sender: Address;
    owner_address: Address;
  }>();
  const [balance, setBalance] = useState<null | number>(0);

  const mainContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new MainContract(
      Address.parse("EQD0Xx3j5b6Cwd3KQk_1lTsCEpGJB1VXFA0lLEGqDbzTLo1U")
    );
    return client.open(contract) as OpenedContract<MainContract>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!mainContract) return;
      setContractData(null);
      const data = await mainContract.getData();
      setContractData({
        counter_value: data.number,
        recent_sender: data.recent_sender,
        owner_address: data.owner_address,
      });
      const balance = await mainContract.getBalance();
      setBalance(balance.number);
    }
    getValue();
  }, [mainContract]);

  return {
    contract_address: mainContract?.address.toString(),
    contract_balance: balance,
    sendIncrement: () => {
      return mainContract?.sendIncrement(sender, toNano(0.05), 3);
    },
    ...contractData,
  };
}