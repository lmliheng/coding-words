// 初始化Markdown编辑器
const easyMDE = new EasyMDE({
    element: document.getElementById('word-content'),
    spellChecker: false,
    placeholder: '请输入专业名词的详细描述（支持Markdown格式）',
    toolbar: [
        'bold', 'italic', 'heading', '|',
        'code', 'quote', 'unordered-list', 'ordered-list', '|',
        'link', 'image', 'table', '|',
        'preview', 'side-by-side', 'fullscreen', '|',
        'guide'
    ]
});

// 表单提交处理
const uploadForm = document.getElementById('upload-form');

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // 获取表单数据
    const title = document.getElementById('word-title').value;
    const content = easyMDE.value();
    
    // 获取选中的标签
    const selectedTags = [];
    document.querySelectorAll('input[name="tags"]:checked').forEach(checkbox => {
        selectedTags.push(checkbox.value);
    });
    
    // 验证表单
    if (!title || !content) {
        alert('请填写标题和内容');
        return;
    }
    
    if (selectedTags.length === 0) {
        alert('请至少选择一个标签');
        return;
    }
    
    // 构建表单数据
    const formData = {
        title,
        content,
        tags: selectedTags
    };
    
    console.log('上传数据:', formData);
    
    // 模拟上传过程
    try {
        // 这里可以替换为实际的API调用
        // const response = await fetch('http://localhost:3000/api/words', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${localStorage.getItem('token')}`
        //     },
        //     body: JSON.stringify(formData)
        // });
        
        // 模拟API响应
        setTimeout(() => {
            alert('上传成功！');
            uploadForm.reset();
            easyMDE.value('');
        }, 1000);
    } catch (error) {
        console.error('上传失败:', error);
        alert('上传失败，请稍后重试');
    }
});

// 检查登录状态
function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('请先登录');
        window.location.href = '../login/login.html';
    }
}

// 页面加载完成后检查登录状态
window.addEventListener('DOMContentLoaded', checkAuth);