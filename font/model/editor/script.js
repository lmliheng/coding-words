// 从URL中获取专业名词ID
function getWordId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}



// 初始化Markdown编辑器
const easyMDE = new EasyMDE({
    element: document.getElementById('word-content'),
    spellChecker: false,
    placeholder: '请输入详细描述（支持Markdown格式）',
    toolbar: [
        'bold', 'italic', 'heading', '|',
        'code', 'quote', 'unordered-list', 'ordered-list', '|',
        'link', 'image', 'table', '|',
        'preview', 'side-by-side', 'fullscreen', '|',
        'guide'
    ]
});



// 检查登录状态 checkAuth.js
// 检查用户登录状态并打印用户信息
async function checkAuth() {
    // 从localStorage获取token
    const token = localStorage.getItem('token'); 
    if (!token) {
        console.log('用户未登录');       
        return;
    }  
    try {
        const response = await fetch('http://127.0.0.1:3000/api/auth/check-auth', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (response.status === 200) {
            console.log('用户已登录，token存在');
            console.log('token:', token);
            console.log(data.user);
        } else {
            console.log('用户信息存在，但token不存在');
        }   
    } catch (error) {
        console.error('检查登录状态失败:', error);
    }
}


// 加载专业名词详情
async function loadWordDetails() {
    const wordId = getWordId();
    if (!wordId) {
        console.log('未获取到专业名词ID');
        return;
    }
    
    try {
        const response = await fetch(`http://localhost:3000/api/Onlyword/word-editor/${wordId}`);
        const word = await response.json();

        
        if (response.ok) {

            console.log('获取专业名词详情成功:', word);
            console.log("专业名词名称:", word.word.word_name);
            console.log("专业名词标签:", word.word.tag);
            

            // 填充表单字段
            document.getElementById('word-title').value = word.word.word_name;
            easyMDE.value(word.word.content || '');
            
            // 选中标签
            word.word.tag.forEach(tag => {     
                document.querySelector(`input[value="${tag}"]`).checked = true;
            });
            
        } else {
            console.log('获取专业名词详情失败:', word.message);
        }
    } catch (error) {
        console.error('加载专业名词详情失败:', error);
    }
}
// 检查登录状态
checkAuth();
// 页面加载完成后加载专业名词详情
window.addEventListener('DOMContentLoaded', loadWordDetails());






// 表单提交处理
const uploadForm = document.getElementById('upload-form');

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // 获取表单数据
    const word_name = document.getElementById('word-title').value;
    const content = easyMDE.value();
    
    // 获取选中的标签
    const selectedTags = [];
    document.querySelectorAll('input[name="tags"]:checked').forEach(checkbox => {
        selectedTags.push(checkbox.value);
    });
    
    // 验证表单
    if (!word_name || !content) {
        alert('请填写专业名词名称和内容');
        return;
    }
    
    if (selectedTags.length === 0) {
        alert('请至少选择一个标签');
        return;
    }
    
    // 构建表单数据
    const formData = {
        word_name,
        tags: selectedTags,
        content
    };
    
    console.log('更新数据是:', formData);
    
    // 实际更新过程
    try {
        const response = await fetch('http://localhost:3000/api/upload/word/' + getWordId(), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        if (response.ok) {
            alert('更新成功！');
            window.location.href = '../../index.html';


        } else {
            alert('更新失败: ' + data.message);
        }
    } catch (error) {
        console.error('更新失败:', error);
        alert('更新失败，请稍后重试');
    }
});
