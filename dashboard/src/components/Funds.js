import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Funds = () => {
  const [availableMargin, setAvailableMargin] = useState(0);
  const [openingBalance, setOpeningBalance] = useState(0);
  const [inputAmount, setInputAmount] = useState("");
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const res = await axios.get("http://localhost:8080/userFunds");
        const currentFunds = res.data.margin || 0;
        setAvailableMargin(currentFunds);
        setOpeningBalance(currentFunds);
      } catch (err) {
        console.error("Error fetching funds:", err);
      }
    };
    fetchFunds();
  }, []);

  const handleFundAction = async (isWithdraw) => {
    const amount = Number(inputAmount);
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (isWithdraw && amount > availableMargin) {
      alert("Insufficient Balance!");
      return;
    }

    try {
      const finalAmount = isWithdraw ? -amount : amount;
      await axios.post("http://localhost:8080/addFunds", { amount: finalAmount });
      alert(isWithdraw ? "Withdrawal Successful!" : "Funds Added!");
      
      setInputAmount("");
      setShowInput(false);
      setAvailableMargin(prev => prev + finalAmount);
    } catch (err) {
      alert("Transaction failed!");
    }
  };

  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI</p>
        <button className="btn btn-green" onClick={() => setShowInput(!showInput)}>
          Manage Funds
        </button>
      </div>

      {showInput && (
        <div style={{ margin: "20px", padding: "15px", border: "1px solid #eee", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
          <input 
            type="number" 
            placeholder="Enter Amount" 
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
            style={{ padding: "8px", marginRight: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <button className="btn btn-green" onClick={() => handleFundAction(false)}>Add</button>
          <button className="btn btn-blue" style={{ marginLeft: "10px" }} onClick={() => handleFundAction(true)}>Withdraw</button>
        </div>
      )}

      <div className="row">
        <div className="col">
          <span><p>Equity</p></span>
          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">{availableMargin.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">{availableMargin.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance</p>
              <p>{openingBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <Link className="btn btn-blue">Open Account</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;