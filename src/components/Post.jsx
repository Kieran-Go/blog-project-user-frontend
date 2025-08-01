import { useParams } from 'react-router-dom';
import useFetchData from '../hooks/useFetchData';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Post() {
  const { id } = useParams();
  const serverOrigin = import.meta.env.VITE_SERVER_ORIGIN;
  const [comments, setComments] = useState([]);
  const { data, loading, error } = useFetchData(`${serverOrigin}/posts/${id}`);

  useEffect(() => {
    if(data?.comments) setComments(data.comments);
  },[data]);

  const token = localStorage.getItem('token');
  const [commentText, setCommentText] = useState('');
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    try {
      const response = await fetch(`${serverOrigin}/comments/posts/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: commentText })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit comment');
      }

        const newComment = await response.json();
        setComments((prevComments) => [...prevComments, newComment]);
        setCommentText('');
    } catch (err) {
      setSubmitError(err.message);
    }
  };

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>{data.title}</h2>
      <h3>Author: {data.user.name}</h3>
      <p>{data.content}</p>

      {token && (
        <form onSubmit={handleSubmit}>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            required
          />
          <br />
          <button type="submit">Post Comment</button>
          {submitError && <p style={{ color: 'red' }}>{submitError}</p>}
        </form>
      )}

      <h4>Comments:</h4>
      {comments.map((comment) => (
        <div className='comment'>
            <h5>{comment.user.name} at {comment.postedAt}</h5>
            <p>{comment.content}</p>
        </div>
      ))}

      <Link to='/home'>Back</Link>
    </div>
  );
}

export default Post;
