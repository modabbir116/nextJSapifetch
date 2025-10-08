"use client";
import { useEffect, useState } from "react";
import Container from "./components/Layouts/Container";
import Link from "next/link";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [visibleData, setVisibleData] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch('https://dummyjson.com/posts');
        
        if (!res.ok) {
          throw new Error(`Failed to fetch blogs: ${res.status}`);
        }
        
        const data = await res.json();
        setBlogs(data.posts || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const visibleBlogs = blogs.slice(0, visibleData);
  const hasMoreBlogs = blogs.length > visibleBlogs.length;

  const handleLoadMore = () => {
    setVisibleData((prev) => prev + 6);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16">
        <Container>
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg">Loading amazing content...</p>
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16">
        <Container>
          <div className="text-center py-20">
            <div className="text-6xl mb-6">😞</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-8">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Try Again
            </button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16">
      <Container>
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Discover Our Latest Blogs
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore insightful articles, stories, and ideas from our community
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              {blogs.length} Articles Available
            </span>
          </div>
        </div>

        {/* Blog Grid */}
        {visibleBlogs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">📭</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Blogs Found</h2>
            <p className="text-gray-600">Check back soon for new content!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleBlogs.map((blog) => (
                <article
                  key={blog.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                >
                  {/* Card Header with Gradient */}
                  <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                  
                  <div className="p-6">
                    {/* Tags or Meta Info */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                        Article
                      </span>
                      {blog.tags && blog.tags[0] && (
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                          #{blog.tags[0]}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                      {blog.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {blog.body}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-5 pt-4 border-t border-gray-100">
                      <span className="flex items-center gap-1">
                        👁️ {blog.views || Math.floor(Math.random() * 1000)} views
                      </span>
                      <span className="flex items-center gap-1">
                        ❤️ {blog.reactions?.likes || Math.floor(Math.random() * 50)} likes
                      </span>
                    </div>

                    {/* Read More Button */}
                    <Link href={`/blog/${blog.id}`}>
                      <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform group-hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer">
                        Read More
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More / No More Data Section */}
            <div className="text-center mt-16">
              {hasMoreBlogs ? (
                <button
                  onClick={handleLoadMore}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-3 cursor-pointer"
                >
                  Load More Articles
                  <svg
                    className="w-5 h-5 animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              ) : (
                <div className="inline-block">
                  <div className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-semibold py-4 px-10 rounded-xl shadow-md">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🎉</span>
                      <span>You've reached the end!</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mt-3">
                    You've viewed all {blogs.length} articles
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </Container>
    </div>
  );
}