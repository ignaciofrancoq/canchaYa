<script setup>

import Home from './views/Home.vue'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'

</script>

<template>
  <div>

    <Header/>
    
    <router-view></router-view>

    <Footer/>

  </div>
</template>

