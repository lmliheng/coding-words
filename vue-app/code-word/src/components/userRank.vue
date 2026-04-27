<script setup>
import { ref, onMounted, reactive } from 'vue'
import request from '@/composable/request'
import { animateToTarget } from 'lmliheng-js'

const contribution = ref([])
const animatedValues = reactive({})

const getterRankData = async () => {
   const res = await request.requestContribution()
   contribution.value = res.data.contribution
   
   res.data.contribution.forEach(item => {
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
  await getterRankData()
  
  contribution.value.forEach(item => {
    startAnimate(item.id, item.contribution_value)
  })
})
</script>

<template>
    <div>
        <div class="w-full h-full flex flex-col items-left justify-between gap border border-gray-300 rounded-xl  p-5">
            <div>
                <p class="text-xl font-bold text-sky-500">用户贡献排名</p>
            </div>
            <div v-for="item in contribution" :key="item.id" class="w-full h-15 group flex items-center justify-between gap-2  cursor-pointer hover:bg-sky-50 transition-all duration-200">
                <div class="ml-2 flex items-center justify-center gap-2 text-md font-bold text-black group-hover:text-sky-500 transition-all duration-800 ">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="dikuser"><g id="dikfill1"><path d="M16.5 7.5C16.5 9.98528 14.4853 12 12 12 9.51472 12 7.5 9.98528 7.5 7.5 7.5 5.01472 9.51472 3 12 3 14.4853 3 16.5 5.01472 16.5 7.5ZM20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21H20Z" id="fill1" fill="transparent"/></g><g id="dikstroke1"><path d="M16.5 7.5C16.5 9.98528 14.4853 12 12 12 9.51472 12 7.5 9.98528 7.5 7.5 7.5 5.01472 9.51472 3 12 3 14.4853 3 16.5 5.01472 16.5 7.5ZM20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21H20Z" stroke-linecap="square" id="stroke1" stroke-width="2" stroke="currentColor"/></g></g></svg>
                {{ item.username }} </div>
                <!-- 每个DOM都得使用animateToTarget函数 -->
                <div class="mr-2 text-lg font-bold text-gray-500">
                 {{ animatedValues[item.id] || 0 }}
                </div>
            </div>
        </div>
    </div>
</template>