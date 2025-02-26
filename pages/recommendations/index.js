import { useState, useEffect } from 'react';

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [idScan, setIdScan] = useState('');
  const [isOwner, setIsOwner] = useState(false);

  // Load recommendations from the API
  async function fetchRecommendations() {
    const res = await fetch('/api/recommendations');
    const data = await res.json();
    setRecommendations(data);
  }

  useEffect(() => {
    fetchRecommendations();
  }, []);

  // Create a new recommendation via API
  async function handleCreateRecommendation() {
    if (!title.trim() || !content.trim()) return;
    const res = await fetch('/api/recommendations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      await fetchRecommendations();
      setTitle('');
      setContent('');
    }
  }

  // Owner scan input
  function handleIdScanSubmit() {
    if (idScan === 'ownerpermis') {
      setIsOwner(true);
    }
    setIdScan('');
  }

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h2>Recommendations Forum</h2>
      <div style={{ marginBottom: '1em' }}>
        <p>
          Post your recommendations or feature requests. You can also reply to posts.
        </p>
        {!isOwner && (
          <div>
            <input
              type="text"
              value={idScan}
              onChange={(e) => setIdScan(e.target.value)}
              placeholder="Enter owner code for admin..."
              style={{ marginRight: '0.5em' }}
            />
            <button onClick={handleIdScanSubmit}>Submit</button>
          </div>
        )}
        {isOwner && <p style={{ color: 'green' }}>Owner mode enabled!</p>}
      </div>

      {/* New recommendation form */}
      <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '1em' }}>
        <h3>Create a New Recommendation</h3>
        <div>
          <label>Title:</label>
          <input
            type="text"
            style={{ width: '100%', marginBottom: '0.5em' }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            rows={3}
            style={{ width: '100%', marginBottom: '0.5em' }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button onClick={handleCreateRecommendation}>Post Recommendation</button>
      </div>

      {/* Display recommendations */}
      <div>
        {recommendations.length === 0 && <p>No recommendations yet. Be the first to post!</p>}
        {recommendations.map((rec) => (
          <RecommendationItem
            key={rec.id}
            recommendation={rec}
            isOwner={isOwner}
            refresh={fetchRecommendations}
          />
        ))}
      </div>
    </div>
  );
}

// A component for a single recommendation item
function RecommendationItem({ recommendation, isOwner, refresh }) {
  const [replyText, setReplyText] = useState('');

  // Post a reply
  async function handleReply() {
    if (!replyText.trim()) return;
    await fetch(`/api/recommendations/${recommendation.id}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: replyText }),
    });
    setReplyText('');
    refresh();
  }

  // Owner actions: accept, decline, delete
  async function handleUpdateStatus(newStatus) {
    await fetch(`/api/recommendations/${recommendation.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    refresh();
  }

  async function handleDelete() {
    await fetch(`/api/recommendations/${recommendation.id}`, {
      method: 'DELETE',
    });
    refresh();
  }

  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '1em' }}>
      <h4>
        {recommendation.title} <span style={{ fontSize: '0.8em', color: '#999' }}>({recommendation.status})</span>
      </h4>
      <p style={{ whiteSpace: 'pre-wrap' }}>{recommendation.content}</p>

      {isOwner && (
        <div style={{ marginBottom: '0.5em' }}>
          <button onClick={() => handleUpdateStatus('accepted')} style={{ marginRight: '0.5em' }}>
            Accept
          </button>
          <button onClick={() => handleUpdateStatus('declined')} style={{ marginRight: '0.5em' }}>
            Decline
          </button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}

      {/* Replies */}
      <div style={{ marginLeft: '1em', borderLeft: '2px solid #eee', paddingLeft: '1em' }}>
        <h5>Replies:</h5>
        {recommendation.replies.length === 0 && (
          <p style={{ fontStyle: 'italic', color: '#666' }}>No replies yet.</p>
        )}
        {recommendation.replies.map((rep) => (
          <div key={rep.id} style={{ marginBottom: '0.5em' }}>
            <p style={{ margin: 0 }}>{rep.content}</p>
          </div>
        ))}
      </div>

      {/* Reply form */}
      <div style={{ marginTop: '0.5em' }}>
        <textarea
          rows={2}
          style={{ width: '100%', marginBottom: '0.5em' }}
          placeholder="Write a reply..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <button onClick={handleReply}>Post Reply</button>
      </div>
    </div>
  );
}
