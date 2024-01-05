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
const getCollegeList = () =>{
  getEduClient().getCollegeList().then(res => {
    console.log(res)
    collegeList.value = res.map(item =>{
      return {
        id: item.id,
        name: item.name,
        classNum: item.classNum || 0,
      }
    })
  });
}
defineExpose({getCollegeList})
const emit = defineEmits<
  {
    onEdit: [value: any]
  }
>()
const handleAction = (type: string, current: any) =>{
  console.log('从card 穿出的数据',type)
  if(type === 'edit'){
    emit('onEdit', current)
  }
  if(type === 'delete'){
    getEduClient().deleteCollege(current.id).then(res => {
      console.log(res)
      if(res){
        getCollegeList()
      }
    });
  }
}
onMounted(getCollegeList)
</script>

<style scoped>

</style>
