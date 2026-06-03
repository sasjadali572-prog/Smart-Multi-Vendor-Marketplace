import { useEffect, useState, useRef } from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

function App() {

  const [products, setProducts] = useState([]);

  const [orders, setOrders] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [productData, setProductData] = useState({
    productName: "",
    price: "",
    stock: "",
    category: "",
    vendorName: ""
  });

const productsRef = useRef(null);

const [orderData, setOrderData] = useState({

  customerName: "",

  productName: "",

  quantity: "",

  totalPrice: "",

  vendorName: ""

});

  // FETCH PRODUCTS
  const fetchProducts = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(response.data.products);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchOrders = async () => {

  try {

    const response = await axios.get(
      "http://localhost:5000/api/orders"
    );

    setOrders(response.data.orders);

  } catch (error) {

    console.log(error);

  }

};

  // ADD OR UPDATE PRODUCT
  const addProduct = async () => {

    try {

      if (editingId) {

        await axios.put(
          `http://localhost:5000/api/products/${editingId}`,
          productData
        );

        setEditingId(null);

      }

      else {

        await axios.post(
          "http://localhost:5000/api/products/add",
          productData
        );

      }

      fetchProducts();

      setProductData({
        productName: "",
        price: "",
        stock: "",
        category: "",
        vendorName: ""
      });

    } catch (error) {

      console.log(error);

    }

  };

  // EDIT PRODUCT
  const editProduct = (product) => {

    setProductData({
      productName: product.productName,
      price: product.price,
      stock: product.stock,
      category: product.category,
      vendorName: product.vendorName
    });

    setEditingId(product._id);

  };

const addOrder = async () => {

  try {

    await axios.post(

      "http://localhost:5000/api/orders/add",

      orderData

    );

    fetchOrders();

    setOrderData({

      customerName: "",

      productName: "",

      quantity: "",

      totalPrice: "",

      vendorName: ""

    });

  } catch (error) {

    console.log(error);

  }

};

  // DELETE PRODUCT
  const deleteProduct = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      fetchProducts();

    } catch (error) {

      console.log(error);

    }

  };

  // LOAD PRODUCTS
  useEffect(() => {

    fetchProducts();
    fetchOrders();

  }, []);

  // CHART DATA
  const vendorChartData =

    [...new Set(
      products.map(
        (product) => product.vendorName
      )
    )]

    .map((vendor) => {

      return {

        vendor: vendor,

        totalProducts:

          products.filter(
            (product) =>
              product.vendorName === vendor
          ).length

      };

    });

