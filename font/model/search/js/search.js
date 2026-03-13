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

//************************************** */


// 搜索结果页面功能
function initSearchResults() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const wordsContainer = document.createElement('div');
    wordsContainer.id = 'search-results';
    wordsContainer.className = 'search-results';
    
    // 在搜索框下方添加结果容器
    const searchSection = document.querySelector('.search-section');
    searchSection.appendChild(wordsContainer);
    
    // 从URL获取搜索关键词
    const urlParams = new URLSearchParams(window.location.search);
    const keyword = urlParams.get('keyword');
    
    // 如果有关键词，自动执行搜索
    if (keyword) {
        searchInput.value = keyword;
        performSearch(keyword);
    }
    
    // 搜索按钮点击事件
    searchBtn.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            performSearch(searchTerm);
        }
    });
    
    // 回车键搜索
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                performSearch(searchTerm);
            }
        }
    });


// 分页 未实现

    // 执行搜索
    async function performSearch(searchTerm) {
        // 清空结果容器
        wordsContainer.innerHTML = '';
        
        // 显示加载中
        const loading = document.createElement('div');
        loading.className = 'loading';
        loading.textContent = '搜索中...';
        wordsContainer.appendChild(loading);
        
        try {
            // 向后端发送搜索请求
            const response = await fetch(`http://localhost:3000/api/search?q=${encodeURIComponent(searchTerm)}`);
            const data = await response.json();

            console.log("***************************************")
            console.log(`搜索结果类型: ${typeof data}`);
            console.log("***************************************")
            console.log(`搜索结果: ${JSON.stringify(data)}`);
            console.log("***************************************")
            console.log(`搜索结果对象名字: ${data[0].word_name}`);


            // 移除加载中
            wordsContainer.removeChild(loading);
            
            // 显示搜索结果
            if (data.length === 0) {
                const noResult = document.createElement('div');
                noResult.className = 'no-result';
                noResult.textContent = '没有找到匹配的专业名词';
                wordsContainer.appendChild(noResult);
            } else {
                console.log(`搜索结果数量: ${data.length}`);
                for (let i = 0; i < data.length; i++) {
                    console.log(`第 ${i+1} 个专业名词: ${data[i].word_name}`);
                    console.log(`第 ${i+1} 个专业名词标签: ${data[i].tag}`);
                // tag 不好处理，先不显示
                    const wordCard = document.createElement('div');
                    wordCard.className = 'word-card';
                    wordCard.innerHTML = `
                        <a href="../word/word.html?id=${data[i].id}" ><h3>${escapeHtml(data[i].word_name)}</h3></a>
                        <text>${escapeHtml(data[i].content)}</text>
                    `;
                    wordsContainer.appendChild(wordCard);
            }
        }} catch (error) {
            console.error('搜索失败:', error);
            // 移除加载中
            wordsContainer.removeChild(loading);
            
            const errorElement = document.createElement('div');
            errorElement.className = 'error';
            errorElement.textContent = '搜索失败，请稍后重试';
            wordsContainer.appendChild(errorElement);
        }
    }
}

// 页面加载完成后初始化搜索结果页面
window.addEventListener('DOMContentLoaded', initSearchResults);