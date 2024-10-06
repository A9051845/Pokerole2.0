// 每頁顯示的訊息數量
const messagesPerPage = 100;
let currentPage = 1;

// 獲取訊息
const chatlogContent = document.getElementById('chatlog-content');
const messages = chatlogContent.querySelectorAll('.chatlog__message-group');

// 計算總頁數
const totalPages = Math.ceil(messages.length / messagesPerPage);

// 顯示特定頁面的訊息
function showPage(page) {
    // 隱藏所有訊息
    messages.forEach(message => {
        message.style.display = 'none';
    });

    // 顯示當前頁面的訊息
    const start = (page - 1) * messagesPerPage;
    const end = page * messagesPerPage;
    for (let i = start; i < end && i < messages.length; i++) {
        messages[i].style.display = 'block';
    }

    currentPage = page;
    updatePaginationControls();
}

// 更新分頁控制按鈕
function updatePaginationControls() {
    const paginationControls = document.getElementById('pagination-controls');
    paginationControls.innerHTML = '';

    // 創建頁面按鈕
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.add('pagination-button');
        if (i === currentPage) {
            button.classList.add('active');
        }
        button.addEventListener('click', () => showPage(i));
        paginationControls.appendChild(button);
    }
}

// 初始化分頁
document.addEventListener('DOMContentLoaded', () => {
    showPage(1); // 初始顯示第一頁
});
