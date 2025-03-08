<template>
    <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" @click.self="closeModal">
      <div class="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto relative">
        <button class="absolute top-3 right-3 bg-transparent border-none text-xl cursor-pointer" @click="closeModal">&times;</button>
        <div class="font-sans text-sm leading-relaxed" v-html="renderedContent"></div>
      </div>
    </div>
  </template>
  
  <script>
  import { marked } from 'marked';
  export default {
    name: "MarkdownModal",
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
      markdownContent: {
        type: String,
        required: true,
      }
    },
    computed: {
      renderedContent() {
        return marked(this.markdownContent);
      }
    },
    methods: {
      closeModal() {
        this.$emit('close');
      }
    }
  };
  </script>
  