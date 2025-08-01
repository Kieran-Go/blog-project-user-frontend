import useFetchData from '../hooks/useFetchData';
import { Link } from 'react-router-dom'; 

function Home() {
  const serverOrigin = import.meta.env.VITE_SERVER_ORIGIN;
  const { data, loading, error } = useFetchData(`${serverOrigin}/posts/published`);
  
  if (loading) return <p>Loading posts...</p>;
  if (error) {
    // if (error?.status === 403) return <p>You must be logged in to view posts.</p>;
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        { 
          data.map((post) => (
              <div className='post' key={post.id}>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </div>
          ))
        }
      </ul>
    </div>
  );
}

export default Home;