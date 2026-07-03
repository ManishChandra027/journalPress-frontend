import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


import PostForm from "../../components/blog/PostForm";
import { getBlogBySlug } from "../../services/postService";


const EditPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState({});
  const nevigate = useNavigate();
  useEffect(() => {
    if (slug) {
     getBlogBySlug(slug).then((res) => {
        if (res) {
        
          setPost(res.data);
        }
      });
    } else {
      nevigate("/");
    }
  }, [slug, nevigate]);
 
  return <PostForm existingPostData={post} />;
};

export default EditPost;
