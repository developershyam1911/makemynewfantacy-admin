import React, { useState, useEffect } from "react";
import {
  MdDashboard,
  MdPeople,
  MdAccountBox,
  MdOutlineBusinessCenter,
  MdOutlineLibraryAdd,
  MdOutlineViewList,
  MdContactPhone,
} from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./style.min.css";
import SidebarMenu from "./SidebarMenu";
const Sidenavbar = () => {
  const [windowDimension, setWindowDimension] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(true);
  const detectSize = () => {
    setWindowDimension(window.innerWidth);
    if (windowDimension < 768) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };
  useEffect(() => {
    if (windowDimension < 768) {
      setIsOpen(false);
    }
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimension]);

  const [item, setItem] = useState([
    {
      title: "Services Management",
      icon: <MdPeople className="my__nav__icon" />,
      dropDown: [
        {
          title: "Add Service",
          icon: <MdAccountBox className="my__nav__icon" />,
          href: "/dashboard/add-service",
        },
        {
          title: "Service List",
          icon: <MdOutlineLibraryAdd className="my__nav__icon" />,
          href: "/dashboard/service-list",
        },
      ],
    },
    {
      title: "Package Management",
      icon: <MdPeople className="my__nav__icon" />,
      dropDown: [
        {
          title: "Add Package",
          icon: <MdAccountBox className="my__nav__icon" />,
          href: "/dashboard/add-package",
        },
        {
          title: "Package List",
          icon: <MdOutlineLibraryAdd className="my__nav__icon" />,
          href: "/dashboard/package-list",
        },
      ],
    },
    {
      title: "Friendship Management",
      icon: <MdPeople className="my__nav__icon" />,
      dropDown: [
        {
          title: "Add Top Friendship",
          icon: <MdAccountBox className="my__nav__icon" />,
          href: "/dashboard/add-friendship",
        },
        {
          title: "Friendship List",
          icon: <MdOutlineLibraryAdd className="my__nav__icon" />,
          href: "/dashboard/friendship-list",
        },
      ],
    },
    {
      title: "Testimonial Mgmt",
      icon: <MdPeople className="my__nav__icon" />,
      dropDown: [
        {
          title: "Add Testimonial",
          icon: <MdAccountBox className="my__nav__icon" />,
          href: "/dashboard/add-testimonial",
        },
        {
          title: "Testimonial List",
          icon: <MdOutlineLibraryAdd className="my__nav__icon" />,
          href: "/dashboard/testimonial-list",
        },
      ],
    },
    {
      title: "Blog Management",
      icon: <MdPeople className="my__nav__icon" />,
      dropDown: [
        {
          title: "Add Blog",
          icon: <MdOutlineViewList className="my__nav__icon" />,
          href: "/dashboard/blog",
        },
        {
          title: "Blog List",
          icon: <MdOutlineViewList className="my__nav__icon" />,
          href: "/dashboard/blog-list",
        },
      ],
    },
  ]);
  return (
    <aside className="left-sidebar" data-sidebarbg="skin5">
      {/* <!-- Sidebar scroll--> */}
      <div className="scroll-sidebar">
        {/* <!-- Sidebar navigation--> */}
        <nav className="sidebar-nav">
          <ul id="sidebarnav" className="pt-4">
            <li className="sidebar-item">
              <Link
                className="sidebar-link waves-effect waves-dark sidebar-link"
                to="dash_board"
                aria-expanded="false"
              >
                <MdDashboard
                  size={23}
                  style={{
                    display: "inline-block",
                    color: "white",
                    textAlign: "center",
                    width: "35px",
                  }}
                />
                <span className="hide-menu">Dashboard</span>
              </Link>
            </li>
            {item.map((item, index) => {
              return (
                <SidebarMenu
                  title={item.title}
                  icon={item.icon}
                  dropDown={item.dropDown}
                  key={index}
                />
              );
            })}
            <li className="sidebar-item">
              <Link
                className="sidebar-link waves-effect waves-dark sidebar-link"
                to="/dashboard/enquiry"
                aria-expanded="false"
              >
                <MdContactPhone
                  size={23}
                  style={{
                    display: "inline-block",
                    color: "white",
                    textAlign: "center",
                    width: "35px",
                  }}
                />
                <span className="hide-menu">Enquiry</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link
                className="sidebar-link waves-effect waves-dark sidebar-link logout_btn"
                to="/dashboard/logout"
                aria-expanded="false"
              >
                <BiLogOutCircle
                  size={23}
                  style={{
                    display: "inline-block",
                    color: "white",
                    textAlign: "center",
                    width: "35px",
                  }}
                />
                <span className="hide-menu">Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidenavbar;
