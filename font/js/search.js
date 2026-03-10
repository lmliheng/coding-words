



// 搜索功能
function searchWords() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    console.log("************");
    console.log(searchBtn);
    console.log("************");
    const wordsContainer = document.getElementById('search-container');
    console.log("************");
    console.log(wordsContainer);
    console.log("************");
    // 搜索按钮点击事件
    searchBtn.addEventListener('click', performSearch);

    // 回车键搜索
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    //JS如何配合input框实现模糊搜索
    // 执行搜索
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim(); // 获取用户输入的关键词，并转换为小写以便进行不区分大小写的搜索  
        if (!searchTerm) {
            // 如果搜索词为空，重新渲染所有词
            renderWords();
            return;
        }
        
        // 跳转到搜索结果页面
        window.location.href = `./model/search/search.html?keyword=${encodeURIComponent(searchInput.value)}`;
    }
}

// 页面加载完成后初始化搜索功能
window.addEventListener('DOMContentLoaded', searchWords);
