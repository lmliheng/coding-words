

// 从URL中获取专业名词ID
function getWordId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}



// 获取专业名词详细信息
async function getWordDetails(wordId) {
    try {
        const response = await fetch(`http://localhost:3000/api/Onlyword/word/${wordId}`, {
            method: 'GET'
        });
        const data = await response.json();
        if (response.ok) {
            console.log("***************************************")
            console.log('获取专业名词详情成功-getWordDetails:', data.word);
            console.log("***************************************")
            
            return data.word;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('获取专业名词详情失败:', error);
        throw error;
    }
}

// 渲染专业名词详情
function renderWordDetails(word) {
    try {
        console.log('开始渲染专业名词详情:', word);
        console.log("***************************************")

        // 恢复word-content的原始HTML结构
        const wordContent = document.querySelector('.word-content');
        wordContent.innerHTML = `
            <div class="word-meta">
            <h1 id="word-title"></h1>
                <div class="word-info-container">
                    <div class="tags" id="word-tags"></div>
                    <div class="update-time" id="word-update-time"></div>
                </div>
            </div>
            <div class="markdown-body" id="word-body">
                <!-- 富文本内容将通过JavaScript动态填充 -->
            </div>
        `;

        // 渲染标题
        if (word.word_name) {
            document.getElementById('word-title').textContent = word.word_name;
            console.log('标题渲染为', word.word_name);
        } else {
            document.getElementById('word-title').textContent = '未命名专业名词';
            console.log('标题渲染为: 未命名专业名词');
        }
            console.log("***************************************")

        // 渲染标签
        const tagsContainer = document.getElementById('word-tags');
        if (tagsContainer) {
            tagsContainer.innerHTML = '';
            try {
                let tags = [];
                console.log('原始标签:', word.tag);
                if (Array.isArray(word.tag)) {
                    tags = word.tag;
                } else if (typeof word.tag === 'string') {
                    tags = JSON.parse(word.tag);
                }
                console.log('解析后的标签:', tags);
                
                if (Array.isArray(tags) && tags.length > 0) {
                    tags.forEach(tag => {
                        const tagElement = document.createElement('span');
                        tagElement.className = 'tag';
                        tagElement.textContent = tag;
                        tagsContainer.appendChild(tagElement);
                    });
                    console.log('标签渲染成功:', tags);
                } else {
                    tagsContainer.innerHTML = '<span class="tag">无标签</span>';
                    console.log('标签渲染为: 无标签');
                }
            } catch (tagError) {
                console.error('标签渲染失败:', tagError);
                tagsContainer.innerHTML = '<span class="tag">标签解析失败</span>';
            }
        } else {
            console.error('找不到word-tags元素');
        }
        console.log("***************************************")

        // 渲染更新时间
        try {
            const timeElement = document.getElementById('word-update-time');
            if (timeElement) {
                 if (word.created_at) {
                    timeElement.textContent = `创建时间: ${new Date(word.created_at).toLocaleString()}`;
                    console.log('创建时间渲染为:', new Date(word.created_at).toLocaleString());
                } else {
                    timeElement.textContent = '更新时间: 未知';
                    console.log('更新时间渲染为: 未知');
                }
            } else {
                console.error('找不到word-update-time元素');
            }
        } catch (timeError) {
            console.error('时间渲染失败:', timeError);
        }
       
        console.log("***************************************")
        // 渲染富文本内容9
        try {
            const bodyElement = document.getElementById('word-body');
            if (bodyElement) {
                if (word.content) {
                    bodyElement.innerHTML = word.content;
                    console.log('富文本内容渲染成功');
                } else {
                    bodyElement.innerHTML = '<p>暂无内容</p>';
                    console.log('富文本内容渲染为: 暂无内容');
                }
            } else {
                console.error('找不到word-body元素');
            }
        } catch (contentError) {
            console.error('富文本内容渲染失败:', contentError);
        }
        console.log("***************************************")
        console.log('专业名词详情渲染完成');
    } catch (error) {
        console.error('渲染专业名词详情失败:', error);
        showError('渲染专业名词详情失败');
    }
}

// 显示加载状态
function showLoading() {
    const wordContent = document.querySelector('.word-content');
    wordContent.innerHTML = `
        <div class="loading">
            <div class="loading-spinner"></div>
        </div>
    `;
}

// 显示错误状态
function showError(message) {
    const wordContent = document.querySelector('.word-content');
    wordContent.innerHTML = `
        <div class="error">
            <h3>错误</h3>
            <p>${message}</p>
            <a href="../../index.html" class="nav-link">返回首页</a>
        </div>
    `;
}

// 增加阅读量
async function incrementReadTime(wordId) {
    try {
        await fetch(`http://localhost:3000/api/Onlyword/word/${wordId}/read`, {
            method: 'PUT'
        });
    } catch (error) {
        console.error('增加阅读量失败:', error);
        // 不影响页面显示，静默处理
    }
}

// 初始化页面
async function init() {
    const wordId = getWordId();
    if (!wordId) {
        showError('缺少专业名词ID');
        return;
    }
    
    showLoading();
    
    try {
        const word = await getWordDetails(wordId);
        
        console.log('获取id成功-init:', word);
        console.log("***************************************")
        renderWordDetails(word);
        
        console.log('渲染专业名词详情成功');
        console.log("***************************************")
        // 增加阅读量
        incrementReadTime(wordId);
    } catch (error) {
        showError('获取专业名词详情失败');
    }
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', init);