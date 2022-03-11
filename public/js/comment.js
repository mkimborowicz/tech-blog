const addComment = async (event) => {
    event.preventDefault();

    const post_id = document.querySelector('#post-id').value.trim();
    const commentText = document.querySelector('#comment-box').value.trim();
  
    if (commentText) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ post_id, commentText }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace(`/posts/${post_id}`);
      } 
      
      else {
        alert("error adding comment");
      }
    }
  };
  document.querySelector('#submit-comment').addEventListener('submit', addComment);