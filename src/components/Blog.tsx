import  { useState } from "react";

const Blog = () => {
  // Sample Data
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Tech", "Sports", "Lifestyle", "Education"];

  const blogs = [
    {
      id: 1,
      title: "How AI is Changing the Future",
      content:
        "Artificial Intelligence is transforming industries and the way we live...",
      category: "Tech",
      likes: 23,
      comments: 5,
    },
    {
      id: 2,
      title: "Best Practices for Fitness",
      content:
        "Maintaining a good lifestyle requires discipline and healthy routines...",
      category: "Lifestyle",
      likes: 12,
      comments: 3,
    },
    {
      id: 3,
      title: "Football: More Than Just a Game",
      content:
        "Sports teach us teamwork, discipline, and persistence — especially football.",
      category: "Sports",
      likes: 30,
      comments: 10,
    },
  ];

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((b) => b.category === selectedCategory);

  return (
    <div className="flex w-full min-h-screen bg-gray-100 dark:bg-gray-800 p-6 gap-6">
      {/* Left Sidebar - Categories */}
      <aside className="w-1/5 bg-white p-4 rounded-2xl shadow-md dark:bg-gray-900">
        <h2 className="text-lg font-semibold mb-3">Categories</h2>
        <ul>
          {categories.map((cat) => (
            <li
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`cursor-pointer p-2 rounded-md ${
                selectedCategory === cat
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100"
              }`}
            >
              {cat}
            </li>
          ))}
        </ul>
      </aside>

      {/* Middle Section - Blog Feed */}
      <main className="flex-1 bg-white p-6 rounded-2xl shadow-md dark:bg-gray-900">
       {/*  <h2 className="text-2xl font-bold mb-4">Latest Posts</h2> */}
        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            className="border-b border-gray-200 pb-4 mb-4 last:border-none"
          >
            <h3 className="text-xl font-semibold">{blog.title}</h3>
            <p className="text-gray-700 mt-2">{blog.content}</p>
            <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
              <span>Category: {blog.category}</span>
              <div className="flex gap-4">
                <button className="hover:text-blue-500">
                  👍 {blog.likes}
                </button>
                <button className="hover:text-green-500">
                  💬 {blog.comments}
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Right Sidebar - Profile */}
      <aside className="w-1/5 bg-white p-4 rounded-2xl shadow-md text-center dark:bg-gray-900">
        <img
          src="https://via.placeholder.com/120"
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-3"
        />
        <h3 className="text-lg font-semibold">John Doe</h3>
        <p className="text-sm text-gray-500 mb-4">@john_doe</p>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="font-bold">12</p>
            <p className="text-xs text-gray-500">Posts</p>
          </div>
          <div>
            <p className="font-bold">85</p>
            <p className="text-xs text-gray-500">Likes</p>
          </div>
          <div>
            <p className="font-bold">9</p>
            <p className="text-xs text-gray-500">Comments</p>
          </div>
        </div>

        <button className="mt-5 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          View Profile
        </button>
      </aside>
    </div>
  );
};

export default Blog;
