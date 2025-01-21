
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";  // Importing icons
import "bootstrap/dist/css/bootstrap.min.css";

const AdminCategory = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/get/categories");
      setCategories(res.data.category);
    } catch (error) {
      alert("Failed to fetch categories.");
    }
  };

  const deleteCategory = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8081/api/category/${id}`);
        alert("Category deleted successfully!");
        fetchCategories();
      } catch (error) {
        alert("Failed to delete category. Please try again.");
      }
    }
  };

  const navigateToAdd = () => {
    navigate("/add-category");
  };

  const navigateToUpdate = (categoryId) => {
    navigate(`/update-category/${categoryId}`);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-md-12">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white text-center">
              <h3>Category</h3>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-end mb-4">
                <button className="btn btn-success" onClick={navigateToAdd}>
                  Add Category
                </button>
              </div>
              <table className="table table-bordered table-striped table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Category Name</th>
                    <th>Category Description</th>
                    <th>Category Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.id}>
                      <td>{category.name}</td>
                      <td>{category.description}</td>
                      <td>
                        <img
                          src={category.image}
                          alt="category"
                          className="img-fluid"
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => navigateToUpdate(category.id)}
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteCategory(category.id)}
                          title="Delete"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategory;
