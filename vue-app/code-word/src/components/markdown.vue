<template>
  <div class="markdown" v-html="html"></div>
</template>

<script setup>
import { computed } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

const props = defineProps({
  content: String
})

const html = computed(() => {
  if (!props.content) return ''

  marked.setOptions({
    highlight: (code, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(code, { language: lang }).value
        } catch {}
      }
      return hljs.highlightAuto(code).value
    }
  })

  return marked.parse(props.content)
})
</script>

<style scoped>
.markdown {
  line-height: 1.75;
}
.markdown pre {
  padding: 1em;
  border-radius: 8px;
  overflow: auto;
}
.markdown code {
  font-family: Fira Code, monospace;
}
</style>