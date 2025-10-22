<template>
  <div>
    <div v-if="pending" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="error" class="alert alert-danger">
      Error: {{ error.message }}
    </div>

    <div v-else-if="article">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>{{ article.title }}</h1>
        <div class="d-flex gap-2">
          <NuxtLink :to="`/edit/${article.id}`" class="btn btn-warning">
            Edit
          </NuxtLink>
          <button @click="deleteArticle" class="btn btn-danger">
            Hapus
          </button>
          <NuxtLink to="/" class="btn btn-secondary">
            Kembali
          </NuxtLink>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <p><strong>Tipe Artikel:</strong> {{ article.type }}</p>
          <p><strong>Dibuat:</strong> {{ formatDate(article.createdAt) }}</p>
          <p><strong>Diupdate:</strong> {{ formatDate(article.updatedAt) }}</p>
          <hr>
          <div class="content">
            {{ article.content }}
          </div>
        </div>
      </div>
    </div>
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

const { data: article, pending, error } = await useFetch<Article>(
  `http://localhost:3001/api/articles/${route.params.id}`
)

const deleteArticle = async () => {
  if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
    try {
      await $fetch(`http://localhost:3001/api/articles/${route.params.id}`, {
        method: 'DELETE'
      })
      await router.push('/')
    } catch (err) {
      alert('Error menghapus artikel')
    }
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID')
}
</script>