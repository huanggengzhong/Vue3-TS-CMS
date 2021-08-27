<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import HelloWorld from 'components/HelloWorld.vue' // @ is an alias to /src
// import { ElButton } from 'element-plus'
export default defineComponent({
  name: 'Home',
  components: {
    // HelloWorld
    // ElButton
  }
})
</script>
