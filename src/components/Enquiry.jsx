import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import init from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { useUserAuth } from "../context/UserAuthContext";
import { Link } from "react-router-dom";
import { MdDelete, MdEditSquare } from "react-icons/md";

const Enquiry = () => {
  const { user } = useUserAuth();
  const merchant_id = user.uid;
  const [data, setData] = useState();
  console.log(data);
  const [loading, setLoading] = useState(false);
  const getBlog = async () => {
    setLoading(true);

    const mycollection = collection(init.db, "enquiry");
    let q = query(mycollection, orderBy("createdAt", "desc"));
    const data = await getDocs(q);
    setData(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };
  useEffect(() => {
    getBlog();
  }, [merchant_id]);
  const deletebtnHandler = async (blog_id) => {
    const choice = window.confirm("Are you sure want to delete?");
    if (choice) {
      try {
        await deleteDoc(doc(init.db, "enquiry", blog_id));
        getBlog();
      } catch (err) {
        console.log(err);
      }
    } else {
      return;
    }
  };
  return (
    <>
      <div className="page-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      className="table  table-bordered  shadow-sm mt-3"
                      cellPadding={5}
                    >
                      <thead>
                        <tr>
                          <th>S.No.</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Mobile Number</th>
                          <th>Plan</th>
                          <th>Message</th>
                          <th>Date</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading && (
                          <tr>
                            <td>
                              <Skeleton count="2" style={{ width: "100%" }} />
                            </td>
                            <td>
                              <Skeleton count="2" style={{ width: "100%" }} />
                            </td>
                            <td>
                              <Skeleton count="2" style={{ width: "100%" }} />
                            </td>
                            <td>
                              <Skeleton count="2" style={{ width: "100%" }} />
                            </td>
                            <td>
                              <Skeleton count="2" style={{ width: "100%" }} />
                            </td>
                            <td>
                              <Skeleton count="2" style={{ width: "100%" }} />
                            </td>
                            <td>
                              <Skeleton count="2" style={{ width: "100%" }} />
                            </td>
                          </tr>
                        )}
                        {data ? (
                          data.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.mobno}</td>
                                <td>{item.price}</td>
                                <td>{item.message}</td>
                                <td>{item.date}</td>
                                <td>
                                  <button className="btn">
                                    <MdDelete
                                      size={24}
                                      style={{ color: "red" }}
                                      onClick={() => deletebtnHandler(item.id)}
                                    />
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr className="text-center text-danger">
                            <td colSpan={6}>Category not found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Enquiry;
