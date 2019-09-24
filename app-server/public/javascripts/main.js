function handleLogin() {
    // Redirect to Google login page.
    axios.get('http://localhost:3000/authenticate/url')
    .then(response => {
        if (response.data.url) {
            window.location.href = response.data.url;
        }
    })
    .catch(reject => {
        console.log(reject);
    });
}