import React, { useState, useEffect } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import "./BusinessAnalysis.css";
import { doc, getDoc } from "firebase/firestore";
import init from "../firebase";
import { Link } from "react-router-dom";

const BusinessAnalysis = () => {
  const [merchant, setMerchant] = useState();
  const { user } = useUserAuth();
  const merchant_id = user.uid;
  const getSingleDocumentHandler = async () => {
    try {
      console.log(`fetching document data  for merchant Id ${merchant_id}`);
      const res = await getDoc(doc(init.db, "merchants", merchant_id));
      setMerchant(res.data());
    } catch (error) {
      console.log(`Error ${error} `);
    }
  };
  useEffect(() => {
    getSingleDocumentHandler();
  }, [merchant_id]);

  const [box, setBox] = useState([
    {
      title: "Total Enquires",
      quatity: "70",
      url: "https://cdn.iconscout.com/icon/premium/png-256-thumb/impression-2634419-2187376.png",
      href: "/dashboard/enquires",
    },
    {
      title: "Add Services",
      quatity: "70",
      url: "https://img.icons8.com/office/256/booking.png",
      href: "/dashboard/add-service",
    },
    {
      title: "Add Package",
      quatity: "343",
      url: "https://png.pngtree.com/png-vector/20230304/ourmid/pngtree-colorful-blog-speech-bubble-vector-png-image_6633021.png",
      href: "/dashboard/add-package",
    },
    {
      title: "Add  Testimonial",
      quatity: "343",
      url: "https://cdn-icons-png.flaticon.com/512/5702/5702664.png",
      href: "/dashboard/add-testimonial",
    },
    {
      title: "Add New Friend",
      quatity: "343",
      url: "https://cdn.iconscout.com/icon/premium/png-256-thumb/impression-2634419-2187376.png",
      href: "/dashboard/add-friendship",
    },
    // {
    //   title: "Add Services",
    //   quatity: "70",
    //   url: "https://img.icons8.com/office/256/booking.png",
    //   href: "/dashboard/add-service",
    // },
    // {
    //   title: "Add Package",
    //   quatity: "343",
    //   url: "https://png.pngtree.com/png-vector/20230304/ourmid/pngtree-colorful-blog-speech-bubble-vector-png-image_6633021.png",
    //   href: "/dashboard/add-package",
    // },
    // {
    //   title: "Add  Testimonial",
    //   quatity: "343",
    //   url: "https://cdn-icons-png.flaticon.com/512/5702/5702664.png",
    //   href: "/dashboard/add-testimonial",
    // },
    // {
    //   title: "Add New Fried",
    //   quatity: "343",
    //   url: "https://cdn.iconscout.com/icon/premium/png-256-thumb/impression-2634419-2187376.png",
    //   href: "/dashboard/add-friendship",
    // },
  ]);
  const [value, setValue] = useState(50);
  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="card">
          <div className="card-body ">
            <div className="d-md-flex align-items-center">
              <h4 className="card-title">Welcome Admin</h4>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  {box.map((cur, index) => {
                    return (
                      <div className="col-md-3 col-6" key={index}>
                        <div className=" p-10  text-center total_card shadow-sm ">
                          <div className="data d-flex justify-content-around">
                            <img
                              src={cur.url}
                              className="dash_icon"
                              alt="Event Planet"
                            />
                            {/* <h4 className="">{cur.quatity}</h4> */}
                          </div>
                          <Link to={cur.href}>
                            <p className=" p-2">{cur.title}</p>{" "}
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessAnalysis;
