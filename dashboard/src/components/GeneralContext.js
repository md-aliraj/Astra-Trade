
import React, { useState } from "react";
import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid, price) => {}, 
  closeBuyWindow: () => {},
  openSellWindow: (uid, price) => {}, 
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  
  const [selectedStockPrice, setSelectedStockPrice] = useState(0);

 
  const handleOpenBuyWindow = (uid, price) => {
    setIsBuyWindowOpen(true);
    setIsSellWindowOpen(false);
    setSelectedStockUID(uid);
    setSelectedStockPrice(price); 
  };


  const handleOpenSellWindow = (uid, price) => {
    setIsSellWindowOpen(true);
    setIsBuyWindowOpen(false);
    setSelectedStockUID(uid);
    setSelectedStockPrice(price); 
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setIsSellWindowOpen(false);
    setSelectedStockUID("");
    setSelectedStockPrice(0);
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: handleOpenSellWindow,
      }}
    >
      {props.children}

    
      {isBuyWindowOpen && (
        <BuyActionWindow 
          uid={selectedStockUID} 
          mode="BUY" 
          price={selectedStockPrice} 
        />
      )}

      {isSellWindowOpen && (
        <BuyActionWindow 
          uid={selectedStockUID} 
          mode="SELL" 
          price={selectedStockPrice} 
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;