import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import BlogCategory from "./components/BlogCategory";
import Index from "./components/Index";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import BlogList from "./components/BlogList";
import BlogCategoryList from "./components/BlogCategoryList";
import Blog from "./components/Blog";
import EditBlogcat from "./components/EditBlogCat";
import EditBlog from "./components/EditBlog";
import BusinessAnalysis from "./components/BusinessAnalysis";
import TextEditor from "./components/TextEditor";
import AddsService from "./components/AddsService";
import ServiceList from "./components/ServiceList";
import Enquiry from "./components/Enquiry";
import AddPackage from "./components/AddPackage";
import PackageList from "./components/PackageList";
import FriendShip from "./components/FriendShip";
import FriendShipList from "./components/FriendShipList";
import AddTestimonial from "./components/AddTestimonial";
import TestimonialList from "./components/TestimonialList";

const App = () => {
  return (
    <UserAuthContextProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          }
        >
          <Route path="add-service" element={<AddsService />} />
          <Route path="service-list" element={<ServiceList />} />
          <Route path="add-package" element={<AddPackage />} />
          <Route path="package-list" element={<PackageList />} />
          <Route path="add-friendship" element={<FriendShip />} />
          <Route path="friendship-list" element={<FriendShipList />} />
          <Route path="add-testimonial" element={<AddTestimonial />} />
          <Route path="testimonial-list" element={<TestimonialList />} />
          <Route path="enquiry" element={<Enquiry />} />

          <Route path="blog-category-list" element={<BlogCategoryList />} />
          <Route path="blog-category-edit/:blog_id" element={<EditBlogcat />} />
          <Route path="edit-blog/:blog_id" element={<EditBlog />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog-list" element={<BlogList />} />

          <Route path="dash_board" element={<BusinessAnalysis />} />
        </Route>
        <Route path="ckeditor" element={<TextEditor />} />
      </Routes>
    </UserAuthContextProvider>
  );
};

export default App;
