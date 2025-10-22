<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <NuxtLink to="/" class="navbar-brand">Blog Artikel</NuxtLink>
        <div class="navbar-nav">
          <NuxtLink to="/" class="nav-link">Home</NuxtLink>
          <NuxtLink to="/create" class="nav-link">Tambah Artikel</NuxtLink>
        </div>
      </div>
    </nav>
    <main class="container mt-4">
      <slot />
    </main>
  </div>
</template>