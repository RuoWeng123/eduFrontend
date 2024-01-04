<script setup lang="ts">
import { ref } from 'vue'
import AvatarComponent from '@/components/AvatarComponent.vue'
import router from '@/router'

//todo 这里应该写一个纯函数，用于输入roleId, 输出对应的路由，只有roleId==1 的才可以资源管理
const menuList = ref([
  {
    index: '1',
    title: '教师监控',
    path: '/inner/video'
  },
  {
    index: '2',
    title: '资源管理',
    path: '/inner/manage'
  },
  {
    index: '3',
    title: '课程安排',
    path: '/inner/course'
  },
  {
    index: '4',
    title: '考试批卷',
    path: '/inner/exam'
  }
])

const jumpTo = (path: string) => {
  console.log(path)
  if (path !== router.currentRoute.value.path) {
    router.replace(path)
  }
}
</script>

<template>
  <div class="inner_container">
    <div class="inner_header">
      <div class="logo">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
      </div>
      <div class="menu">
        <el-menu mode="horizontal">
          <el-menu-item v-for="item in menuList" :key="item.title">
            <div class="edu_menu_item" @click="jumpTo(item.path)">{{ item.title }}</div>
          </el-menu-item>
        </el-menu>
      </div>
      <AvatarComponent class="avatar"></AvatarComponent>
    </div>
    <div class="inner_context">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="less">
.inner_container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .inner_header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: aliceblue 1px solid;

    .logo {
      width: 60px;
      height: 60px;
      padding: 8px;
    }

    .menu {
      flex: 1;

      .el-menu {
        border-bottom: none;
        font-size: 16px;

        .edu_menu_item {
          padding: 0 14px;
          cursor: pointer;

          &:hover {
            color: var(--el-color-primary-light-1);
          }
        }
      }
    }

    .avatar {
      width: 80px;
      height: 60px;
      padding: 5px;
    }
  }

  .inner_context{
    flex: 1;
  }
}

</style>
