import React, { useState, useRef, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import init from "../firebase";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
const AddPackage = () => {
  const [data, setData] = useState({
    description: "",
    type: "",
    price: "",
  });
  const btnHandler = async (e) => {
    // alert("ok");
    e.preventDefault();
    const { description, type, price } = data;
    if (description !== "" && type !== "" && price !== "") {
      try {
        await setDoc(doc(init.db, "package", uuidv4()), {
          description,
          type,
          price,
          createdAt: serverTimestamp(),
        });
        setData({
          description: "",
          type: "",
          price: "",
        });
        toast.success("Service Added successfully.");
      } catch (err) {
        console.log("Error" + err);
      }
    } else {
      toast.error("Please fill all the mandetary field");
    }
  };
  const formHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <form method="post" onSubmit={btnHandler}>
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="number"
                      name="price"
                      placeholder="Enter price"
                      className="form-control"
                      value={data.price}
                      onChange={formHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Package Type</label>
                    <input
                      type="text"
                      name="type"
                      placeholder="Enter type"
                      className="form-control"
                      value={data.type}
                      onChange={formHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      rows={5}
                      type="text"
                      name="description"
                      placeholder="Enter description"
                      className="form-control"
                      value={data.description}
                      onChange={formHandler}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      value="Add Package"
                      className="btn btn-primary"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default AddPackage;
