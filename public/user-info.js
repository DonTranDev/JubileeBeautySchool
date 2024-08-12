document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/user-info', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        
        document.getElementById('username').textContent = `Username: ${data.username}`;
        document.getElementById('hoursWorked').textContent = `Hours Worked: ${data.hoursWorked}`;
        
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to load user information');
    }
});

document.getElementById('logoutButton').addEventListener('click', async () => {
    try {
        await fetch('/logout', { method: 'POST' });
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error:', error);
        alert('Logout failed');
    }
});

