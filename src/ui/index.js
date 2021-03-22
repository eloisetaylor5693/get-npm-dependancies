fetch("http://localhost:5000" + window.location.search, { cache: "force-cache" })
  .then(response => response.json())
  .then(response => {
    if (response.error){
      throw new Error(response.error)
    }

    return response;
  })
  .then(packageInfo => {
    drawFullTreeOfDependencies(packageInfo)
  })
  .catch(error => {
    writeErrorMessage(error);
  });
