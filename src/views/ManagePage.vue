<template>
  <el-container class="manage_container">
    <el-header>
      <div class="menu_area">
        <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">班级管理</el-menu-item>
          <el-menu-item index="2">老师管理</el-menu-item>
          <el-menu-item index="3">学生管理</el-menu-item>
          <el-menu-item index="4">学院管理</el-menu-item>
        </el-menu>
      </div>
      <div class="actions_area">
        <el-button type="primary" plain @click="createInstance">添加</el-button>
        <el-button class="mr16" type="primary" plain>excel导入</el-button>
      </div>
    </el-header>
    <el-main style="height: 100%;">
      <ClassComponent ref="classRef" v-if="activeIndex === '1'"  @on-edit="handleEditInstance"></ClassComponent>
      <TeacherComponent v-if="activeIndex === '2'"></TeacherComponent>
      <StudentComponent v-if="activeIndex === '3'"></StudentComponent>
      <CollegeComponent ref="collegeRef" v-if="activeIndex === '4'" @on-edit="handleEditInstance" ></CollegeComponent>
    </el-main>
  </el-container>
  <CreateModalComponent :is-visible="modalVisible" :type="getCreateType()" :is-edit="false" :edit-data="editInstance" @close="handleDrawerClose"></CreateModalComponent>
</template>
<script setup lang="ts">
import { inject, ref } from 'vue'
import ClassComponent from './class/ClassPage.vue';
import TeacherComponent from './teacher/TeacherPage.vue';
import StudentComponent from './student/StudentPage.vue';
import CreateModalComponent from '@/components/CreateModalComponent.vue'
import CollegeComponent from './college/CollegePage.vue'
const activeIndex = ref('1')
const collegeRef = ref(null);
const classRef = ref(null);
const handleSelect = (index: string) => {
  activeIndex.value = index
}

const modalVisible = ref(false)
const createMap = new Map([
  ['1','class'],
  ['2','teacher'],
  ['3','student'],
  ['4','college'],
  ]
);
const getCreateType = () =>{
  return createMap.get(activeIndex.value)
}

const editInstance = ref(null);
const handleEditInstance = (current: any) =>{
  modalVisible.value = true;
  editInstance.value = current;
}

// todo 2024/1/3 ruoweng 这里组件的定位有问题，create组件应该设置在 子页面内部，避免好几层传值，同时避免，父组件调用子组件的情况
const handleDrawerClose = () =>{
  modalVisible.value = false;
  editInstance.value = null;
  let currentRef = null;
  switch (activeIndex.value){
    case '1':
      currentRef = classRef;
      break;
    case '4':
      currentRef = collegeRef;
      break;
  }
  currentRef && currentRef.value?.getList();
}
const createInstance = () =>{
  modalVisible.value = true;
}
</script>
<style scoped lang="less">
.manage_container{
  height: 100%;
  padding-bottom: 16px;

  .el-main{
    padding-bottom: 36px;
  }
}
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
