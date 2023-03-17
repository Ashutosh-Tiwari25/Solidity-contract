// Import React and required dependencies
import React, { useState } from "react";
import Web3 from "web3";
import ContractABI from "./ContractABI.json";

// Import App-specific styles
import "./App.css";

function App() {
  // Define state variables for the message and loading state
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Initialize a new Web3 instance using the MetaMask provider
  const web3 = new Web3(window.ethereum);

  // Initialize a new contract instance using the ContractABI and contract address
  const RemixContract = new web3.eth.Contract(
    ContractABI,
    "0xe00547003Bb8c42C47EA116e173B86bF116064c9"
  );

  // Set the message on the contract and update the loading state
  const setData = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Request user account permission from MetaMask
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];

      // Estimate the gas needed to execute the setMessage function on the contract
      const gas = await RemixContract.methods.setMessage(message).estimateGas();

      // Call the setMessage function on the contract and send a transaction with the message and gas
      const result = await RemixContract.methods
        .setMessage(message)
        .send({ from: account, gas });

      console.log(result);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };
  
 
  // Get the current message from the contract and update the state
  const getData = async () => {
    setLoading(true);

    try {
      const message = await RemixContract.methods.getMessage().call();
      setReceivedMessage(message);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  // Render the App component
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={setData}>
          <label htmlFor="message-input">Set Message:</label>
          <input
            id="message-input"
            type="text"
            name="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            disabled={loading}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Set Message"}
          </button>
        </form>
        
        <div className="button-container">
          <button type="button" onClick={getData} disabled={loading}>
            {loading ? "Loading..." : "Get Message"}
          </button>
          {receivedMessage && (
            <div>
              <label>Received Message:</label>
              <span>{receivedMessage}</span>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
