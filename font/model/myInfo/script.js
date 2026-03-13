// 检查登录状态
function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('请先登录');
        window.location.href = '../login/login.html';
    }
    return token;
}

// 获取当前用户信息
async function getUserInfo() {
    const token = checkAuth();
    try {
        const response = await fetch('http://localhost:3000/api/auth/check-auth', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (response.ok) {
            return data.user;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('获取用户信息失败:', error);
        alert('获取用户信息失败，请重新登录');
        window.location.href = '../login/login.html';
        return null;
    }
}




// 填充表单数据
async function fillForm() {
    const userInfo = await getUserInfo();
    if (userInfo) {
        document.getElementById('username').value = userInfo.username || '';
        
    }
}

// 提交表单
async function submitForm(e) {
    e.preventDefault();
    
    const token = checkAuth();
    const username = document.getElementById('username').value;
    
    const password = document.getElementById('password').value;
    
    
    // 构建表单数据
    const formData = {
        username,
        
    };
    
    // 如果填写了密码，添加到表单数据
    if (password) {
        formData.password = password;
    }
    
    try {
        const response = await fetch('http://localhost:3000/api/info/update-info', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        if (response.ok) {
            alert('个人信息修改成功');
            window.location.href = '../../index.html';
        } else {
            alert('修改失败: ' + data.message);
        }
    } catch (error) {
        console.error('修改个人信息失败:', error);
        alert('修改个人信息失败，请稍后重试');
    }
}

// 关闭弹窗
function closeModal() {
    window.location.href = '../../index.html';
}

// 初始化页面
async function init() {
    await fillForm();
    
    // 绑定事件
    document.getElementById('info-form').addEventListener('submit', submitForm);
    document.getElementById('close-btn').addEventListener('click', closeModal);
    document.getElementById('cancel-btn').addEventListener('click', closeModal);
    
    // 点击遮罩层关闭弹窗
    document.getElementById('modal-overlay').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', init);