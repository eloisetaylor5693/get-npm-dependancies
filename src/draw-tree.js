const rootContainer = document.getElementById('tree-container');
addBranchWithDependencies("Snyk", rootContainer, 0);

const level0Container = document.getElementById('0-Snyk-dependencies');
addBranch("momentjs", level0Container);

function addBranchWithDependencies(packageName, parentElement, treeLevel) {
    const id = `${treeLevel}-${packageName}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = id;

    const label = document.createElement('label');
    label.className = "tree_label";
    label.innerText = packageName;
    label.setAttribute('for', id);

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

    const listItem = document.createElement('li');
    listItem.appendChild(label);

    parentElement.appendChild(listItem);
}