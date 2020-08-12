const all = {
    loading: document.querySelector('#loadingBox'),
    info: document.querySelector('#infoBox'),
    error: document.querySelector('#errorBox')
}

console.log(all);

all.info.addEventListener('click', hideInfo);
all.error.addEventListener('click', hideError);

export function showInfo(message) {
    all.info.children[0].textContent = message;
    all.info.style.display = 'block';

    setTimeout(hideInfo, 3000);
}

export function showError(message) {
    all.error.children[0].textContent = message;
    all.error.style.display = 'block';
}

let requests = 0;

export function beginRequest() {
    requests++;
    all.loading.style.display = 'block';
}

export function endRequest() {
    requests--;
    if (requests === 0) {
        all.loading.style.display = 'none';
    }
}

function hideInfo() {
    all.info.style.display = 'none';
}

function hideError() {
    all.error.style.display = 'none';
}