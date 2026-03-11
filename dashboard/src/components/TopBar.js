import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "./Menu";

const TopBar = () => {
  const [nifty, setNifty] = useState(21850.45);
  const [sensex, setSensex] = useState(72150.10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
        if (response) {
          setNifty((21800 + Math.random() * 100).toFixed(2));
          setSensex((72000 + Math.random() * 300).toFixed(2));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points" style={{ color: "#4caf50" }}>{nifty}</p>
          <p className="percent">+0.45%</p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points" style={{ color: "#4caf50" }}>{sensex}</p>
          <p className="percent">+0.38%</p>
        </div>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;

