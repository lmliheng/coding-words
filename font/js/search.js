// 搜索功能
function searchWords() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const wordsContainer = document.getElementById('words-container');

    if (!searchInput || !searchBtn || !wordsContainer) return;

    // 搜索按钮点击事件
    searchBtn.addEventListener('click', performSearch);

    // 回车键搜索
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (!searchTerm) {
            // 如果搜索词为空，重新渲染所有词
            renderWords();
            return;
        }

        // 过滤匹配的词
        const filteredWords = wordsData.filter(word => {
            return word.name.toLowerCase().includes(searchTerm) ||
                   word.description.toLowerCase().includes(searchTerm) ||
                   word.type.toLowerCase().includes(searchTerm);
        });

        // 清空容器
        wordsContainer.innerHTML = '';

        // 渲染过滤后的词
        if (filteredWords.length === 0) {
            const noResult = document.createElement('div');
            noResult.className = 'no-result';
            noResult.textContent = '没有找到匹配的专业名词';
            wordsContainer.appendChild(noResult);
        } else {
            filteredWords.forEach(word => {
                const wordCard = document.createElement('div');
                wordCard.className = 'word-card';
                wordCard.innerHTML = `
                    <h3>${word.name}</h3>
                    <span class="word-type">${word.type}</span>
                    <p class="word-desc">${word.description}</p>
                    <a href="${word.link}" class="word-link">查看详情</a>
                `;
                wordsContainer.appendChild(wordCard);
            });
        }
    }
}

// 页面加载完成后初始化搜索功能
window.addEventListener('DOMContentLoaded', searchWords);
