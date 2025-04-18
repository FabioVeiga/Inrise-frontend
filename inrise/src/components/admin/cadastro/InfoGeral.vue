<template>
  <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
    <h2 class="col-span-2 text-2xl font-bold">Informações Gerais</h2>
    <!-- Uploader de Imagem -->
    <div
      class="col-span-2 image-upload-card border-dashed border-2 border-gray-300 rounded-lg flex justify-center items-center p-4 cursor-pointer hover:bg-gray-100 transition relative"
      @click="triggerFileInput" @dragover.prevent="handleDragOver" @drop.prevent="handleDrop">

      <input type="file" ref="fileInput" @change="handleImageUpload" accept="image/*" class="hidden" />

      <div class="text-center" v-if="!formData.images?.[0]?.url && !formData.imagePreview">
        <p class="text-gray-500">Clique ou arraste uma imagem aqui</p>
        <p class="text-sm text-gray-400">(Apenas arquivos .jpg, .png, .jpeg)</p>
      </div>

      <!-- Image Preview -->
      <img v-if="formData.images?.[0]?.url" :src="formData.images[formData.images.length - 1].url"
        alt="A imagem não pôde ser exibida." class="max-w-28 max-h-28 object-cover rounded-md" />

      <img v-if="formData.imagePreview && !formData.images[0].url" :src="formData.imagePreview"
        alt="Pré-visualização da imagem" class="max-w-64 max-h-64 object-cover rounded-md" />
    </div>
    <!-- Nome do Produto -->
    <div class="form-group">
      <label for="productName" class="block mb-1 font-semibold">Nome do Produto</label>
      <input type="text" v-model="name" id="productName" required class="w-full border p-2" />
    </div>

    <!-- Classificação do Valor -->
    <div class="form-group">
      <label for="valueClassification" class="block mb-1 font-semibold">Classificação do Valor</label>
      <input type="number" v-model="valueClassification" id="valueClassification" required class="w-full border p-2" />
    </div>

    <!-- Descrição -->
    <div class="form-group col-span-2">
      <label for="description" class="block mb-1 font-semibold">Descrição</label>
      <textarea v-model="description" id="description" class="resize-none w-full h-24 border p-2"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoGeral",
  props: {
    formData: {
      type: Object,
      required: true,
    },
    productType: {
      type: String,
      required: true
    }
  },
  mounted() {
    console.log("Produto no InfoGeral:", this.formData);
    console.log("refs", this.$refs)

  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.createImagePreview(file);
        this.$emit("update-form-data", { key: "image", value: file });
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleDragOver(event) {
      event.preventDefault();
    },
    handleDrop(event) {
      const file = event.dataTransfer.files[0];
      if (file) {
        this.createImagePreview(file);
        this.$emit("update-form-data", { key: "image", value: file });
      }
    },
    createImagePreview(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.$emit("update-form-data", { key: "imagePreview", value: e.target.result });
        this.$emit("update-form-data", { key: "images", value: [{ url: e.target.result }] });
      };
      reader.readAsDataURL(file);
    }
  },
  computed: {
    name: {
      get() {
        return this.formData.name;
      },
      set(value) {
        this.$emit("update-form-data", { key: "name", value });
      },
    },
    valueClassification: {
      get() {
        return this.formData.valueClassification;
      },
      set(value) {
        this.$emit("update-form-data", { key: "valueClassification", value });
      },
    },
    description: {
      get() {
        return this.formData.description ? this.formData.description.replace(/\n/g, '\n') : '';
      },
      set(value) {
        this.$emit("update-form-data", { key: "description", value: value.replace(/\n/g, '\n') });
      },
    },
  },
};
</script>

<style scoped>
.image-upload-card {
  max-height: 400px;
  width: 100%;
  position: relative;
}

.image-upload-card img {
  max-height: 100%;
  max-width: 100%;
  border-radius: 0.375rem;
}
</style>
