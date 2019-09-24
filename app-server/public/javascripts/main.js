function handleLogin() {
    // Redirect to Google login page.
    axios.get('http://localhost:3000/authenticate/url')
    .then(response => {
        // If successful, go to note taking page.
        if (response.data.url) {
            window.location.href = response.data.url;
        }
        else {
            window.location.href = 'http://localhost:3000/auth-error';
        }
    })
    .catch(reject => {
        window.location.href = 'http://localhost:3000/auth-error';
    });
}

function postNote() {
    var content = document.getElementById('note-text').value;
}