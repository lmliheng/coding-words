// 初始化Markdown编辑器
            var vditor = null;
            window.onload = function() {
                vditor = new Vditor(document.getElementById('content'), {
                    cache: {
                        enable: false
                    },
                    "height": "70vh",
                    "icon": "material",  
                    "mode": "sv",
                    "preview": {
                        "mode": "both"
                    },
                    "placeholder": "codeword使用Vditor 支持所见即所得（富文本）、即时渲染和分屏预览模式"
                });
            } 
// 需要改进




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


// 页面加载完成后检查登录状态
window.addEventListener('DOMContentLoaded', checkAuth);




// 表单提交处理
const uploadForm = document.getElementById('upload-form');

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // 获取表单数据
    const word_name = document.getElementById('word-title').value;
    const content = vditor.getValue();
    
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
    
    // if (selectedTags.length === 0) {
    //     alert('请至少选择一个标签');
    //     return;
    // }
    
    // 构建表单数据
    const formData = {
        word_name,
        tags: selectedTags,
        content
    };
    
    console.log('上传数据是:', formData);
    
    // 实际上传过程
    try {
        const response = await fetch('http://localhost:3000/api/upload/word', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        if (response.ok) {
            alert('上传成功！');

            // 清空表单和编辑器
            uploadForm.reset();
            vditor.setValue('');
        } else {
            alert('上传失败: ' + data.message);
        }
    } catch (error) {
        console.error('上传失败:', error);
        alert('上传失败，请稍后重试');
    }
});
