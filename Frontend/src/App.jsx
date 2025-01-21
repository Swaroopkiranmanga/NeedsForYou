/*import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/NavBar.jsx";
import Pics from "./components/Pics.jsx";
import Carouse from "./components/Carouse.jsx";
import Top from "./components/Top.jsx";
import Top2 from "./components/Top2.jsx";
import Top3 from "./components/Top3.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import ProductsPage from "./components/ProductsPage.jsx";
import ProductItem from "./components/ProductItem.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import UploadProduct from "./components/UploadProduct.jsx";
import ProductUpload from "./components/ProductUpload.jsx";
import UpdateProduct from "./components/UpdateProduct.jsx";
import CustomerCreate from "./components/CustomerCreate.jsx";
import CustomerUpdate from "./components/CustomerUpdate.jsx";
import Customers from "./components/Customers.jsx";
import AdminCategory from "./components/AdminCategory.jsx";
import AddCategory from "./components/AddCategory.jsx";
import UpdateCategory from "./components/UpdateCategory.jsx";
import AddSubCategoryForm from "./components/AddSubCategoryForm.jsx";
import EditSubCategoryForm from "./components/EditSubCategoryForm.jsx";
import AdminSubCategory from "./components/AdminSubCategory.jsx";

const App = () => {
  return (
    
    <Router>
     
      <NavBar />

     
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Pics >
               
              </Pics>
              <Carouse />
              <Top />
              <Top2 />
              <Top3 />
            </>
          }
        />
          <Route path="/products/:id" element={<ProductsPage />} />
        <Route path="/productitem" element={<ProductItem />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        
        <Route path="/AdminDashboard" element={<AdminDashboard />} />

        <Route path="/upload" element={<UploadProduct></UploadProduct>}></Route>
        <Route path="/productupload" element={<ProductUpload></ProductUpload>}></Route>
        <Route path="/updateproduct/:productId" element={<UpdateProduct></UpdateProduct>}></Route>
        <Route path="/customer" element={<Customers />} />
        
         <Route path="/customerupdate/:id" element={<CustomerUpdate />} />
         <Route path="/customercreate" element={<CustomerCreate />} />
        <Route path="/admin-categories" element={<AdminCategory />} />
        <Route path="/add-category" element={<AddCategory />} />
          <Route path="/update-category/:id" element={<UpdateCategory />} />
          <Route path="/add-subcategory" element={<AddSubCategoryForm/>} />
        <Route path="/edit-subcategory/:id" element={<EditSubCategoryForm />} />
        <Route path="/adminsubcategory" element={<AdminSubCategory />} />
        
      </Routes>

      
    </Router>
    
  );
};

export default App;*/


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/NavBar.jsx";
import Pics from "./components/Pics.jsx";
import Carouse from "./components/Carouse.jsx";
import Top from "./components/Top.jsx";
import Top2 from "./components/Top2.jsx";
import Top3 from "./components/Top3.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import ProductsPage from "./components/ProductsPage.jsx";
import ProductItem from "./components/ProductItem.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import UploadProduct from "./components/UploadProduct.jsx";
import ProductUpload from "./components/ProductUpload.jsx";
import UpdateProduct from "./components/UpdateProduct.jsx";
import CustomerCreate from "./components/CustomerCreate.jsx";
import CustomerUpdate from "./components/CustomerUpdate.jsx";
import Customers from "./components/Customers.jsx";
import AdminCategory from "./components/AdminCategory.jsx";
import AddCategory from "./components/AddCategory.jsx";
import UpdateCategory from "./components/UpdateCategory.jsx";
import AddSubCategoryForm from "./components/AddSubCategoryForm.jsx";
import EditSubCategoryForm from "./components/EditSubCategoryForm.jsx";
import AdminSubCategory from "./components/AdminSubCategory.jsx";
import { CartProvider } from "./components/CartProvider.jsx";
import CartInvoice from "./components/CartInovice.jsx";

function App() {
  return (
    
    <CartProvider>
    <Router>
      <Routes>
       
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <Pics />
              <Carouse />
              <Top />
              <Top2 />
              <Top3 />
            </>
          }
        />
        <Route
          path="/products/:id"
          element={
            <>
              <NavBar />
              <ProductsPage />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <NavBar />
              <Login />
            </>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/productitem"
          element={
            <>
              <NavBar />
              <ProductItem />
            </>
          }
        />

       
        <Route
          path="/adminDashboard"
          element={
            <AdminDashboard
              homeContent={
                <>
                  <Pics />
                  <Carouse />
                  <Top />
                  <Top2 />
                  <Top3 />
                </>
              }
            />
          }
        />
         <Route path="/upload" element={<UploadProduct></UploadProduct>}></Route>
        <Route path="/productupload" element={<ProductUpload></ProductUpload>}></Route>
        <Route path="/updateproduct/:productId" element={<UpdateProduct></UpdateProduct>}></Route>
        <Route path="/customer" element={<Customers />} />
	
        
         <Route path="/customerupdate/:id" element={<CustomerUpdate />} />
         <Route path="/customercreate" element={<CustomerCreate />} />
         <Route path="/admin-categories" element={<AdminCategory />} />
	        <Route path="/add-category" element={<AddCategory />} />
          <Route path="/update-category/:id" element={<UpdateCategory />} />
          <Route path="/add-subcategory" element={<AddSubCategoryForm/>} />
        <Route path="/edit-subcategory/:id" element={<EditSubCategoryForm />} />
        <Route path="/adminsubcategory" element={<AdminSubCategory />} />
        <Route path="/cartinvoice" element={<CartInvoice />} />

      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;