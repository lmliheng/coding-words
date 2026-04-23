<script setup >
import { ref ,onMounted,defineProps} from 'vue'
import {useRouter} from 'vue-router'
const router = useRouter()



const props = defineProps({
    userInfo: {
        type: Object,
        // default: () => ({})
    }
})

const handleClickImg = () => {
  //  window.open('https://github.com/lmliheng/coding-words', '_blank')
  router.push('/')
}

import { MessagePlugin } from 'tdesign-vue-next';


const options = [
  {
    content: '账号管理',
    value: 1,
    divider: true,

  },
  {
    content: '提交单词',
    value: 2,
  },
  {
    content: '单词管理',
    value: 3,
  },
    {
    content: '我的收藏',
    value: 4,
    divider: true,
  },
  {
    content: '退出登录',
    theme: 'error',
    value: 5,
  },
];
const clickHandler = (data) => {
  MessagePlugin.success(`选中【${data.content}】`);
};

onMounted(() => {

})

</script>
<template>
    <div>

        <div class="w-3/5 h-full flex items-center justify-between">
            <div class="w-80 h-full flex items-center justify-center gap-5">
                 <img src="@/assets/github.svg" alt="" class="w-10 cursor-pointer" @click="handleClickImg">
                 <p class="text-3xl font-bold text-sky-500">CodeWord</p>
                 <!-- <icon name="peach" color="pink" /> -->
            </div>
        
           <div class="w-70 h-full flex items-center justify-center ">
            <t-button variant="text" >
                  <svg width="30" t="1776925412061" class="icon cursor-pointer " viewBox="0 0 1365 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4725"><path d="M1094.50027466 90.125h-843.75C173.40625 90.125 110.125 153.40625 110.125 230.75027466v562.49945068C110.125 870.59375 173.40625 933.875 250.75027466 933.875h843.75c77.34320068 0 140.62445068-63.28125 140.62445068-140.62527466V230.75027466C1235.12472534 153.40625 1171.84347534 90.125 1094.50027466 90.125z m-843.75 70.31222534h843.75c14.06195068 0 21.09375 0 28.12472534 7.03179932 0 0 0 7.03097534-7.03097534 7.03097534L721.84375 568.25027466c-28.12472534 28.12472534-70.31222534 28.12472534-98.43777466 0L222.62472534 174.5s0-7.03097534-7.03097534-7.03097534c14.06277466-7.03179932 21.09375-7.03179932 35.15652466-7.03179932z m-70.31304932 632.8125V230.75027466L468.71875 519.03097534 180.43722534 800.28152466v-7.03179932z m984.37527466 0V807.3125L876.53097534 519.03097534 827.3125 568.25027466l295.3125 295.3125H250.75027466c-7.03179932 0-14.06277466 0-28.12554932-7.03179932L510.90625 568.25027466l56.25027466 56.24945068c56.24945068 56.25027466 140.62445068 56.25027466 196.87472534 0l105.46875-105.46875L1164.8125 230.75027466v562.49945068z" fill="#2c2c2c" p-id="4726"></path></svg>
          
            </t-button>
           
          <t-space class="mb-1">

    <t-dropdown :options="options" :min-column-width="100" :hideAfterItemClick="true" trigger="hover" @click="clickHandler">
      <t-space>
        <t-button variant="text" >
           <svg width="18"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="dikuser"><g id="dikfill1"><path d="M16.5 7.5C16.5 9.98528 14.4853 12 12 12 9.51472 12 7.5 9.98528 7.5 7.5 7.5 5.01472 9.51472 3 12 3 14.4853 3 16.5 5.01472 16.5 7.5ZM20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21H20Z" id="fill1" fill="#bbd3fb"/></g><g id="dikstroke1"><path d="M16.5 7.5C16.5 9.98528 14.4853 12 12 12 9.51472 12 7.5 9.98528 7.5 7.5 7.5 5.01472 9.51472 3 12 3 14.4853 3 16.5 5.01472 16.5 7.5ZM20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21H20Z" stroke-linecap="square" id="stroke1" stroke-width="2" stroke="currentColor"/></g></g></svg>
          
           {{props.userInfo?.username || '加载中'}}
          <template #suffix> <t-icon name="chevron-down" size="16" /></template>
        </t-button>
      </t-space>
    </t-dropdown>
  </t-space>
           </div>

        </div>
    </div>
</template>
