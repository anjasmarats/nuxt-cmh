<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Daftar Artikel</h1>
      <NuxtLink to="/create" class="btn btn-primary">
        + Tambah Artikel
      </NuxtLink>
    </div>

    <div v-if="pending" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="error" class="alert alert-danger">
      Error: {{ error.message }}
    </div>

    <div v-else-if="!articles.length" class="alert alert-info">
      Belum ada artikel. <NuxtLink to="/create">Buat artikel pertama!</NuxtLink>
    </div>

    <div v-else class="row">
      <div v-for="article in articles" :key="article.id" class="col-md-6 mb-3">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ article.title }}</h5>
            <p class="card-text">
              <small class="text-muted">Tipe: {{ article.type }}</small>
            </p>
            <p class="card-text">
              {{ article.content.substring(0, 100) }}...
            </p>
            <div class="d-flex gap-2">
              <NuxtLink :to="`/articles/${article.id}`" class="btn btn-info btn-sm">
                Detail
              </NuxtLink>
              <NuxtLink :to="`/edit/${article.id}`" class="btn btn-warning btn-sm">
                Edit
              </NuxtLink>
            </div>
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

const { data: articles, pending, error } = await useFetch<Article[]>('http://localhost:3001/api/articles')
</script>