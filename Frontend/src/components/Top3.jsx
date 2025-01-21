import axios from "axios";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";
function Top3() {
  const [products, setProducts] = useState([]); 
  const { addToCart } = useCart(); 
  const cartfunc=(product) =>{
    const qty=1;
    alert("added to cart");
    addToCart({ ...product, qty })
  }
  const func = async () => {
    const res = await axios.get("http://localhost:8081/api/get/categories");
    let newProducts = [];
    let counter=0;             
      for (const element of res.data.category) {
        for (const element1 of element.subCategory) {
          newProducts = [...newProducts, ...element1.product];
          counter += element1.product.length;
          if(counter>=9){
            newProducts = newProducts.slice(0, 9);
            break;
          }
          if(counter>=9) break;
        }
      }
      setProducts(newProducts);
  };

  useEffect(() => {
    func();
  }, []);  
  return (
    <main className="container mt-4">
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card">
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  backgroundColor: "black",
                }} 
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.price}</p>
                <button className="btn btn-primary" onClick={()=>cartfunc(product)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Top3;