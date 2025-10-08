"use client"
import Container from "@/app/components/Layouts/Container.js";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function singleBlog(){
    const [singleBlogData, setSingleBlogData] = useState({})
    const {id} = useParams();
    console.log(id);
     useEffect(()=>{
        fetch(`https://dummyjson.com/posts/${id}`)
        .then((res) => res.json())
        .then((data) => setSingleBlogData(data))
      }, [])
      console.log(singleBlogData);
      
    return(
        <div>
            <Container>
                <div>
                    BLog ID: {id}
                    <h2>Title: {singleBlogData.title}</h2>
                    <hp>Body: {singleBlogData.body}</hp>
                </div>
            </Container>
        </div>
    )
}