fetch("http://localhost:5000" + window.location.search)
  .then(response => response.json())
  .then(packageInfo => {
    const rootContainer = document.getElementById('tree-container');
    addBranchWithDependencies(packageInfo.package, rootContainer, 0);

    packageInfo.dependencies.map(package => {
      const level0Container = document.getElementById(`0-${packageInfo.package}-dependencies`);
      addBranch(package, level0Container);
    });
  })
  .catch(error => {
    writeErrorMessage(error.message);
  });
