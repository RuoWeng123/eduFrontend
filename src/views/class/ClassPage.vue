<template>
  <el-container>
    <el-header>
      <el-select v-model="collegeId" placeholder="请选择班级">
        <el-option
          v-for="item in collegeList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select class="ml16" v-model="year" placeholder="请选择年份">
        <el-option
          v-for="item in yearList"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </el-header>
    <el-main>
      <ClassCard v-for="item in classList" :key="item.id" :name="item.name" :teacher-num="item.teachersNum" :student-num="item.studentsNum" @onAction="(type: string) =>handleAction(type, item)"></ClassCard>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">

import { onMounted, reactive, ref } from 'vue'
import { getEduClient } from '@/api/eduApi'
import ClassCard from '@/views/class/ClassCard.vue'

const classList = ref([
  {id: 1, name: '---', studentsNum: 0, teachersNum: 0}
])
const collegeId = ref(null)
// TODO 2024/1/3 ruoweng 实际是从数据库获取
const collegeList = reactive([
  {name: '法学院', id: 1},
  {name: '软件学院', id: 2},
])
const year = ref(null)
const yearList = reactive([
  2012,
  2017,
  2018,
  2019,
  2020,
  2021
])
const getList = () =>{
  getEduClient().getClassList({collegeId: collegeId.value, year: year.value}).then(res => {
    console.log(res)
    classList.value = res.map(item =>{
      return {
        id: item.id,
        name: item.name,
        studentsNum: item.students.length || 0,
        teachersNum: 0
      }
    })
  });
}
const getCollegeList = () =>{
  getEduClient().getCollegeList().then(res => {
    console.log(res)
    collegeList.push(...res.map(item =>{
      return {
        id: item.id,
        name: item.name,
      }
    }))
  });
}
defineExpose({getList})
onMounted(() =>{
  getList(),
  getCollegeList()
})

const emit = defineEmits<
  {
    onEdit: [value: any]
  }
>()
const handleAction = (type: string, current: any) =>{
  if(type === 'edit'){
    emit('onEdit', current)
  }
  if(type === 'delete'){
    getEduClient().deleteClass(current.id).then(res => {
      if(res){
        getList()
      }
    });
  }
}
</script>

<style scoped>

</style>
