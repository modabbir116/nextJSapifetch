"use client";
import { useEffect, useState } from "react";
import Container from "./components/Layouts/Container";
import Link from "next/link";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [visibleData, setVisibleData] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchBox, setSearchBox] = useState("");
  const [sortingData, setSortingData] = useState("asc")
  useEffect(() => {
    // Debounce timer for search
    const delayTimer = setTimeout(() => {
      const fetchBlogs = async () => {
        try {
          setLoading(true);
          setError(null);
          let searchApiURLPoint = `https://dummyjson.com/posts`
          if (searchBox) {
            searchApiURLPoint = `https://dummyjson.com/posts/search?q=${searchBox}`
          } else {
            searchApiURLPoint = `https://dummyjson.com/posts?sortBy=id&order=${sortingData}`
          }
          // const searchApiURLPoint = searchBox
          //   ? `https://dummyjson.com/posts/search?q=${searchBox}`
          //   : `https://dummyjson.com/posts`;

          const res = await fetch(searchApiURLPoint);

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
    }, 500); // 500ms debounce delay

    return () => clearTimeout(delayTimer);
  }, [searchBox, sortingData]);

  // useEffect(() => {
  //   const delayTimer = setTimeout(() => {
  //     const fetchBlogs = async () => {
  //       try {
  //         setLoading(true);
  //         setError(null);

  //         // const searchApiURLPoint = searchBox
  //         //   ? `https://dummyjson.com/posts/search?q=${searchBox}`
  //         //   : `https://dummyjson.com/posts`;

  //         const res = await fetch(`https://dummyjson.com/posts?sortBy=title&order=${sortingData}`);
  //         if (!res.ok) {
  //           throw new Error(`Failed to fetch blogs: ${res.status}`);
  //         }

  //         const data = await res.json();
  //         setBlogs(data.posts || []);
  //       } catch (err) {
  //         setError(err.message);
  //         console.error("Error fetching blogs:", err);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchBlogs();
  //   }, 500); 

  //   return () => clearTimeout(delayTimer);
  // }, [sortingData]);

  const visibleBlogs = blogs.slice(0, visibleData);
  const hasMoreBlogs = blogs.length > visibleBlogs.length;

  const handleLoadMore = () => {
    setVisibleData((prev) => prev + 3);
  };

  const handleSearchBox = (e) => {
    setSearchBox(e.target.value);
    setVisibleData(6); // Reset visible data on new search
  };

  // toggole bar 
  const handleToggle = ()=>{
    setSortingData((prev) => 
      (prev == "asc" ? "desc" : "asc"))
  }

  // Loading State
  if (loading && !searchBox) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16">
        <Container>
          <div className="text-center py-20">
            <div className="relative inline-block">
              <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
              <div className="absolute inset-0 animate-ping rounded-full h-20 w-20 border-4 border-blue-400 opacity-20"></div>
            </div>
            <p className="text-gray-700 text-lg mt-8 font-medium">
              Loading amazing content...
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16">
        <Container>
          <div className="text-center py-20">
            <div className="text-8xl mb-6 animate-bounce">😞</div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl inline-flex items-center gap-3"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Try Again
            </button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16">
      <Container>
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
              ✨ Welcome to Our Blog
            </span>
          </div>
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mb-4 leading-tight">
            Discover Amazing Stories
          </h1>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
            Explore insightful articles, inspiring stories, and cutting-edge ideas from our community of writers
          </p>
        </div>

        {/* Search Box Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <svg
                className="h-6 w-6 text-gray-400 group-focus-within:text-blue-600 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchBox}
              onChange={handleSearchBox}
              placeholder="Search for articles, topics, or keywords..."
              className="w-full py-4 pl-16 pr-6 border-2 border-gray-200 rounded-2xl outline-none text-gray-800 font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 shadow-md hover:shadow-lg"
            />
            {searchBox && (
              <button
                onClick={() => setSearchBox("")}
                className="absolute inset-y-0 right-0 pr-6 flex items-center text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          {loading && searchBox && (
            <div className="text-center mt-4">
              <span className="text-sm text-gray-500 inline-flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                Searching...
              </span>
            </div>
          )}
        </div>
          {/* Sorting start */}
          <div className="text-center mb-4">
            <p className="text-2xl font-medium">Sort By: 
              <button onClick={handleToggle} className="bg-teal-700 py-2 px-5 rounded ml-[10px] text-white font-2xl cursor-pointer"> 
                {sortingData === "asc" ? "A to Z" : "Z to A"}
              </button>
              </p>
          </div>
          {/* Sorting start */}
        {/* Stats Bar */}
        <div className="flex items-center justify-center gap-8 mb-12 flex-wrap">
          <div className="flex items-center gap-2 text-gray-600">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
            <span className="font-semibold text-lg">{blogs.length}</span>
            <span className="text-sm">Articles Available</span>
          </div>
          {searchBox && (
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <span className="text-sm">
                Filtered by: <span className="font-semibold">"{searchBox}"</span>
              </span>
            </div>
          )}
        </div>

        {/* Blog Grid */}
        {visibleBlogs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🔍</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              No Results Found
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Try adjusting your search to find what you're looking for
            </p>
            {searchBox && (
              <button
                onClick={() => setSearchBox("")}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleBlogs.map((blog, index) => (
                <article
                  key={blog.id}
                  className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border border-gray-100"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {/* Card Header with Gradient */}
                  <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

                  <div className="p-7">
                    {/* Tags */}
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      <span className="px-4 py-1.5 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 text-xs font-bold rounded-full shadow-sm">
                        📝 Article
                      </span>
                      {blog.tags && blog.tags[0] && (
                        <span className="px-4 py-1.5 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 text-xs font-bold rounded-full shadow-sm">
                          #{blog.tags[0]}
                        </span>
                      )}
                      {blog.reactions?.likes > 50 && (
                        <span className="px-4 py-1.5 bg-gradient-to-r from-pink-100 to-pink-200 text-pink-700 text-xs font-bold rounded-full shadow-sm">
                          🔥 Trending
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-2xl text-gray-900 mb-4 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300 leading-tight">
                     {blog.id}. {blog.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-base leading-relaxed mb-5 line-clamp-3">
                      {blog.body}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-6 pt-5 border-t border-gray-100">
                      <span className="flex items-center gap-2 font-medium">
                        <svg
                          className="w-5 h-5 text-blue-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {blog.views || Math.floor(Math.random() * 1000)}
                      </span>
                      <span className="flex items-center gap-2 font-medium">
                        <svg
                          className="w-5 h-5 text-red-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {blog.reactions?.likes || Math.floor(Math.random() * 50)}
                      </span>
                    </div>

                    {/* Read More Button */}
                    <Link href={`/blog/${blog.id}`}>
                      <button className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-2xl flex items-center justify-center gap-3 cursor-pointer">
                        <span>Read Full Article</span>
                        <svg
                          className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More / End Section */}
            <div className="text-center mt-16">
              {hasMoreBlogs ? (
                <button
                  onClick={handleLoadMore}
                  className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold py-5 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl inline-flex items-center gap-4 cursor-pointer"
                >
                  <span className="text-lg">Load More Articles</span>
                  <svg
                    className="w-6 h-6 animate-bounce"
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
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 text-gray-700 font-bold py-5 px-12 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">🎉</span>
                      <div className="text-left">
                        <div className="text-lg">You've reached the end!</div>
                        <div className="text-sm font-normal text-gray-500">
                          All {blogs.length} articles viewed
                        </div>
                      </div>
                    </div>
                  </div>
                  {searchBox && (
                    <button
                      onClick={() => {
                        setSearchBox("");
                        setVisibleData(6);
                      }}
                      className="mt-6 text-blue-600 hover:text-blue-700 font-semibold underline transition-colors"
                    >
                      Clear search and browse all articles
                    </button>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </Container>
    </div>
  );
}