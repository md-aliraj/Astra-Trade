import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ qty: 0, price: 0 });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios.get("https://astra-trade-lyly.onrender.com/allOrders").then((res) => {
      setAllOrders(res.data);
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`https://astra-trade-lyly.onrender.com/deleteOrder/${id}`);
        setAllOrders(allOrders.filter((order) => order._id !== id));
        alert("Order Deleted Successfully!");
      } catch (err) {
        alert("Error deleting order!");
      }
    }
  };

  const startEdit = (order) => {
    setEditingId(order._id);
    setEditData({ qty: order.qty, price: order.price });
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`https://astra-trade-lyly.onrender.com/updateOrder/${id}`, editData);
      setEditingId(null);
      fetchOrders();
      alert("Order Updated Successfully!");
    } catch (err) {
      alert("Update failed!");
    }
  };

  const btnStyle = {
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "4px",
    border: "none",
    fontWeight: "bold",
    fontSize: "12px",
    marginRight: "5px",
  };

  return (
    <div className="orders">
      {allOrders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <div className="order-table">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #eee", textAlign: "left", color: "#666" }}>
                <th style={{ padding: "12px" }}>Instrument</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order) => {
                const isEditing = editingId === order._id;
                const isBuy = order.mode === "BUY";

                return (
                  <tr key={order._id} style={{ borderBottom: "1px solid #f2f2f2", height: "60px" }}>
                    <td style={{ padding: "12px", fontWeight: "500" }}>{order.name}</td>
                    <td>
                      {isEditing ? (
                        <input
                          type="number"
                          value={editData.qty}
                          onChange={(e) => setEditData({ ...editData, qty: e.target.value })}
                          style={{ width: "60px", padding: "4px" }}
                        />
                      ) : (
                        order.qty
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="number"
                          value={editData.price}
                          onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                          style={{ width: "80px", padding: "4px" }}
                        />
                      ) : (
                        order.price.toFixed(2)
                      )}
                    </td>
                    <td style={{ color: isBuy ? "#4184f3" : "#ff5722", fontWeight: "bold" }}>
                      {order.mode}
                    </td>
                    <td>
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => handleSave(order._id)}
                            style={{ ...btnStyle, backgroundColor: "#4caf50", color: "white" }}
                          >
                            SAVE
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            style={{ ...btnStyle, backgroundColor: "#9e9e9e", color: "white" }}
                          >
                            CANCEL
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(order)}
                            style={{ ...btnStyle, backgroundColor: "#4caf50", color: "white" }}
                          >
                            EDIT
                          </button>
                          <button
                            onClick={() => handleDelete(order._id)}
                            style={{ ...btnStyle, backgroundColor: "#f44336", color: "white" }}
                          >
                            DELETE
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
