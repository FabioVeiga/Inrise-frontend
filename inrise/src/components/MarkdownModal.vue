<template>
  <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    @click.self="closeModal">
    <div class="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto relative">
      <button class="absolute top-3 right-3 bg-transparent border-none text-xl cursor-pointer"
        @click="closeModal">&times;</button>
      <!-- Add a wrapper class here for scoping styles -->
      <div class="markdown-content" v-html="renderedContent"></div>
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
<style scoped>
::v-deep .markdown-content h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: left;
}

::v-deep .markdown-content h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  text-align: start;
}

::v-deep .markdown-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}

::v-deep .markdown-content h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

::v-deep .markdown-content p {
  margin-top: 0;
  margin-bottom: 1rem;
  line-height: 1.5;
  font-size: 1rem;
  text-align: start;
}

::v-deep .markdown-content ul {
  padding-left: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  text-align: start;
}

::v-deep .markdown-content ul li {
  margin-bottom: 0.5rem;
  list-style-type: disc;
}

::v-deep .markdown-content ol {
  padding-left: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

::v-deep .markdown-content ol li {
  margin-bottom: 0.5rem;
}

::v-deep .markdown-content table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

::v-deep .markdown-content table th,
::v-deep .markdown-content table td {
  padding: 0.75rem;
  border: 1px solid #ddd;
  text-align: left;
}

::v-deep .markdown-content table th {
  background-color: #f4f4f4;
}

::v-deep .markdown-content table tr:nth-child(even) {
  background-color: #f9f9f9;
}

::v-deep .markdown-content table caption {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  font-weight: bold;
}
</style>
