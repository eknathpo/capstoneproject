import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [updateStock, setUpdateStock] = useState("");

  const loadProducts = async () => {
    const res = await axios.get(process.env.REACT_APP_PRODUCT_URL + "/products");
    setProducts(res.data);
  };

  const loadOrders = async () => {
    const res = await axios.get(process.env.REACT_APP_ORDER_URL + "/orders");
    setOrders(res.data);
  };

  const loadInventory = async () => {
    const res = await axios.get(process.env.REACT_APP_INVENTORY_URL + "/inventory");
    setInventory(res.data);
  };

  useEffect(() => {
    loadProducts();
    loadOrders();
    loadInventory();
  }, []);

  const addProduct = async () => {
    await axios.post(process.env.REACT_APP_PRODUCT_URL + "/products", {
      name,
      price,
      stock,
    });
    loadProducts();
  };

  const createOrder = async (id) => {
    await axios.post(process.env.REACT_APP_ORDER_URL + "/orders", {
      product_id: id,
      quantity: 1,
    });
    loadOrders();
  };

  const updateInventory = async (id) => {
    await axios.put(process.env.REACT_APP_INVENTORY_URL + "/inventory/" + id, {
      stock: updateStock,
    });
    loadInventory();
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Ecommerce Platform</h2>

      <h3>Add Product</h3>
      <input placeholder="name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="price" onChange={(e) => setPrice(e.target.value)} />
      <input placeholder="stock" onChange={(e) => setStock(e.target.value)} />
      <button onClick={addProduct}>Add</button>

      <h3>Products</h3>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} ₹{p.price} stock:{p.stock}
            <button onClick={() => createOrder(p.id)}>Order</button>
            <input
              placeholder="new stock"
              onChange={(e) => setUpdateStock(e.target.value)}
            />
            <button onClick={() => updateInventory(p.id)}>Update Stock</button>
          </li>
        ))}
      </ul>

      <h3>Orders</h3>
      <ul>
        {orders.map((o) => (
          <li key={o.id}>
            Order #{o.id} product:{o.product_id} qty:{o.quantity}
          </li>
        ))}
      </ul>

      <h3>Inventory</h3>
      <ul>
        {inventory.map((i) => (
          <li key={i.product_id}>
            Product {i.product_id} stock:{i.stock}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

