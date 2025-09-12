import { useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

const BlogDetails = () => {
  const { title } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const blogData = location.state?.blogData;

  const displayTitle = blogData?.title || title?.replace(/-/g, ' ') || 'Blog Post';

  useEffect(() => {
    document.title = displayTitle;
  }, [displayTitle]);

  return (
    <div className="p-6 max-w-3xl mx-auto text-gray-800 dark:text-gray-100">

      {/* Back Arrow */}
      <div
        className="mb-4 cursor-pointer text-blue-600 dark:text-blue-400 flex items-center"
        onClick={() => navigate('/')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-lg">Back to Home</span>
      </div>

      <h1 className="text-3xl font-bold mb-4 dark:text-white">{displayTitle}</h1>

      {blogData ? (
        <>
          <img
            src={blogData.image}
            alt={blogData.title}
            className="mb-4 rounded"
          />

          <p className="text-gray-700 dark:text-gray-300 mb-2">
            <strong>Description:</strong> {blogData.desc}
          </p>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <strong>Details:</strong> {blogData.bigDec}
          </p>

          <p className="text-gray-700 dark:text-gray-300">
            <strong>Blog ID:</strong> {blogData.id}
          </p>
        </>
      ) : (
        <p className="text-gray-700 dark:text-gray-300">Blog data not available.</p>
      )}
    </div>
  );
};

export default BlogDetails;
