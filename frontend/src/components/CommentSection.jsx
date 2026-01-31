import { useEffect, useState } from "react";
import API from "../api/api";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function CommentSection({ videoId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [error, setError] = useState(null);

    useEffect(() => {
      if (videoId) fetchComments();
    }, [videoId]);


  // FETCH COMMENTS
  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/${videoId}`);
      setComments(res.data.comments || []);


    } catch (err) {
      console.error("Fetch comments error:", err);
    }
  };

  //  ADD COMMENT (REQUIRES LOGIN)
  const addComment = async () => {
    if (!text.trim()) return;

    try {
      const res = await API.post(`/comments/${videoId}`, { text });
      setComments([res.data.comment, ...comments]);
      setText("");
      setError(null);
    } catch (err) {
      console.error("Add comment failed:", err.response?.data || err);
      setError("Login required to add comment");
    }
  };

  //  DELETE COMMENT
  const deleteComment = async (id) => {
    try {
      await API.delete(`/comments/delete/${id}`);
      setComments((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Delete comment failed:", err);
    }
  };

  // EDIT COMMENT
  const saveEdit = async (id) => {
    try {
      const res = await API.put(`/comments/edit/${id}`, {
        text: editText,
      });
      if (!editText.trim()) return;
      setComments(
        comments.map((c) =>
          c._id === id ? res.data.comment : c
        )
      );
      setEditId(null);
      setEditText("");
    } catch (err) {
      console.error("Edit comment failed:", err);
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>

      {/* ADD COMMENT */}
      <div className="add-comment">
        <input
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addComment}>Post</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {comments.length === 0 && <p>No comments yet</p>}

      {/* COMMENT LIST */}
      {comments.map((c) => (
        <div className="comment-box" key={c._id}>
          <div className="avatar">
            {c.userId?.username?.charAt(0).toUpperCase()}
          </div>
          <span className="username">
            {c.userId?.username}
          </span>
          {editId === c._id ? (
            <>
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={() => saveEdit(c._id)}>Save</button>
              <button onClick={() => setEditId(null)}>Cancel</button>
            </>
          ) : (
            <p>{c.text}</p>
          )}

          <div className="actions">
            <button
              onClick={() => {
                setEditId(c._id);
                setEditText(c.text);
              }}
            >
              <FaEdit />
            </button>

            <button onClick={() => deleteComment(c._id)}>
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
