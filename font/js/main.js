// 渲染热搜榜
function renderHotSearch() {
    const hotSearchContainer = document.getElementById('hot-search');
    if (!hotSearchContainer) return;

    // 清空容器
    hotSearchContainer.innerHTML = '';

    // 渲染热搜榜数据
    hotSearchData.forEach((item, index) => {
        const rankingSearchItem = document.createElement('div');
        rankingSearchItem.className = 'ranking-search-item';
        rankingSearchItem.innerHTML = `
            
            <a href="${item.key_word_href}" class="ranking-link"> 容器 ${index + 1}</a>  111
            
        `;
        hotSearchContainer.appendChild(rankingSearchItem);
    });
}

// 渲染贡献榜
function renderContributionRank() {
    const contributionContainer = document.getElementById('contribution-rank');
    if (!contributionContainer) return;

    // 清空容器
    contributionContainer.innerHTML = '';

    // 渲染贡献榜数据
    contributionData.forEach((item, index) => {
        const rankingSearchItem = document.createElement('div');
        rankingSearchItem.className = 'ranking-search-item';
        rankingSearchItem.innerHTML = `
            
            
            <text class="ranking-contributions-name">${item.name}</text>  
            <text class="ranking-contributions-value">贡献值: ${item.contributions}</text>
           
        `;
        contributionContainer.appendChild(rankingSearchItem);
    });
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
function init() {
    renderHotSearch();
    renderContributionRank();
    renderWords();
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', init);
