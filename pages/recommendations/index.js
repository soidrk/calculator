import { useState } from 'react';

/**
 * In-memory structure:
 * recommendations = [
 *   {
 *     id: string (unique),
 *     title: string,
 *     content: string,
 *     status: "pending" | "accepted" | "declined",
 *     replies: [
 *       { id: string, content: string }
 *     ]
 *   }, ...
 * ]
 */

export default function Recommendations() {
  // In-memory store
  const [recommendations, setRecommendations] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // For ID scan area
  const [idScan, setIdScan] = useState('');
  const [isOwner, setIsOwner] = useState(false);

  // Helper to generate unique IDs for recommendations/replies
  function generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  // Create a new recommendation
  function handleCreateRecommendation() {
    if (!title.trim() || !content.trim()) return;
    const newRec = {
      id: generateId(),
      title: title.trim(),
      content: content.trim(),
      status: 'pending',
      replies: []
    };
    setRecommendations([...recommendations, newRec]);
    setTitle('');
    setContent('');
  }

  // Post a reply to a recommendation
  function handleReply(recId, replyText) {
    if (!replyText.trim()) return;
    setRecommendations(prev => {
      return prev.map(rec => {
        if (rec.id === recId) {
          const newReply = {
            id: generateId(),
            content: replyText.trim()
          };
          return {
            ...rec,
            replies: [...rec.replies, newReply]
          };
        }
        return rec;
      });
    });
  }

  // Owner actions: accept, decline, or delete
  function handleAccept(recId) {
    setRecommendations(prev =>
      prev.map(rec => (rec.id === recId ? { ...rec, status: 'accepted' } : rec))
    );
  }
  function handleDecline(recId) {
    setRecommendations(prev =>
      prev.map(rec => (rec.id === recId ? { ...rec, status: 'declined' } : rec))
    );
  }
  function handleDelete(recId) {
    setRecommendations(prev => prev.filter(rec => rec.id !== recId));
  }

  // Check if user typed "ownerpermis" in ID scan area
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
          This is a space for users to post recommendations or feature requests. 
          You can also reply to existing posts to start a conversation.
        </p>
        {!isOwner && (
          <div>
            <label>ID Scan: </label>
            <input 
              type="text"
              value={idScan}
              onChange={(e) => setIdScan(e.target.value)}
              placeholder="Type code if you have it..."
              style={{ marginRight: '0.5em' }}
            />
            <button onClick={handleIdScanSubmit}>Submit</button>
            <span style={{ marginLeft: '0.5em', color: '#666' }}>
              (Enter "ownerpermis" for admin privileges)
            </span>
          </div>
        )}
        {isOwner && <p style={{ color: 'green' }}>Owner mode enabled!</p>}
      </div>

      {/* New recommendation form */}
      <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '1em' }}>
        <h3>Create a New Recommendation</h3>
        <div>
          <label>Title:</label><br />
          <input 
            type="text"
            style={{ width: '100%', marginBottom: '0.5em' }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Content:</label><br />
          <textarea
            rows={3}
            style={{ width: '100%', marginBottom: '0.5em' }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button onClick={handleCreateRecommendation}>Post Recommendation</button>
      </div>

      {/* List of recommendations */}
      <div>
        {recommendations.length === 0 && (
          <p>No recommendations yet. Be the first to post!</p>
        )}
        {recommendations.map((rec) => (
          <RecommendationItem
            key={rec.id}
            recommendation={rec}
            isOwner={isOwner}
            onReply={handleReply}
            onAccept={handleAccept}
            onDecline={handleDecline}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * A single recommendation item + replies
 */
function RecommendationItem({
  recommendation,
  isOwner,
  onReply,
  onAccept,
  onDecline,
  onDelete
}) {
  const [replyText, setReplyText] = useState('');

  function handleReply() {
    onReply(recommendation.id, replyText);
    setReplyText('');
  }

  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '1em' }}>
      <h4 style={{ margin: '0 0 5px' }}>
        {recommendation.title}{' '}
        <span style={{ fontSize: '0.8em', color: '#999' }}>
          ({recommendation.status})
        </span>
      </h4>
      <p style={{ whiteSpace: 'pre-wrap' }}>{recommendation.content}</p>
      
      {/* If owner, show accept/decline/delete */}
      {isOwner && (
        <div style={{ marginBottom: '0.5em' }}>
          <button onClick={() => onAccept(recommendation.id)} style={{ marginRight: '0.5em' }}>
            Accept
          </button>
          <button onClick={() => onDecline(recommendation.id)} style={{ marginRight: '0.5em' }}>
            Decline
          </button>
          <button onClick={() => onDelete(recommendation.id)}>
            Delete
          </button>
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
