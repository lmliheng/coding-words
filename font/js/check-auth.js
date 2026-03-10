// 检查用户登录状态并打印用户信息
async function checkAuth() {
    // 从localStorage获取token
    const token = localStorage.getItem('token');
    
    if (!token) {
        console.log('用户未登录');
        updateLoginButton(null);// 未登录时显示登录按钮
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
            
            // 更新登录按钮为用户名
            updateLoginButton(data.user[0].username);
            
        } else {
            console.log('用户信息存在，但token不存在');
            updateLoginButton(null);
        }   
    } catch (error) {
        console.error('检查登录状态失败:', error);
        updateLoginButton(null);
    }
}



// 更新页面
function updateLoginButton(username) {
    const loginBtnContainer = document.querySelector('.login-btn');
    if (!loginBtnContainer) return;
    
    if (username) {
        // 显示用户名和下拉菜单
        loginBtnContainer.innerHTML = `
            <div class="user-info">
                <div class="username-container">
                    <span class="username">${username}</span>
                    <div class="user-menu">
                        <ul>
                            <li><a href="./model/myInfo/myInfo.html">账号设置</a></li>
                            <li><a href="./model/upload_word/upload_word.html">提供word</a></li>
                            <li><a href="./model/manage/manage.html">管理</a></li>
                            <li><a href="#" id="logout-menu-btn">退出登录</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        // 添加退出登录事件
        document.getElementById('logout-menu-btn').addEventListener('click', logout);
    } else {
        // 显示登录按钮
        loginBtnContainer.innerHTML = `
            <a href="./model/login/login.html"><button>登录</button></a>
        `;
    }
}




// 退出登录
function logout() {
    // 清除本地存储
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // 更新页面显示
    updateLoginButton(null);
    console.log('用户已退出登录');
}

// 页面加载完成后检查登录状态
window.addEventListener('DOMContentLoaded', checkAuth);
