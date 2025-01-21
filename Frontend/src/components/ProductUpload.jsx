import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductUpload = () => {
  const [content, setContent] = useState([]); // State to hold product data
  const [currentPage, setCurrentPage] = useState(0); // Current page state
  const [totalPages, setTotalPages] = useState(0); // Total pages from API
  const [itemsPerPage] = useState(8); // Number of items per page
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate();

  // Fetch products from the API with pagination
  const fetchData = async (page = 0) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8081/api/products?page=${page}&size=${itemsPerPage}`
      );
      const { content, totalPages } = response.data;

      setContent(content || []);
      setTotalPages(totalPages);
      setCurrentPage(page);
    } catch (error) {
      setError("Failed to fetch products. Please try again later.");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on initial load
  }, []);

  const UpdateProduct = (productId) => {
    navigate(`/updateproduct/${productId}`);
  };

  const deleteItem = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:8081/api/products/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 204) {
        fetchData(currentPage); // Refetch data after deletion
        alert("Item deleted successfully");
      } else {
        alert("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Error deleting item");
    }
  };

  const FaUpload = () => {
    navigate("/upload");
  };

  const Export = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8081/api/products/export",
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "products_export.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert("Export successful!");
    } catch (error) {
      console.error("Error exporting data:", error);
      alert("Error exporting data");
    }
  };

  // Function to handle page change
  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      fetchData(page);
    }
  };

  return (
    <>
      <div className="upload">
        <button className="upload-btn" onClick={FaUpload}>
          Upload Products
        </button>
        <button className="export-btn" onClick={Export}>
          Export Products
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <table cellPadding={10} cellSpacing={10}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {content.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td>
                    <span
                      className="fa fa-edit"
                      onClick={() => UpdateProduct(product.id)}
                      style={{ cursor: "pointer" }}
                    ></span>
                  </td>
                  <td>
                    <span
                      className="fa fa-trash"
                      onClick={() => deleteItem(product.id)}
                      style={{ cursor: "pointer" }}
                    ></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={currentPage === index ? "active" : ""}
                onClick={() => handlePageChange(index)}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
            >
              Next
            </button>
          </div>
        </>
      )}

      <style>
        {`
          table {
            width: 100%;
          }
          th {
            background-color: #eef2f7; /* Background for table header */
          }
          th, td {
            border: 1px solid #cbd5e0; /* Border color */
            font-family: 'Lato', sans-serif;
            padding: 8px;
            text-align: center;
            color: #2d3748; /* Text color */
          }
          .upload {
            margin: 10px;
            display: flex;
            justify-content: end;
          }
          .upload-btn, .export-btn {
            background: #3182ce; /* Primary color */
            color: white;
            margin: 10px;
            padding: 10px 20px;
            border: none;
            cursor: pointer;
            border-radius: 4px;
            transition: background-color 0.3s ease;
          }
          .upload-btn:hover, .export-btn:hover {
            background: #2b6cb0; /* Hover color */
          }
          .pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 20px 0;
          }
          .pagination button {
            background-color: #3182ce; /* Button color */
            color: white;
            border: none;
            padding: 10px 20px;
            margin: 0 5px;
            cursor: pointer;
            border-radius: 4px;
            transition: background-color 0.3s ease;
          }
          .pagination button.active {
            background-color: #2b6cb0; /* Active page button color */
          }
          .pagination button:disabled {
            background-color: #cbd5e0; /* Disabled button color */
            cursor: not-allowed;
          }
          .fa-edit {
            color: #3182ce; /* Edit icon */
            font-size: 18px;
          }
          .fa-edit:hover {
            color: #2b6cb0;
          }
          .fa-trash {
            color: #e53e3e; /* Trash icon */
            font-size: 18px;
          }
          .fa-trash:hover {
            color: #c53030;
          }
        `}
      </style>
    </>
  );
};

export default ProductUpload;
