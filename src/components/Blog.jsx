import React, { useState, useRef, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import init from "../firebase";
import {
  setDoc,
  doc,
  serverTimestamp,
  getDocs,
  collection,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import JoditEditor from "jodit-react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
const Blog = () => {
  const [value, setValue] = useState();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [blogCat, setBlogCat] = useState([]);
  const [progresspercent, setProgresspercent] = useState(0);
  const [data, setData] = useState({
    keyword: "",
    meta_description: "",
    title: "",
    slug: "",
  });
  const btnHandler = async (e) => {
    e.preventDefault();
    const { keyword, meta_description, title, slug } = data;
    if (
      keyword !== "" &&
      meta_description !== "" &&
      slug !== "" &&
      title !== ""
    ) {
      try {
        await setDoc(doc(init.db, "blog", uuidv4()), {
          keyword,
          meta_description,
          title,
          slug,
          description: content,
          image: imgUrl,
          createdAt: serverTimestamp(),
        });
        setData({
          keyword: "",
          meta_description: "",
          title: "",
          slug: "",
        });
        setImgUrl(null);
        setProgresspercent(0);
        setContent("");
      } catch (err) {
        console.log("Error" + err);
      }
      toast.success("blog Added successfully.");
    } else {
      toast.error("Please fill all the mandetary field");
    }
  };
  const getBlogCat = async () => {
    const mycollection = collection(init.db, "blog_category");
    const data = await getDocs(mycollection);
    setBlogCat(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };
  useEffect(() => {
    getBlogCat();
  }, []);
  const formHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };
  const imgHandler = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(init.storage, `${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
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
                    <label>Add Image</label>
                    <input
                      type="file"
                      name="image"
                      className="form-control"
                      onChange={imgHandler}
                    />
                    {!imgUrl && progresspercent
                      ? `Uploading ${progresspercent}`
                      : ""}
                  </div>
                  <div className="form-group">
                    <label>Keyword</label>
                    <input
                      type="text"
                      name="keyword"
                      placeholder="Enter Keyword"
                      className="form-control"
                      value={data.keyword}
                      onChange={formHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Meta Description</label>
                    <input
                      type="text"
                      name="meta_description"
                      placeholder="Enter Meta Description"
                      className="form-control"
                      value={data.meta_description}
                      onChange={formHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter Title"
                      className="form-control"
                      value={data.title}
                      onChange={formHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Slug</label>
                    <input
                      type="text"
                      name="slug"
                      placeholder="Enter Slug"
                      className="form-control"
                      value={data.slug}
                      onChange={formHandler}
                    />
                  </div>
                  <JoditEditor
                    ref={editor}
                    value={content}
                    onChange={(newContent) => setContent(newContent)}
                  />

                  <div className="form-group">
                    <input
                      type="submit"
                      value="Add Blog"
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
export default Blog;
