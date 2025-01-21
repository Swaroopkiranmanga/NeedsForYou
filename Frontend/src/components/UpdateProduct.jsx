import React, { useRef, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  // Create refs for the form elements
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const descriptionRef = useRef(null);
  const subcategoryNameRef = useRef(null);
  const brandRef = useRef(null);
  const ratingRef = useRef(null);
  const quantityRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/products/${productId}`
        );
        const product = response.data;
        nameRef.current.value = product.name;
        priceRef.current.value = product.price;
        descriptionRef.current.value = product.description;
        subcategoryNameRef.current.value = product.subcategoryName;
        brandRef.current.value = product.brand;
        ratingRef.current.value = product.rating;
        quantityRef.current.value = product.quantity;
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [productId]);

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
    if (image) {
      formData.append("image", image);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8081/api/products/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Product updated successfully!");
        navigate("/AdminDashboard");
      } else {
        alert("Failed to update product!");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product!");
    }
  };

  const styles = {
    container: {
      width: "50%",
      margin: "auto",
      padding: "1rem",
      backgroundColor: "#eef2f7", // Background
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    title: {
      textAlign: "center",
      color: "#2d3748", // Headings text
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      fontSize: "1rem",
      color: "#4a5568", // Supporting text
      marginBottom: "0.5rem",
    },
    input: {
      fontSize: "1rem",
      border: "1px solid #cbd5e0", // Border
      borderRadius: "4px",
      outline: "none",
      padding: "0.5rem",
      marginBottom: "1rem",
      backgroundColor: "#ffffff", // Input background
      color: "#2d3748", // Input text
    },
    textarea: {
      fontSize: "1rem",
      border: "1px solid #cbd5e0", // Border
      borderRadius: "4px",
      outline: "none",
      padding: "0.5rem",
      marginBottom: "1rem",
      backgroundColor: "#ffffff", // Input background
      color: "#2d3748", // Input text
      resize: "vertical",
    },
    button: {
      backgroundColor: "#3182ce", // Primary button color
      color: "#ffffff", // Button text
      padding: "0.6rem 1.8rem",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "1rem",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#2b6cb0", // Primary hover color
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Update Product</h1>
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
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
