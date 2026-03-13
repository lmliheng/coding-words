// 转义函数
// 文本保留HTML标签
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}


//************************************************ */


// 检查登录状态
function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('请先登录');
        window.location.href = '../login/login.html';
    }
    return token;
}

// 获取用户上传的专业名词
async function getUserWords(page = 1, limit = 10) {
    const token = checkAuth();
    try {
        const response = await fetch(`http://localhost:3000/api/manage/words?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('获取专业名词失败:', error);
        alert('获取专业名词失败，请稍后重试');
        return { words: [], pagination: { page: 1, limit: 10, total: 0, pages: 1 } };
    }
}

// 渲染专业名词表格
function renderWordsTable(words) {
    const tableBody = document.getElementById('words-table-body');
    tableBody.innerHTML = '';
    
    if (words.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-state">
                    <h3>暂无专业名词</h3>
                    <p>您还没有上传任何专业名词</p>
                
                </td>
            </tr>
        `;
        return;
    }
    
    words.forEach(word => {
        const row = document.createElement('tr');
        const tags = Array.isArray(word.tag) ? word.tag : JSON.parse(word.tag);
        
        row.innerHTML = `
            <td>${word.id}</td>
            <td>${escapeHtml(word.word_name)}</td>
            <td>
                <div class="tag-list">
                    ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </td>
            <td>${new Date(word.created_at).toLocaleString()}</td>
            <td>${word.read_time || 0}</td>
            <td>
                <div class="action-buttons">
                    <a href="" class="edit-btn" data-id="${word.id}">编辑</a>
                    <a href="#" class="delete-btn" data-id="${word.id}">删除</a>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // 绑定编辑和删除事件
    bindActionEvents();
}

// 绑定操作事件
function bindActionEvents() {
    // 编辑按钮事件
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const wordId = this.getAttribute('data-id');
            window.location.href = `../editor/editor.html?id=${wordId}`;
        });
    });
    
    // 删除按钮事件
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const wordId = this.getAttribute('data-id');
            confirmDelete(wordId);
        });
    });
}

// 确认删除
function confirmDelete(wordId) {
    if (confirm('确定要删除这个专业名词吗？')) {
        deleteWord(wordId);
    }
}



// 删除专业名词
async function deleteWord(wordId) {
    const token = checkAuth();
    try {
        const response = await fetch(`http://localhost:3000/api/manage/word/${wordId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (response.ok) {
            alert('删除成功');
            // 重新加载数据
            loadWords();
        } else {
            alert('删除失败: ' + data.message);
        }
    } catch (error) {
        console.error('删除专业名词失败:', error);
        alert('删除专业名词失败，请稍后重试');
    }
}




// 渲染分页
function renderPagination(pagination) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';
    
    // 上一页按钮
    const prevButton = document.createElement('button');
    prevButton.textContent = '上一页';
    prevButton.disabled = pagination.page === 1;
    prevButton.addEventListener('click', () => {
        if (pagination.page > 1) {
            loadWords(pagination.page - 1);
        }
    });
    paginationContainer.appendChild(prevButton);
    
    // 页码按钮
    for (let i = 1; i <= pagination.pages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.className = i === pagination.page ? 'active' : '';
        pageButton.addEventListener('click', () => {
            loadWords(i);
        });
        paginationContainer.appendChild(pageButton);
    }
    
    // 下一页按钮
    const nextButton = document.createElement('button');
    nextButton.textContent = '下一页';
    nextButton.disabled = pagination.page === pagination.pages;
    nextButton.addEventListener('click', () => {
        if (pagination.page < pagination.pages) {
            loadWords(pagination.page + 1);
        }
    });
    paginationContainer.appendChild(nextButton);
}

// 加载专业名词数据
async function loadWords(page = 1) {
    // 显示加载状态
    const tableBody = document.getElementById('words-table-body');
    tableBody.innerHTML = `
        <tr>
            <td colspan="6" class="loading">
                <div class="loading-spinner"></div>
            </td>
        </tr>
    `;
    
    const data = await getUserWords(page);
    renderWordsTable(data.words);
    renderPagination(data.pagination);
}

// 初始化页面
async function init() {
    checkAuth();
    await loadWords();
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', init);