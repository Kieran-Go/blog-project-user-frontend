import { useParams } from 'react-router-dom';
import useFetchData from '../hooks/useFetchData';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';

function Post() {
  const { user } = useContext(AuthContext);
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

  const handleDeleteComment = async (commentId) => {
        try {
            const response = await fetch(`${serverOrigin}/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete comment');
            }

            // Remove the deleted comment from local state
            setComments((prevComments) =>
                prevComments.filter((comment) => comment.id !== commentId)
            );
        } catch (err) {
            console.error('Delete error:', err.message);
        }
    };


  if (loading) return <p>Loading post...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>{data.title}</h2>
      <h3>Author: {data.user.name}</h3>
      <p>{data.content}</p>

      {user && (
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
        <div className='comment' key={comment.id}>
            <h5>{comment.user.name} at {comment.postedAt}</h5>
            <p>{comment.content}</p>
            {user && user.id == comment.user.id &&
                <button onClick={() => handleDeleteComment(comment.id)}>Remove Comment</button>
            }
        </div>
      ))}

      <Link to='/home'>Back</Link>
    </div>
  );
}

export default Post;
