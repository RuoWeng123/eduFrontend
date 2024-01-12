<template>
  <el-container>
    <el-main>
      <CollegeCard v-for="item in collegeList" :key="item.id" :name="item.name" :class-num="item.classNum" @onAction="(type: string) =>handleAction(type, item)"></CollegeCard>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">

import { onMounted, provide, ref } from 'vue'
import { getEduClient } from '@/api/eduApi'
import CollegeCard from '@/views/college/CollegeCard.vue'

const collegeList = ref([
  {id: 1, name: '---', classNum: 0}
])
const getList = () =>{
  getEduClient().getCollegeList().then(res => {
    console.log(res);
    collegeList.value = res.map(item =>{
      return {
        id: item.id,
        name: item.name,
        classNum: item.classes.length || 0,
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
    getEduClient().deleteCollege(current.id).then(res => {
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
