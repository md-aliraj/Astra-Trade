
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("USERID");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const nameFromUrl = queryParams.get("user");

    if (nameFromUrl) {
      setUserName(nameFromUrl);
      localStorage.setItem("user", nameFromUrl);
    } else {
      const savedUser = localStorage.getItem("user");
      if (savedUser) setUserName(savedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "https://astra-trade-9ba1.vercel.app";
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  const dropdownItemStyle = {
    padding: "10px 20px",
    fontSize: "14px",
    color: "#666",
    borderBottom: "1px solid #eee",
    cursor: "default",
    display: "flex",
    alignItems: "center"
  };

  return (
    <div className="menu-container">
      <img src="logo.png" alt="Logo" style={{ width: "25px", marginLeft: "20px" }} />
      <div className="menus" >
        <ul>
          <li>
            <Link style={{ textDecoration: "none" }} to="/" onClick={() => setSelectedMenu(0)}>
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass} style={{marginTop: "30px", fontSize: "15px"}}>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/orders" onClick={() => setSelectedMenu(1)}>
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass} style={{fontSize: "15px"}}>Orders</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/holdings" onClick={() => setSelectedMenu(2)}>
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass} style={{fontSize: "15px"}}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/positions" onClick={() => setSelectedMenu(3)}>
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass} style={{fontSize: "15px"}}>Positions</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/funds" onClick={() => setSelectedMenu(4)}>
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass} style={{fontSize: "15px"}}>Funds</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/apps" onClick={() => setSelectedMenu(6)}>
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass} style={{fontSize: "15px"}}>Apps</p>
            </Link>
          </li>
        </ul>
        <hr />

        <div 
          className="profile" 
          onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} 
          style={{ cursor: "pointer", position: "relative", display: "flex", alignItems: "center", gap: "10px" }}
        >
          <div className="avatar" style={{ 
            backgroundColor: "#eee", 
            color: "#555", 
            borderRadius: "50%", 
            width: "30px", 
            height: "30px", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: "600"
          }}>
            {userName !== "USERID" ? userName.charAt(0).toUpperCase() : "U"}
          </div>
          <p className="username" style={{ fontWeight: "400", fontSize: "14px", color: "#666", margin: 0 }}>
            {userName.toUpperCase()}
          </p>

          {isProfileDropdownOpen && (
            <div style={{
              position: "absolute",
              top: "45px",
              right: "0",
              backgroundColor: "white",
              border: "1px solid #eee",
              zIndex: 1000,
              boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
              borderRadius: "4px",
              minWidth: "200px"
            }}>
              <div style={{ padding: "15px 20px", borderBottom: "1px solid #eee" }}>
                <p style={{ margin: 0, fontWeight: "500", color: "#444" }}>{userName.toUpperCase()}</p>
                <p style={{ margin: 0, fontSize: "12px", color: "#999" }}>
                {userName.toLowerCase()}@gmail.com
                </p>
              </div>

              <div style={dropdownItemStyle}>My profile / Settings</div>
              <div style={dropdownItemStyle}>Console</div>
              <div style={dropdownItemStyle}>Coin</div>
              <div style={dropdownItemStyle}>Support</div>
              <div style={dropdownItemStyle}>Invite friends</div>
              <div style={dropdownItemStyle}>Tour Kite</div>

              <div 
                onClick={handleLogout}
                style={{ ...dropdownItemStyle, cursor: "pointer", color: "#d9534f", borderBottom: "none", fontWeight: "500" }}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;