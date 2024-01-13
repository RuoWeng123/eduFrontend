<template>
  <el-container>
    <el-main>
      <div v-if="teacherList.length > 0">
        <TeahcerCard  v-for="item in teacherList" :key="item.id" :teacher="item" @onAction="(type: string) =>handleAction(type, item)"></TeahcerCard>
      </div>
      <el-empty v-else description="暂无数据"></el-empty>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { getEduClient } from '@/api/eduApi'
import type { Student, Teacher } from '@/common/types/eduType'
import StudentCard from '@/views/student/StudentCard.vue'
import TeahcerCard from '@/views/teacher/TeahcerCard.vue'

const teacherList = ref<Teacher[]>([
  {id: 1, name: '---', roleId: 1, password: '---', course: '政治'}
])
const getList = () =>{
  getEduClient().getTeacherList().then(res => {
    teacherList.value = res.map(item =>{
      return {
        id: item.id,
        name: item.name,
        course: item.course,
        headClass: item.headClass,
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
    getEduClient().deleteTeacher(current.id).then(res => {
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
