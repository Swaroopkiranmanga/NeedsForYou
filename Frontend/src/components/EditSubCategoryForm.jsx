import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditSubCategoryForm = () => {
  const { id } = useParams(); // Get the subcategory ID from the route
  const navigate = useNavigate();

  // Create refs for the form elements
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const categoryRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({ id: "", name: "" });

  useEffect(() => {
    // Fetch categories for the dropdown
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/get/categories");
        if (response.data && Array.isArray(response.data.category)) {
          setCategories(response.data.category);
        } else {
          console.error("Invalid categories data:", response.data);
          alert("Failed to load categories. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert("Error fetching categories. Please try again later.");
      }
    };

    // Fetch the subcategory details using the ID from URL
    const fetchSubCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/subcategory/${id}`);
        const subcategory = response.data;

        if (response.data) {
          nameRef.current.value = response.data.SubCategory.name || "";
          descriptionRef.current.value = response.data.SubCategory.description || "";
          setCategory(response.data.SubCategory.category || { id: "", name: "" }); // Set the category
        } else {
          alert("Subcategory not found.");
          navigate("/adminsubcategory");
        }
      } catch (error) {
        console.error("Error fetching subcategory:", error);
        alert("Error fetching subcategory!");
      }
    };

    fetchCategories();
    fetchSubCategory();
  }, [id, navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Gather data from refs
    const updatedSubCategory = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      category: { id: category.id }, // Send the category object with the id
    };

    try {
      // Update the subcategory
      const response = await axios.put(
        `http://localhost:8081/api/subcategory/${id}`,
        updatedSubCategory,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Subcategory updated successfully!");
        navigate("/adminsubcategory");
      } else {
        alert("Failed to update subcategory!");
      }
    } catch (error) {
      console.error("Error updating subcategory:", error);
      alert("Error updating subcategory!");
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <h2 className="text-center mb-4">Edit Subcategory</h2>
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            {/* Category Dropdown */}
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                <strong>Category</strong>
              </label>
              <select
                id="category"
                value={category.id} // Prefill selected category based on fetched data
                onChange={(e) =>
                  setCategory({
                    id: e.target.value,
                    name: e.target.options[e.target.selectedIndex].text,
                  })
                }
                ref={categoryRef}
                className="form-select"
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((categoryItem) => (
                  <option key={categoryItem.id} value={categoryItem.id}>
                    {categoryItem.name}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">Please select a category.</div>
            </div>

            {/* Subcategory Name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                <strong>Subcategory Name</strong>
              </label>
              <input
                type="text"
                id="name"
                ref={nameRef}
                className="form-control"
                placeholder="Enter subcategory name"
                required
              />
              <div className="invalid-feedback">Please enter a subcategory name.</div>
            </div>

            {/* Subcategory Description */}
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                <strong>Description</strong>
              </label>
              <textarea
                id="description"
                ref={descriptionRef}
                className="form-control"
                placeholder="Enter subcategory description"
                rows="4"
                required
              ></textarea>
              <div className="invalid-feedback">Please enter a description.</div>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-between mt-4">
              <button type="submit" className="btn btn-success w-45">
                Update Subcategory
              </button>
              <button
                type="button"
                className="btn btn-outline-danger w-45"
                onClick={() => navigate("/adminsubcategory")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSubCategoryForm;

