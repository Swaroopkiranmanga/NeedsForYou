import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Importing Font Awesome icons
import "bootstrap/dist/css/bootstrap.min.css";

const AdminSubCategory = () => {
  const navigate = useNavigate();
  const [subcategories, setSubcategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  const fetchSubcategories = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:8081/api/get/categories");
      if (res.data.category && Array.isArray(res.data.category)) {
        let subcategoryList = [];
        for (let category of res.data.category) {
          if (category.subCategory && Array.isArray(category.subCategory)) {
            for (let subcategory of category.subCategory) {
              subcategoryList.push({
                ...subcategory,
                categoryId: category.id,
                categoryName: category.name,
              });
            }
          }
        }
        setSubcategories(subcategoryList);
      } else {
        console.error("Invalid category data format:", res.data);
        alert("Failed to fetch subcategories. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      alert("Failed to fetch subcategories.");
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToUpdateForm = (id) => {
    navigate(`/edit-subcategory/${id}`);
  };

  const deleteSubcategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      try {
        await axios.delete(`http://localhost:8081/api/subcategory/${id}`);
        alert("Subcategory deleted successfully!");
        fetchSubcategories();
      } catch (error) {
        console.error("Error deleting subcategory:", error);
        alert("Failed to delete subcategory.");
      }
    }
  };

  const navigateToAddForm = () => {
    navigate("/add-subcategory");
  };

  useEffect(() => {
    fetchSubcategories();
  }, []);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-md-12">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white text-center">
              <h3>Subcategory</h3>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-end mb-4">
                <button className="btn btn-success" onClick={navigateToAddForm}>
                  Add Subcategory
                </button>
              </div>
              {isLoading ? (
                <p className="text-center">Loading subcategories...</p>
              ) : subcategories.length === 0 ? (
                <p className="text-center">No subcategories available.</p>
              ) : (
                <table className="table table-bordered table-striped table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Subcategory Name</th>
                      <th>Description</th>
                      <th>Category Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subcategories.map((subCategory) => (
                      <tr key={subCategory.id}>
                        <td>{subCategory.name}</td>
                        <td>{subCategory.description}</td>
                        <td>{subCategory.categoryName}</td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => navigateToUpdateForm(subCategory.id)}
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteSubcategory(subCategory.id)}
                            title="Delete"
                          >
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSubCategory;
