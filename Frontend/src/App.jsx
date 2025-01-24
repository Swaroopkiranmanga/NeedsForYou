import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import NavBar from "./components/NavBar.jsx";
import { CartProvider } from "./components/CartProvider.jsx";

// Lazy-loaded components
const Pics = React.lazy(() => import("./components/Pics.jsx"));
const Carouse = React.lazy(() => import("./components/Carouse.jsx"));
const Top = React.lazy(() => import("./components/Top.jsx"));
const Top2 = React.lazy(() => import("./components/Top2.jsx"));
const Top3 = React.lazy(() => import("./components/Top3.jsx"));
const Login = React.lazy(() => import("./components/Login.jsx"));
const Register = React.lazy(() => import("./components/Register.jsx"));
const ProductsPage = React.lazy(() => import("./components/ProductsPage.jsx"));
const ProductItem = React.lazy(() => import("./components/ProductItem.jsx"));
const AdminDashboard = React.lazy(() => import("./components/AdminDashboard.jsx"));
const UploadProduct = React.lazy(() => import("./components/UploadProduct.jsx"));
const ProductUpload = React.lazy(() => import("./components/ProductUpload.jsx"));
const UpdateProduct = React.lazy(() => import("./components/UpdateProduct.jsx"));
const CustomerCreate = React.lazy(() => import("./components/CustomerCreate.jsx"));
const CustomerUpdate = React.lazy(() => import("./components/CustomerUpdate.jsx"));
const Customers = React.lazy(() => import("./components/Customers.jsx"));
const AdminCategory = React.lazy(() => import("./components/AdminCategory.jsx"));
const AddCategory = React.lazy(() => import("./components/AddCategory.jsx"));
const UpdateCategory = React.lazy(() => import("./components/UpdateCategory.jsx"));
const AddSubCategoryForm = React.lazy(() => import("./components/AddSubCategoryForm.jsx"));
const EditSubCategoryForm = React.lazy(() => import("./components/EditSubCategoryForm.jsx"));
const AdminSubCategory = React.lazy(() => import("./components/AdminSubCategory.jsx"));
const CartInvoice = React.lazy(() => import("./components/CartInovice.jsx"));


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