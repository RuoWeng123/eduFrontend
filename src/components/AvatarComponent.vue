<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import { useUserStore } from '@/stores/auth'
import { resetAuthToken } from '@/api/eduApi'
const squareUrl = ref('https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png')

const logout = () => {
  useUserStore().resetUser();
  resetAuthToken();
  router.push('/login');
}
</script>

<template>
  <div class="avatar">
    <el-popover
      placement="bottom"
      width="180"
      trigger="hover">
      <el-menu mode="horizontal">
        <el-menu-item index="1" @click="logout">
          登出
        </el-menu-item>
      </el-menu>
      <template #reference>
        <el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar>
      </template>
    </el-popover>
  </div>
</template>

<style scoped>

</style>
