import React, { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadProduct = () => {
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const descriptionRef = useRef(null);
  const subcategoryNameRef = useRef(null);
  const brandRef = useRef(null);
  const ratingRef = useRef(null);
  const quantityRef = useRef(null);
  const imageRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      name: nameRef.current.value,
      price: priceRef.current.value,
      description: descriptionRef.current.value,
      subcategoryName: subcategoryNameRef.current.value,
      brand: brandRef.current.value,
      rating: ratingRef.current.value,
      quantity: quantityRef.current.value,
    };
    const image = imageRef.current.files[0];

    const formData = new FormData();
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );
    formData.append("image", image);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8081/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Product uploaded successfully!");
        navigate("/AdminDashboard");
      } else {
        alert("Failed to upload product!");
      }
    } catch (error) {
      console.error("Error uploading product:", error);
      alert("Error uploading product!");
    }
  };

  const styles = {
    container: {
      width: "50%",
      margin: "auto",
      padding: "1.5rem",
      backgroundColor: "#ffffff", // White card background
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    title: {
      textAlign: "center",
      fontSize: "1.8rem",
      color: "#2d3748", // Dark Gray
      marginBottom: "1rem",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    label: {
      fontSize: "1rem",
      fontWeight: "500",
      color: "#4a5568", // Mid-Gray for labels
    },
    input: {
      padding: "0.5rem",
      fontSize: "1rem",
      border: "1px solid #cbd5e0", // Soft Gray for borders
      borderRadius: "4px",
      outline: "none",
      backgroundColor: "#eef2f7", // Light Gray-Blue for inputs
      width: "100%",
    },
    textarea: {
      padding: "0.5rem",
      fontSize: "1rem",
      border: "1px solid #cbd5e0", // Soft Gray
      borderRadius: "4px",
      outline: "none",
      backgroundColor: "#eef2f7", // Light Gray-Blue for textarea
      width: "100%",
      resize: "vertical",
      minHeight: "60px",
    },
    button: {
      backgroundColor: "#3182ce", // Soft Blue
      color: "white",
      padding: "0.6rem 1.8rem",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: "bold",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#2b6cb0", // Darker Blue
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Upload Product</h1>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        style={styles.form}
      >
        <label htmlFor="name" style={styles.label}>
          Product Name:
        </label>
        <input
          type="text"
          id="name"
          ref={nameRef}
          placeholder="Enter product name"
          style={styles.input}
        />

        <label htmlFor="price" style={styles.label}>
          Price:
        </label>
        <input
          type="text"
          id="price"
          ref={priceRef}
          placeholder="Enter product price"
          style={styles.input}
          step="0.01"
        />

        <label htmlFor="description" style={styles.label}>
          Description:
        </label>
        <textarea
          id="description"
          ref={descriptionRef}
          placeholder="Enter product description"
          style={styles.textarea}
        ></textarea>

        <label htmlFor="subcategoryName" style={styles.label}>
          Subcategory Name:
        </label>
        <input
          type="text"
          id="subcategoryName"
          ref={subcategoryNameRef}
          placeholder="Enter subcategory name"
          style={styles.input}
        />

        <label htmlFor="brand" style={styles.label}>
          Brand:
        </label>
        <input
          type="text"
          id="brand"
          ref={brandRef}
          placeholder="Enter product brand"
          style={styles.input}
        />

        <label htmlFor="rating" style={styles.label}>
          Rating:
        </label>
        <input
          type="number"
          id="rating"
          ref={ratingRef}
          step="0.1"
          placeholder="Enter product rating"
          style={styles.input}
        />

        <label htmlFor="quantity" style={styles.label}>
          Quantity:
        </label>
        <input
          type="number"
          id="quantity"
          ref={quantityRef}
          placeholder="Enter quantity in stock"
          style={styles.input}
        />

        <label htmlFor="image" style={styles.label}>
          Product Image:
        </label>
        <input type="file" id="image" ref={imageRef} style={styles.input} />

        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor =
              styles.buttonHover.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = styles.button.backgroundColor)
          }
        >
          Upload Product
        </button>
      </form>
    </div>
  );
};

export default UploadProduct;
