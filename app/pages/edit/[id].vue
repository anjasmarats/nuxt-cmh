<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Edit Artikel</h1>
      <NuxtLink to="/" class="btn btn-secondary">
        Kembali
      </NuxtLink>
    </div>

    <form @submit.prevent="updateArticle" class="card">
      <div class="card-body">
        <div class="mb-3">
          <label for="title" class="form-label">Judul Artikel</label>
          <input
            v-model="form.title"
            type="text"
            class="form-control"
            id="title"
            required
          >
        </div>

        <div class="mb-3">
          <label for="type" class="form-label">Tipe Artikel</label>
          <select v-model="form.type" class="form-select" id="type" required>
            <option value="">Pilih Tipe</option>
            <option value="Teknologi">Teknologi</option>
            <option value="Pendidikan">Pendidikan</option>
            <option value="Kesehatan">Kesehatan</option>
            <option value="Bisnis">Bisnis</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        <div class="mb-3">
          <label for="content" class="form-label">Konten Artikel</label>
          <textarea
            v-model="form.content"
            class="form-control"
            id="content"
            rows="10"
            required
          ></textarea>
        </div>

        <button type="submit" class="btn btn-primary" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          {{ loading ? 'Mengupdate...' : 'Update Artikel' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
interface Article {
  id: number
  title: string
  type: string
  content: string
  createdAt: string
  updatedAt: string
}

const route = useRoute()
const router = useRouter()
const loading = ref(false)

const { data: article } = await useFetch<Article>(
  `http://localhost:3001/api/articles/${route.params.id}`
)

const form = reactive({
  title: article.value?.title || '',
  type: article.value?.type || '',
  content: article.value?.content || ''
})

const updateArticle = async () => {
  loading.value = true
  
  try {
    await $fetch(`http://localhost:3001/api/articles/${route.params.id}`, {
      method: 'PUT',
      body: form
    })
    
    await router.push('/')
  } catch (error) {
    alert('Error mengupdate artikel')
  } finally {
    loading.value = false
  }
}
</script>