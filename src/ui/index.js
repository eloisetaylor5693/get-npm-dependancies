fetch("http://localhost:5000" + window.location.search)
  .then(response => response.json())
  .then(packageInfo => {
    const rootContainer = document.getElementById('tree-container');
    addBranchWithDependencies(packageInfo.package, rootContainer, 0);

    console.log({packageInfo:packageInfo});

    packageInfo.dependencies.map(package => {
      const level0Container = document.getElementById(`0-${packageInfo.package}-dependencies`);
      addBranchWithDependencies(package.package, level0Container, 1);

      console.log({package:package});

      package.dependencies.map(x =>{
        const level1Container = document.getElementById(`1-${x.package}-dependencies`);
        addBranch(x.package, level1Container);
      })
    });
  })
  .catch(error => {
    writeErrorMessage(error.message);
  });
