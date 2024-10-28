// Fetch and display items on the index page
if (document.querySelector('#items-list')) {
    fetch('/api/items')
      .then((response) => response.json())
      .then((data) => {
        const itemsList = document.getElementById('items-list');
        itemsList.innerHTML = '';
        data.forEach((item) => {
          const li = document.createElement('li');
          li.textContent = `${item.name}: ${item.description}`;
          itemsList.appendChild(li);
        });
      })
      .catch((error) => console.error('Error fetching items:', error));
  }
  
  // Handle form submission on the form page
  if (document.querySelector('#add-item-form')) {
    document.getElementById('add-item-form').addEventListener('submit', (event) => {
      event.preventDefault();
  
      const name = document.getElementById('name').value;
      const description = document.getElementById('description').value;
  
      fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert('Item added successfully');
          window.location.href = 'index.html'; // Redirect to the items list page
        })
        .catch((error) => console.error('Error adding item:', error));
    });
  }
  