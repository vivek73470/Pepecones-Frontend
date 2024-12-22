import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingOverlay from "./components/LoadingOverlay";
import { useDispatch, useSelector } from "react-redux";
import Account from "./routes/Account";
import Dashboard from "./routes/Dashborad";
import Login from "./routes/Login";
import NotFoundPage from "./routes/NotFoundPage";
import ManageTeam from "./routes/ManageTeam";
import ProfileForm from "./routes/ProfileForm";
import VendorList from "./routes/VendorList";
import ProductList from "./routes/ProductList";
import DailyReports from "./routes/DailyReports";
import Blogs from "./routes/Blogs";
import FeatProduct from "./routes/FeatProduct";
import Setting from "./routes/Setting";
import Leads from "./routes/Leads";
import "./fonts.css"
import AddBlog from "./routes/AddBlog";
import AddProduct from "./routes/AddProduct";
import ProductListing from "./UserRoutes/ProductListing";
import AllProducts from "./UserRoutes/AllProducts";
import SingleProduct from "./UserRoutes/SingleProduct";
import Contact from "./UserRoutes/Contact";
import BlogPage from "./UserRoutes/BlogHome";
import BlogDetailsPage from "./UserRoutes/BlogDetails";
import MainB2bPage from "./UserRoutes/MainB2bPage";
import EditBlog from "./routes/EditBlog";
import EditProduct from "./routes/EditProduct";
import About from "./UserRoutes/AboutUs"
import Home from "./UserRoutes/Home/Home"
import WomenEmpowerment from "./UserRoutes/WomenEmpowerment"
import NewAdd from "./routes/NewAdd";
import EditAdd from "./routes/EditAdd";
import ComingSoon from "./routes/ComingSoon"
function App() {
  const fetching = useSelector((state) => state.fetching);


  return (
    <>
      {fetching && <LoadingOverlay show={fetching} />}
      <Routes>
        <Route index element={<Home />} />
        
        <Route path="/admin" element={<Account  />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard  />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="featProduct" element={<FeatProduct />} />
          <Route path="managevendor" element={<ManageTeam />} />
          <Route path="profileform" element={<ProfileForm />} />
          <Route path="vendorslist" element={<VendorList />} />
          <Route path="productlist" element={<ProductList />} />
          <Route path="dailyreports" element={<DailyReports />} />
          <Route path="setting" element={<Setting />} />
          <Route path="leads" element={<Leads/>} />
          <Route  path="add-blog"  element={<AddBlog/>} />
          <Route  path="edit-blog"  element={<EditBlog/>} />
          <Route path="add-product" element={<AddProduct/>}    />
          <Route path="edit-product" element={<EditProduct/>}    />
          <Route path="new-add" element={<NewAdd/>}    />
          <Route path="edit-add" element={<EditAdd/>}    />
        </Route>

        
        <Route path="/login" element={<Login />} />
        <Route path="productListing" element={<ProductListing />} />
        <Route path="aboutus" element={<About />} />
        <Route path="allProducts" element={<AllProducts />} />
        <Route  path="contact" element={<Contact  />}/>
        <Route path="bloghome" element={<BlogPage/>}/>
        <Route path="b2b" element={<MainB2bPage/>}/>
        <Route path="/" element={<Home/>} />
        <Route path="women-empowerment" element={<WomenEmpowerment/>}/>
        <Route path="blogdetails/:url" element={<BlogDetailsPage/>}/>
        <Route path="singleProduct/:url" element={<SingleProduct/>}/>
        <Route path="comingsoon" element={<ComingSoon />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;