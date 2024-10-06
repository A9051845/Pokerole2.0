// pagination.js

// 每頁顯示的訊息數量
const messagesPerPage = 150;
let currentPage = 1;
let totalPages = 1;

// 初始化分頁
function initPagination() {
    const chatlogContent = document.getElementById('chatlog-content');
    if (!chatlogContent) return;

    const messages = chatlogContent.querySelectorAll('.chatlog__message-group');
    if (!messages.length) return;

    totalPages = Math.ceil(messages.length / messagesPerPage);

    // 顯示第一頁
    showPage(1);
}

// 顯示指定頁面的訊息
function showPage(page) {
    const chatlogContent = document.getElementById('chatlog-content');
    const messages = chatlogContent.querySelectorAll('.chatlog__message-group');

    // 確保頁面號在有效範圍內
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    // 隱藏所有訊息
    messages.forEach(message => {
        message.style.display = 'none';
    });

    // 計算要顯示的訊息索引範圍
    const startIndex = (page - 1) * messagesPerPage;
    const endIndex = startIndex + messagesPerPage;

    // 顯示當前頁面的訊息
    for (let i = startIndex; i < endIndex && i < messages.length; i++) {
        messages[i].style.display = '';
    }

    // 更新當前頁碼
    currentPage = page;

    // 更新分頁按鈕狀態
    updatePaginationControls();

    // 直接跳轉到頁面頂部，無滾動效果
    document.body.style.display = 'none';
    document.body.offsetHeight; // 觸發重繪
    document.body.style.display = '';
}

// 創建並更新分頁控制按鈕
function updatePaginationControls() {
    const paginationControls = document.getElementById('pagination-controls');
    if (!paginationControls) return;

    paginationControls.innerHTML = '';

    // 創建 "上一頁" 按鈕
    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = '上一頁';
        prevButton.classList.add('pagination-button');
        prevButton.addEventListener('click', () => {
            showPage(currentPage - 1);
        });
        paginationControls.appendChild(prevButton);
    }

    // 創建頁碼按鈕
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.add('pagination-button');
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.addEventListener('click', () => {
            showPage(i);
        });
        paginationControls.appendChild(pageButton);
    }

    // 創建 "下一頁" 按鈕
    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = '下一頁';
        nextButton.classList.add('pagination-button');
        nextButton.addEventListener('click', () => {
            showPage(currentPage + 1);
        });
        paginationControls.appendChild(nextButton);
    }
}

// 當頁面加載完成後初始化分頁
document.addEventListener('DOMContentLoaded', () => {
    initPagination();
});
