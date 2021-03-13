fetch("http://localhost:5000" + window.location.search)
  .then(response => {
    console.log(response.json());
  })