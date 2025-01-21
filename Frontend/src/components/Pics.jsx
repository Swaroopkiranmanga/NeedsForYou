// import React from "react";
// import { useNavigate, useOutletContext } from "react-router-dom"; // Importing useNavigate for navigation

// const Pics = () => {
//   const navigate = useNavigate(); // Initialize the navigate hook

//   const items = [
//     {
//       id: 1,
//       name: "Home accessories",
//       src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMlnfNUBE52qJoWcTjBfAzBq6Nt5ltObqIlQ&s",
//     },
//     {
//       id: 2,
//       name: "Clothing",
//       src: "https://rukminim1.flixcart.com/flap/80/80/image/22fddf3c7da4c4f4.png?q=100",
//     },
//     {
//       id: 3,
//       name: "Electronic",
//       src: "https://rukminim1.flixcart.com/flap/80/80/image/69c6589653afdb9a.png?q=100",
//     },
//     {
//       id: 4,
//       name: "Fashion",
//       src: "https://rukminim1.flixcart.com/fk-p-flap/80/80/image/0d75b34f7d8fbcb3.png?q=100",
//     },
//   ];
//   return (
//     <div className="image-grid">
//       {items.map((item) => (
//         <div key={item.id} className="image-item" onClick={() => handleClick(item.name)}>
//           <img src={item.src} alt={item.name} className="image" />
//           <p className="image-name">{item.name}</p>
//         </div>
        
//       ))}
//       <style>
//         {`
//           .image-grid {
//             display: grid;
//             grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
//             gap: 34px;
//             padding: 10px;
//             text-align: center;
//             padding-bottom: 10px;
//             padding-top: 100px;
//           }

//           .image-item {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             cursor: pointer; /* Adds pointer cursor on hover */
//           }

//           .image {
//             width: 100px;
//             height: 65px;
//             object-fit: cover;
//             border-radius: 8px;
//           }

//           .image-name {
//             margin-top: 10px;
//             font-size: 16px;
//             color: #333;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Pics;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Dropdown, DropdownMenu, DropdownItem } from "react-bootstrap";

const CategoryComponent = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/get/categories") // Replace with your backend URL
      
      .then((response) => {
        console.log(response);
        setCategories(response.data.category);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="image-grid">
      {categories.map((item) => (
        <div key={item.id} className="image-item">
          <img src={item.image} alt={item.name} className="image" />
          <p
            className="image-name"
            onClick={() => setOpenDropdown(openDropdown === item.id ? null : item.id)}
            style={{ cursor: "pointer", marginBottom: "0" }}
          >
            {item.name}
          </p>
          {openDropdown === item.id && (
            <Dropdown show>
              <DropdownMenu>
                {item.subCategory.map((subItem) => (
                  <DropdownItem key={subItem.id} as={Link} to={`/products/${subItem.id}`}>
                    {subItem.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
      ))}
      <style>
        {`
          .image-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 34px;
            padding: 10px;
            text-align: center;
            padding-bottom: 10px;
            padding-top: 10px;
          }

          .image-item {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .image {
            width: 100px; /* Adjust the size as needed */
            height: 65px;
            object-fit: cover; /* Ensures the image fits within the box */
            border-radius: 8px; /* Optional: Adds rounded corners */
          }

          .image-name {
            margin-top: 10px;
            font-size: 16px;
            color: #333; 
          }
        `}
      </style>
    </div>
  );
};

export default CategoryComponent;
