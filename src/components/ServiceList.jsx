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

const ServiceList = () => {
  const { user } = useUserAuth();
  const merchant_id = user.uid;
  const [data, setData] = useState();
  console.log(data);
  const [loading, setLoading] = useState(false);
  const getBlog = async () => {
    setLoading(true);

    const mycollection = collection(init.db, "service");
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
        await deleteDoc(doc(init.db, "service", blog_id));
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
                <div className="card-header row d-flex justify-content-between align-items-center">
                  <div className="col-md-4">
                    <Link
                      to="/dashboard/add-service"
                      className="btn btn-primary btn-sm"
                    >
                      {" "}
                      + Add Service{" "}
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      className="table  table-bordered  shadow-sm mt-3"
                      cellPadding={5}
                    >
                      <thead>
                        <tr>
                          <th>S.No.</th>
                          <th>Image</th>
                          <th>Title</th>
                          <th>Description</th>
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
                                <td>
                                  <div className="d-flex align-items-center">
                                    <img
                                      src={item.image}
                                      style={{
                                        height: "60px",
                                        width: "60px",
                                        borderRadius: "10px",
                                        marginRight: "5px",
                                      }}
                                    />
                                  </div>
                                </td>
                                <td>{item.title}</td>
                                <td>{item.description}</td>

                                <td>
                                  <button className="btn  ">
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

export default ServiceList;
