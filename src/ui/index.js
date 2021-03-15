fetch("http://localhost:5000" + window.location.search, { cache: "force-cache" })
  .then(response => response.json())
  .then(response => {
    if (response.error){
      throw new Error(response.error)
    }

    return response;
  })
  .then(packageInfo => {
    const rootContainer = document.getElementById('tree-container');
    addBranchWithDependencies(packageInfo.package, rootContainer, 0);

    packageInfo.dependencies.map(package => {
      const level0Container = document.getElementById(`0-${packageInfo.package}-dependencies`);
      addBranchWithDependencies(package.package, level0Container, 1);

      package.dependencies.map(parent => {
        const level1Container = document.getElementById(`1-${package.package}-dependencies`);
        parent.map(child => addBranch(child, level1Container));
      })
    });
  })
  .catch(error => {
    writeErrorMessage(error);
  });
