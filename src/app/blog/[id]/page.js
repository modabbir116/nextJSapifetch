"use client";
import Container from "@/app/components/Layouts/Container.js";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SingleBlog() {
  const [singleBlogData, setSingleBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch(`https://dummyjson.com/posts/${id}`);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch blog post: ${res.status}`);
        }
        
        const data = await res.json();
        setSingleBlogData(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching blog post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blog post...</p>
          </div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Blog Post</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </Container>
    );
  }

  if (!singleBlogData) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Blog Post Not Found</h2>
            <p className="text-gray-600">The requested blog post could not be found.</p>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <Container>
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-12 text-white">
            <div className="flex items-center gap-2 text-sm mb-4 opacity-90">
              <span>Blog Post</span>
              <span>•</span>
              <span>ID: {id}</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight">
              {singleBlogData.title}
            </h1>
            <div className="flex items-center gap-4 mt-6 text-sm opacity-90">
              <span>👁️ {singleBlogData.views || 0} views</span>
              <span>❤️ {singleBlogData.reactions?.likes || 0} likes</span>
            </div>
          </div>

          {/* Content Section */}
          <div className="px-8 py-10">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {singleBlogData.body}
              </p>
            </div>

            {/* Tags Section */}
            {singleBlogData.tags && singleBlogData.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {singleBlogData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* User Info Section */}
            {singleBlogData.userId && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    {singleBlogData.userId}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Written by</p>
                    <p className="font-semibold text-gray-900">User {singleBlogData.userId}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </article>
      </Container>
    </div>
  );
}