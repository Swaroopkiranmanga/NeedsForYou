import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";
import { useNavigate, useParams } from "react-router-dom";

const ProductsPage = () => {
  const [grocery, setGrocery] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10); // Number of items per page
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const getGroceries = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await axios.get(
        `http://localhost:8081/api/products?size=20&subcategoryId=${id}`
      );
      const { content } = response.data;
      setGrocery(content || []);
    } catch (error) {
      setError("Failed to fetch products. Please try again later.");
      console.error("Error fetching groceries:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  const display_singleitem=(groceryItem)=>{

    navigate("/productitem",{state:{groceryItem}})
  }

  useEffect(() => {
    getGroceries();
  }, [id,currentPage]);

  const totalPages = Math.ceil(grocery.length / itemsPerPage);

  const paginatedItems = grocery.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  return (<>
    <div className="GroceryPage">
      {error && <p className="error-message">{error}</p>}
      {loading && <p className="loading-message">Loading...</p>}
      {!loading && paginatedItems.length > 0 && (
        <div className="Grocery">
          {paginatedItems.map((groceryItem, index) => (
            <div
              key={index}
              className="grocery-card-horizontal"
              onClick={() => display_singleitem(groceryItem)}
            >
              <img
                src={groceryItem.image}
                alt={groceryItem.name}
                className="grocery-image"
                loading="lazy"
              />
              <div className="grocery-details-horizontal">
                <div className="grocery-name">{groceryItem.name}</div>
                <div className="grocery-description">
                  {groceryItem.description}
                </div>
                <div className="grocery-price">Price: ₹{groceryItem.price}</div>
                <div className="grocery-rating">
                  Rating: {groceryItem.rating}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && grocery.length === 0 && !error && (
        <div className="Grocery">
          <p>No products available for this subcategory.</p>
        </div>
      )}
    </div>
     {/* Pagination in a separate div */}
     <div className="pagination-wrapper">
     <div className="pagination">
       <button
         onClick={() => handlePageChange(currentPage - 1)}
         disabled={currentPage === 0}
       >
         Previous
       </button>
       {Array.from({ length: totalPages || 1 }, (_, index) => (
         <button
           key={index}
           className={currentPage === index ? "active" : ""}
           onClick={() => handlePageChange(index)}
           aria-label={`Go to page ${index + 1}`}
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
   </div>
   </>
  );
};

export default ProductsPage;
