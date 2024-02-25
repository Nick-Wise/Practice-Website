const menu = document.querySelector('#mobile-menu');
const menuLinks=document.querySelector('.navbar__menu');

menu.addEventListener('click',function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});


function loadUsers() {
    fetch('/api/getUsers')
        .then(response => response.json())
        .then(users => {
            const usersContainer = document.getElementById('users');
            usersContainer.innerHTML = '<h2>Users</h2>';
            
            if (users.length === 0) {
                usersContainer.innerHTML += '<p>No users available.</p>';
            } else {
                users.forEach(user => {
                    usersContainer.innerHTML += `<p>ID: ${user.id}, Username: ${user.username}, Email: ${user.password}</p>`;
                });
            }
        })
        .catch(error => console.error('Error fetching users:', error));
}

document.getElementById('addUserForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/api/addUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => {
            if (response.ok) {
                alert('User added successfully!');
                // Clear input fields
                document.getElementById('username').value = '';
                document.getElementById('password').value = '';
            } else {
                alert('Error adding user. Please try again.');
            }
        })
        .catch(error => console.error('Error adding user:', error));
});