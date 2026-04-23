<script setup>
import NavgiterCom from '@/components/NavgiterCom.vue'
import {onMounted,ref} from 'vue'
import request from '@/composable/request.js'
import { useRoute } from 'vue-router'
import markdown from '@/components/markdown.vue'
const route = useRoute()

const userInfo = ref(null)
const getUserInfo = async () => {
    const res = await request.requestUserInfo()
    userInfo.value = res.data.user
}

// 单词详情
const wordInfo = ref(null)
const getWordInfo = async () => {
    const res = await request.requestWordInfo(route.params.id)
    wordInfo.value = res.data.word
    
}

onMounted(() => {
    getUserInfo()
    getWordInfo()
})


</script>

<template>
  <div id="home" class="w-full h-screen">
    <NavgiterCom class="w-full h-32  flex items-center justify-center" :userInfo="userInfo"></NavgiterCom>
   <div class="w-1/2 m-auto flex flex-col items-left justify-between gap border border-gray-300 rounded-xl  p-5">
        <div class="mb-5">
            <p class="text-2xl font-bold text-sky-500 mb-2">{{ wordInfo?.word_name}}</p>
            <div class="text-sm text-gray-500">于 {{ new Date(wordInfo?.created_at).toLocaleString() }} 发布</div>
        </div>
       <hr class="border-t border-gray-300" />
        <div  id="content " class="mt-5">
            <markdown :content="wordInfo?.content"></markdown>
        </div>
       
    </div>
   
  </div>
</template>

<style scoped>
  
</style>
