const rootContainer = document.getElementById('tree-container');
addBranch("Snyk", rootContainer, 0, true);

const level0Container = document.getElementById('0-Snyk-dependencies');
addBranch("momentjs", level0Container, 1, false);

function addBranch(packageName, parentElement, treeLevel, hasDependencies) {
    const id = `${treeLevel}-${packageName}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = id;

    const label = document.createElement('label');
    label.className = "tree_label";
    label.innerText = packageName;
    label.setAttribute('for', id);

    const listItem = document.createElement('li');
    listItem.appendChild(checkbox);
    listItem.appendChild(label);

    if (hasDependencies) {
        const packageDependencies = document.createElement('ul')
        packageDependencies.id = `${id}-dependencies`;
        listItem.appendChild(packageDependencies);
    }
    
    parentElement.appendChild(listItem);
}