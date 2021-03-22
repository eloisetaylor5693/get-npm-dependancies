const testAttributeName = 'data-test';
const testAttribute_checkbox = 'toggleDependenciesToShow';
const testAttribute_label = 'labelPackageName';

function drawFullTreeOfDependencies(packageInfo){
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
}

function addBranchWithDependencies(packageName, parentElement, treeLevel) {
    const id = `${treeLevel}-${packageName}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = id;

    // checking the checkbox so the list shows expanded
    checkbox.setAttribute('checked', 'checked');
    checkbox.setAttribute(testAttributeName, testAttribute_checkbox);

    const label = document.createElement('label');
    label.className = "tree_label";
    label.innerText = packageName;
    label.setAttribute('for', id);
    label.setAttribute(testAttributeName, testAttribute_label);

    const packageDependencies = document.createElement('ul')
    packageDependencies.id = `${id}-dependencies`;

    const listItem = document.createElement('li');
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(packageDependencies);

    parentElement.appendChild(listItem);
}

function addBranch(packageName, parentElement) {
    const label = document.createElement('span');
    label.className = "tree_label";
    label.innerText = packageName;
    label.setAttribute(testAttributeName, testAttribute_label);

    const listItem = document.createElement('li');
    listItem.appendChild(label);

    parentElement.appendChild(listItem);
}