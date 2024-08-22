function savetext() {
    const textarea = document.getElementById('textarea');
    const currentPage = document.querySelector('input[name="page"]:checked');
    if (currentPage) {
        localStorage.setItem("page" + currentPage.value, textarea.value);
    }
}

function changepage() {
    const currentPage = document.querySelector('input[name="page"]:checked');
    const textarea = document.getElementById('textarea');
    if (currentPage) {
        textarea.value = localStorage.getItem("page" + currentPage.value) || '';
        document.getElementById('title').textContent = "Page " + currentPage.value;
    }
}

function remove_page(){
    const last_page_index = document.getElementById("pages").childElementCount - 1
    if (last_page_index != 0){
        localStorage.removeItem("page" + (last_page_index + 1))
        document.getElementById("pages").removeChild(document.getElementById("pages").lastChild);
        document.getElementById("pages").lastChild.checked = true;
        changepage();
        localStorage.setItem("pages",document.getElementById("pages").childElementCount - 1)
    }
}

function add_page() {
    const pagesContainer = document.getElementById("pages");
    const currentPageCount = pagesContainer.childElementCount;
    
    const newNode = document.createElement("input");
    newNode.type = "radio";
    newNode.name = "page";
    newNode.className = "page";
    newNode.value = currentPageCount + 1;
    newNode.addEventListener("input", changepage);

    pagesContainer.appendChild(newNode);

    newNode.checked = true;
    localStorage.setItem("pages",document.getElementById("pages").childElementCount - 1)
    changepage();
}

document.addEventListener('DOMContentLoaded', () => {
    pages = parseInt(localStorage.getItem("pages"))
    for(i = 0;i < pages;i++){
        add_page();
    }
    add_page();
});
