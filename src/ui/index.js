fetch("http://localhost:5000" + window.location.search)
  .then(response => response.json())
  .then(data => console.log(data));
  