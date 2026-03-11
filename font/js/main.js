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

// 渲染热搜榜
async function renderHotSearch() {
    const hotSearchContainer = document.getElementById('hot-search');
    if (!hotSearchContainer) return;

    // 清空容器
    hotSearchContainer.innerHTML = '';

    try {
        // 从后端API获取热搜榜数据
        const response = await fetch('http://localhost:3000/api/rankings/hot-search');
        const data = await response.json();
        console.log('热搜榜数据:', data);
        if (response.ok) {
            // 渲染热搜榜数据
            data.hotSearch.forEach((item, index) => {
                const rankingSearchItem = document.createElement('div');
                rankingSearchItem.className = 'ranking-search-item';
                rankingSearchItem.innerHTML = `
                    <text>${index + 1}. <a href="model/word/word.html?id=${item.id}" class="ranking-link">${escapeHtml(item.word_name)}</a></text>
                    <text class="ranking-search-time">${item.read_time}</text>
                `;
                hotSearchContainer.appendChild(rankingSearchItem);
            });
        } else {
            console.error('获取热搜榜失败:', data.message);
        }
    } catch (error) {
        console.error('获取热搜榜失败:', error);
    }
}

// 渲染贡献榜
async function renderContributionRank() {
    const contributionContainer = document.getElementById('contribution-rank');
    if (!contributionContainer) return;

    // 清空容器
    contributionContainer.innerHTML = '';

    try {
        // 从后端API获取贡献榜数据
        const response = await fetch('http://localhost:3000/api/rankings/contribution');
        const data = await response.json();
        
        if (response.ok) {
            // 渲染贡献榜数据
            data.contribution.forEach((item, index) => {
                const rankingSearchItem = document.createElement('div');
                rankingSearchItem.className = 'ranking-search-item';
                rankingSearchItem.innerHTML = `
                    <text class="ranking-contributions-name">${index + 1}. ${item.username}</text>  
                    <text class="ranking-contributions-value">贡献值: ${item.contribution_value}</text>
                `;
                contributionContainer.appendChild(rankingSearchItem);
            });
        } else {
            console.error('获取贡献榜失败:', data.message);
        }
    } catch (error) {
        console.error('获取贡献榜失败:', error);
    }
}

// 渲染专业名词列表
function renderWords() {
    const wordsContainer = document.getElementById('words-container');
    if (!wordsContainer) return;

    // 清空容器
    wordsContainer.innerHTML = '';

    // 渲染名词数据
    wordsData.forEach(word => {
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

// 初始化页面
async function init() {
    await renderHotSearch();
    await renderContributionRank();
    renderWords();
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', init);
