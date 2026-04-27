<script setup>
import { ref, onMounted, reactive } from 'vue'
import { animateToTarget } from 'lmliheng-js'
import request from '@/composable/request'
import { useRouter } from 'vue-router'

const router = useRouter()
const hotSearch = ref([])
const animatedValues = reactive({})

const getterHotSearchData= async ()=>{
   const res = await request.requestHotSearch()
   hotSearch.value = res.data.hotSearch

   res.data.hotSearch.forEach(item => {
      animatedValues[item.id] = 0
   })
}

const startAnimate = (id, target) => {
  animateToTarget({
    currentValue: 0,
    targetValue: target,
    increment: Math.ceil(target / 50),
    dataUpdateMethod: 'ease-in-out',
    displayFn: (val) => {
      animatedValues[id] = val
    },
  })
}

onMounted(async () => {
    await getterHotSearchData()
    hotSearch.value.forEach(item => {
      startAnimate(item.id, item.read_time)
    })
})
// 排行榜 上升率 排行数目 
</script>

<template>
    <div>
  <div class="w-full h-full flex flex-col items-left justify-between gap border border-gray-300 rounded-xl  p-5">
            <div>
                <p class="text-xl font-bold text-sky-500">单词热搜榜</p>
            </div>
            <div v-for="item in hotSearch" :key="item.id" class="w-full h-15 group flex items-center justify-between gap-2  cursor-pointer hover:bg-sky-50 transition-all duration-200">
            <div @click="router.push(`/word/${item.id}`)" class="ml-2 flex items-center justify-center gap-2 text-sm font-bold text-black group-hover:text-sky-500 transition-all duration-800 ">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="biefile-word"><path id="fill1" d="M4 22H20V8H14V2H4V22Z" fill="transparent"/><path id="stroke1" d="M14 2V8H20M14 2H15L20 7V8M14 2H4V22H20V8" stroke-width="2" stroke="currentColor"/><path id="stroke2" d="M9 12L9 16C9 16.5523 9.44772 17 10 17H12M12 17L12 12M12 17H14C14.5523 17 15 16.5523 15 16V12" stroke-linecap="square" stroke-width="2" stroke="currentColor"/></g></svg>
                {{ item.word_name }} 
            </div>
                <div class="mr-2 text-lg font-bold text-gray-500">
                 {{ animatedValues[item.id] || 0 }}
                 </div>
            </div>
        </div>

         
    </div>
</template>