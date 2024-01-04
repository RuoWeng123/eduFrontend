<template>
  <el-container>
    <el-header>
      <div class="menu_area">
        <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">班级管理</el-menu-item>
          <el-menu-item index="2">老师管理</el-menu-item>
          <el-menu-item index="3">学生管理</el-menu-item>
        </el-menu>
      </div>
      <div class="actions_area">
        <el-button type="primary" plain @click="createInstance">添加</el-button>
        <el-button class="mr16" type="primary" plain>excel导入</el-button>
      </div>
    </el-header>
    <el-main>
      <ClassComponent v-if="activeIndex === '1'"></ClassComponent>
      <TeacherComponent v-if="activeIndex === '2'"></TeacherComponent>
      <StudentComponent v-if="activeIndex === '3'"></StudentComponent>
    </el-main>
  </el-container>
  <CreateModalComponent :is-visible="modalVisible" :type="getCreateType()" :is-edit="false" @close="modalVisible = false"></CreateModalComponent>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import ClassComponent from './class/MyClass.vue';
import TeacherComponent from '@/components/TeacherComponent.vue';
import StudentComponent from '@/components/StudentComponent.vue';
import CreateModalComponent from '@/components/CreateModalComponent.vue'
const activeIndex = ref('1')
const handleSelect = (index: string) => {
  activeIndex.value = index
}

const modalVisible = ref(false)
const createMap = new Map([
  ['1','class'],
  ['2','teacher'],
  ['3','student'],
  ]
);
const getCreateType = () =>{
  return createMap.get(activeIndex.value)
}

const createInstance = () =>{
  modalVisible.value = true;
}
</script>
<style scoped lang="less">
.el-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid var(--el-menu-border-color);

  .menu_area{
    flex: 1;
    .el-menu{

      .el-menu-item{
        :hover{
          background-color: var(--el-menu-item-hover-bg-color);
        }
      }
    }
  }
  .actions_area{
    width: 300px;
    display: flex;
    flex-direction: row-reverse;

    .mr16{
      margin-right: 16px;
    }
  }
}
</style>
