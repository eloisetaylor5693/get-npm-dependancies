function writeErrorMessage(errorMessage) {
    const label = document.createElement('p');
    label.className = "error";
    label.innerText = errorMessage;

    const errorContainer = document.getElementById('error-container');
    errorContainer.appendChild(label);
}
