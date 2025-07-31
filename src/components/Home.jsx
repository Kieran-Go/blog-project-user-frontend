import useFetchData from "../hooks/useFetchData";

function Home() {
  const serverOrigin = import.meta.env.VITE_SERVER_ORIGIN;
  console.log(serverOrigin);
  const { data, loading, error } = useFetchData(`${serverOrigin}/posts`);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;