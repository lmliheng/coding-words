<script setup>
import NavgiterCom from '@/components/NavgiterCom.vue'
import wordRank from '@/components/wordRank.vue'
import userRank from '@/components/userRank.vue'

import {onMounted,ref} from 'vue'
import request from '@/composable/request.js'

// localStorage.setItem('token', '')
const userInfo = ref(null)
const getUserInfo = async () => {
    const res = await request.requestUserInfo()
    userInfo.value = res.data.user
}

onMounted(() => {
    getUserInfo()
})
</script>

<template>
  <div id="home" class="w-full h-screen">
    <NavgiterCom class="w-full h-32  flex items-center justify-center" :userInfo="userInfo"></NavgiterCom>
    <div class="w-3/5 m-auto h-96 mt-32 flex items-center justify-center ">
        <wordRank class="w-1/4 h-96 m-auto   flex items-center justify-center" ></wordRank>
        <userRank class="w-1/4 h-96 m-auto   flex items-center justify-center"></userRank>
    </div>
  </div>
</template>

<style scoped>
  
</style>
