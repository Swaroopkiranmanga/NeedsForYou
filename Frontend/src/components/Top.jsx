import axios from "axios";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";
function Top() {
    const [products, setProducts] = useState([]); 
    const { addToCart } = useCart(); 
    const cartfunc=(product) =>{
      const qty=1;
      alert("added to cart");
      addToCart({ ...product, qty })
    }
    const func = async () => {
      const res = await axios.get("http://localhost:8081/api/get/categories");
      console.log(res);
      let newProducts = [];
let counter = 0;

for (const element of res.data.category) {
  for (const element1 of element.subCategory) {
    newProducts = [...newProducts, ...element1.product];
    counter += element1.product.length;
    if (counter >= 6) {
      newProducts = newProducts.slice(0, 6);
      break;
    }
  }
  if (counter >= 6) {
    break;
  }
}

// Update the state after the loop to prevent multiple state updates
setProducts(newProducts);
    };
  
  useEffect(() => {
      func();
    }, []);
    return (
      <main className="container mt-4">
      
        <h2 className="text-center mb-4">Top Picks</h2>
  
        <div className="row">
         
          <div className="col-md-12 d-flex justify-content-between flex-wrap">
            {products.map((product) => (
              <div key={product.id} className="card" style={{ width: "16%" }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "contain",
                  }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.price}</p>
                  <button className="btn btn-primary" onClick={()=>cartfunc(product)}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }
export default Top;