const salesChartData =

  [...new Set(
    orders.map(
      (order) => order.vendorName
    )
  )]

  .map((vendor) => {

    return {

      vendor: vendor,

      revenue:

        orders

          .filter(
            (order) =>
              order.vendorName === vendor
          )

          .reduce(
            (total, order) =>

              total +
              Number(order.totalPrice),

            0
          )

    };

  });

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A020F0"
];

  return (

    <div className="container">

      <h1>Smart Multi-Vendor Marketplace</h1>

      {/* ANALYTICS */}

      <div className="analytics-container">

        <div className="analytics-card">
          <h2>Total Products</h2>
          <p>{products.length}</p>
        </div>

        <div className="analytics-card">
          <h2>Total Stock</h2>
          <p>
            {
              products.reduce(
                (total, product) =>
                  total + Number(product.stock),
                0
              )
            }
          </p>
        </div>

        <div className="analytics-card">
          <h2>Total Inventory Value</h2>
          <p>
            Rs.
            {
              products.reduce(
                (total, product) =>
                  total +
                  (
                    Number(product.price)
                    *
                    Number(product.stock)
                  ),
                0
              )
            }
          </p>
        </div>

        <div className="analytics-card">
          <h2>Total Vendors</h2>
          <p>
            {
              [
                ...new Set(
                  products.map(
                    (product) =>
                      product.vendorName
                  )
                )
              ].length
            }
          </p>
        </div>

<div className="analytics-card">

  <h2>Total Revenue</h2>

  <p>

    Rs.

    {

      orders.reduce(

        (total, order) =>

          total + Number(order.totalPrice),

        0

      )

    }

  </p>

</div>

<div className="analytics-card">

  <h2>Total Orders</h2>

  <p>{orders.length}</p>

</div>

      </div>

      {/* SEARCH */}

      <div className="search-container">

        <input
          type="text"
          placeholder="Search Product..."
          value={searchTerm}
          onChange={(e) => {

          setSearchTerm(e.target.value);

          productsRef.current?.scrollTo({

  top: 0,

  behavior: "smooth"

});

}}
        />

      </div>

      {/* FILTER */}

      <div className="filter-container">

        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value)
          }
        >

          <option value="All">
            All Categories
          </option>

          <option value="Electronics">
            Electronics
          </option>

          <option value="Mobiles">
            Mobiles
          </option>

          <option value="Fashion">
            Fashion
          </option>

          <option value="Accessories">
            Accessories
          </option>

        </select>

      </div>

      {/* FORM */}

      <div className="form-container">

        <input
          type="text"
          placeholder="Product Name"
          value={productData.productName}
          onChange={(e) =>
            setProductData({
              ...productData,
              productName: e.target.value
            })
          }
        />

        <input
          type="number"
          placeholder="Price"
          value={productData.price}
          onChange={(e) =>
            setProductData({
              ...productData,
              price: e.target.value
            })
          }
        />

        <input
          type="number"
          placeholder="Stock"
          value={productData.stock}
          onChange={(e) =>
            setProductData({
              ...productData,
              stock: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Category"
          value={productData.category}
          onChange={(e) =>
            setProductData({
              ...productData,
              category: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Vendor Name"
          value={productData.vendorName}
          onChange={(e) =>
            setProductData({
              ...productData,
              vendorName: e.target.value
            })
          }
        />

        <button onClick={addProduct}>
          {editingId ? "Update Product" : "Add Product"}
        </button>

      </div>


<div className="form-container">

  <h2>Create Order</h2>

  <input
    type="text"
    placeholder="Customer Name"
    value={orderData.customerName}
    onChange={(e) =>
      setOrderData({
        ...orderData,
        customerName: e.target.value
      })
    }
  />

  <input
    type="text"
    placeholder="Product Name"
    value={orderData.productName}
    onChange={(e) =>
      setOrderData({
        ...orderData,
        productName: e.target.value
      })
    }
  />

  <input
    type="number"
    placeholder="Quantity"
    value={orderData.quantity}
    onChange={(e) =>
      setOrderData({
        ...orderData,
        quantity: e.target.value
      })
    }
  />

  <input
    type="number"
    placeholder="Total Price"
    value={orderData.totalPrice}
    onChange={(e) =>
      setOrderData({
        ...orderData,
        totalPrice: e.target.value
      })
    }
  />

  <input
    type="text"
    placeholder="Vendor Name"
    value={orderData.vendorName}
    onChange={(e) =>
      setOrderData({
        ...orderData,
        vendorName: e.target.value
      })
    }
  />

  <button onClick={addOrder}>
    Create Order
  </button>

</div>

      {/* CHART */}

      <div className="chart-section">

        <h2>Vendor Products Chart</h2>

        <BarChart
          width={700}
          height={300}
          data={vendorChartData}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="vendor" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="totalProducts"
            fill="#000"
          />

        </BarChart>

      </div>


<div className="chart-section">

  <h2>Vendor Revenue Analytics</h2>

  <PieChart width={500} height={350}>

    <Pie
      data={salesChartData}
      dataKey="revenue"
      nameKey="vendor"
      outerRadius={120}
    >

      {
        salesChartData.map(
          (entry, index) => (

            <Cell
              key={`cell-${index}`}
              fill={
                COLORS[
                  index % COLORS.length
                ]
              }
            />

          )
        )
      }

    </Pie>

    <Tooltip />

    <Legend />

  </PieChart>

</div>

      {/* VENDOR ANALYTICS */}

      <div className="vendor-analytics">

        <h2>Vendor Performance</h2>

        {
          [...new Set(
            products.map(
              (product) => product.vendorName
            )
          )].map((vendor) => (

            <div
              className="vendor-card"
              key={vendor}
            >

              <h3>{vendor}</h3>

              <p>
                Total Products:
                {
                  products.filter(
                    (product) =>
                      product.vendorName === vendor
                  ).length
                }
              </p>

              <p>
                Total Inventory Value:
                Rs.
                {
                  products
                    .filter(
                      (product) =>
                        product.vendorName === vendor
                    )
                    .reduce(
                      (total, product) =>
                        total +
                        (
                          Number(product.price)
                          *
                          Number(product.stock)
                        ),
                      0
                    )
                }
              </p>

            </div>

          ))
        }

      </div>

<div className="products-section">

  <h2>Orders List</h2>

  {

    orders.map((order) => (

      <div
        className="product-card"
        key={order._id}
      >

        <h3>{order.customerName}</h3>

        <p>
          Product:
          {order.productName}
        </p>

        <p>
          Quantity:
          {order.quantity}
        </p>

        <p>
          Revenue:
          Rs. {order.totalPrice}
        </p>

        <p>
          Vendor:
          {order.vendorName}
        </p>

      </div>

    ))

  }

</div>

      {/* PRODUCTS */}

      <div className="products-section">

        <h2>Products List</h2>

        {
          products

            .filter((product) => {

              const matchesSearch =

                product.productName
                  .toLowerCase()
                  .includes(
                    searchTerm.toLowerCase()
                  );

              const matchesCategory =

                selectedCategory === "All"
                ||
                product.category === selectedCategory;

              return (
                matchesSearch
                &&
                matchesCategory
              );

            })

            .map((product) => (

              <div
                className="product-card"
                key={product._id}
              >

                <h3>{product.productName}</h3>

                <p>
                  Price: Rs. {product.price}
                </p>

                <p>
                  Stock: {product.stock}
                </p>

                <p>
                  Category: {product.category}
                </p>

                <p>
                  Vendor: {product.vendorName}
                </p>

                <button
                  onClick={() =>
                    editProduct(product)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteProduct(product._id)
                  }
                >
                  Delete
                </button>

              </div>

            ))
        }

      </div>

<footer className="footer">

  Designed & Developed
  by ASJ Production

</footer>

    </div>

  );

}


export default App;