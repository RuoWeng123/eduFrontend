<template>
  <el-container>
    <el-main>
      <div v-if="studentList.length > 0">
        <StudentCard  v-for="item in studentList" :key="item.id" :student="item" @onAction="(type: string) =>handleAction(type, item)"></StudentCard>
      </div>
      <el-empty v-else description="暂无数据"></el-empty>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { getEduClient } from '@/api/eduApi'
import type { Student } from '@/common/types/eduType'
import StudentCard from '@/views/student/StudentCard.vue'

const studentList = ref<Student[]>([
  {id: 1, name: '---', sex: 1, card: '---'}
])
const getList = () =>{
  getEduClient().getStudentList().then(res => {
    console.log(res);
    studentList.value = res.map(item =>{
      return {
        id: item.id,
        name: item.name,
        sex: item.sex,
        card: item.card,
      }
    })
  });
}
defineExpose({getList})
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
    getEduClient().deleteStudent(current.id).then(res => {
      console.log(res)
      if(res){
        getList()
      }
    });
  }
}
onMounted(getList)
</script>

<style scoped>

</style>
