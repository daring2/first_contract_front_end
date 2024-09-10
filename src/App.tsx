import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";

function App() {
  const {
    contract_address,
    contract_balance,
    sendIncrement,
    sendDeposit,
    counter_value,
    recent_sender,
    owner_address,
  } = useMainContract();
  const { connected } = useTonConnect()
  return (
    <div>
      <div>
        <TonConnectButton />
      </div>
      <div>
        <div className='Card'>
          <b>Our contract Address</b>
          <div className='Hint'>{contract_address?.slice(0, 30) + "..."}</div>
          <b>Owner Address</b>
          <div className='Hint'>{owner_address?.toString().slice(0, 30) + "..."}</div>
          <b>Recent Address</b>
          <div className='Hint'>{recent_sender?.toString().slice(0, 30) + "..."}</div>
          <b>Our contract Balance</b>
          <div className='Hint'>{contract_balance}</div>
          <b>Counter Value</b>
          <div>{counter_value ?? "Loading..."}</div>
        </div>
        <div className='Card'>
          {connected && (
            <a onClick={() => { sendIncrement(); }}>
              Increment by 3
            </a>
          )}
        </div>
        <div className='Card'>
          {connected && (
            <a onClick={() => { sendDeposit(); }}>
              Deposit of 0.5 TON
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
