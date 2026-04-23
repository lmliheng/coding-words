import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserInfoStore = defineStore('userInfo', () => {
    const userInfo = ref(null) // object
    const setUserInfo = (val) => {
        // 需要判断写入类型
        userInfo.value = val
    }

    return {
        userInfo,
        setUserInfo
    }
})
