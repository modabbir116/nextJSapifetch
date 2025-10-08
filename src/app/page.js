"use client"
import { useEffect, useState } from "react";
import Container from "./components/Layouts/Container";
import Link from "next/link";

export default function Home() {
  // API data fetching 
  const [blogs, setBlogs] = useState([])
  const [visibleData, setVisibleData] = useState(6)
  useEffect(()=>{
    fetch('https://dummyjson.com/posts')
    .then((res) => res.json())
    .then((data) => setBlogs(data.posts))
  }, [])
  console.log(blogs);
  
  // more data loading 
  const visibleBlogs = blogs.slice(0, visibleData)
  const handleLodeData = () =>{
    console.log("more data");
    setVisibleData((prev) => prev+3)
    
  }
  return (
    <div className="py-10">
      <Container>
        <h1 className="text-2xl font-bold  text-red-950">All BLogs </h1>
        <div className="grid grid-cols-3 space-x-4 mt-5"> 
          {
            visibleBlogs.map((blog, id) =>(
              <div key={id} className="border px-3 py-5 my-2">
                <h3 className="font-semibold text-[18px] text-black mb-2">Blog Title : {blog.title}</h3>
                <p className="font-normal text-[14px] text-[#000]"><span className="font-bold">Describtion :</span>   {blog.body}</p>
                <Link href={`/blog/${blog.id}`}>
                  <p onClick={handleLodeData} className="cursor-pointer bg-blue-500 text-white font-medium py-[8px] px-[15px] rounded-xl inline-block mt-4"> More text...</p>
                </Link>
              </div>
            ))
          }
          
        </div>
        {
          blogs.length == visibleBlogs.length ?
        <div className="text-center mt-[15px]">
          <p onClick={handleLodeData} className="cursor-pointer bg-blue-500 text-white font-medium py-[10px] px-[20px] rounded-xl inline-block">No More Data</p>
        </div>
        
        :
        <div className="text-center mt-[15px]">
          <p onClick={handleLodeData} className="cursor-pointer bg-blue-500 text-white font-medium py-[10px] px-[20px] rounded-xl inline-block">Load More.....</p>
        </div>
        }
        
      </Container>
      
    </div>
  );
}
