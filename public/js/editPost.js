// edit post
const editPostHandler = async (event) => {
  event.preventDefault();

  const id = document.querySelector('#post-id').value.trim();
  const title = document.querySelector('#edit-title').value.trim();
  const content = document.querySelector('#edit-content').value.trim();

  if (title && content) {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert("post not updated");
    }
  }
};
document.querySelector('#edit-post-form').addEventListener('submit', editPostHandler);

// delete post
const deletePostHandler = async (event) => {
  event.preventDefault();

  const id = document.querySelector('#post-id').value.trim();

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert("could not delete post");
    }

};
document.querySelector('#delete-btn').addEventListener('click', deletePostHandler);
