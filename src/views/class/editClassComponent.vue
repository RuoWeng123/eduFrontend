<script setup lang="ts">

import { reactive, onMounted, ref } from 'vue'
import { getEduClient } from '@/api/eduApi'
import type { College, CollegeList } from '@/common/types/eduType'
import { dayjs } from 'element-plus'

const props = defineProps({
  editData: Object,
});
const formData = reactive({
  name: props.editData?.name || '',
  collegeId: props.editData?.collegeId || '',
  slogan: props.editData?.slogan || '',
  year: props.editData?.year || dayjs().format('YYYY'),
})
const collegeList = ref<CollegeList>([])
const getCollegeList = async (): Promise<CollegeList> =>{
  let res = await getEduClient().getCollegeList()
  return res.map((item: College) =>{
    return {
      id: item.id,
      name: item.name,
    }
  })
}
onMounted(async () => {
  collegeList.value = await getCollegeList()
})
const emit = defineEmits<
  {
    handleClose: []
  }>();
const onSubmit = () =>{
  let params = {
    id: props.editData?.id,
    name: formData.name,
    slogan: formData.slogan ? formData.slogan : null,
    year: formData.year,
    collegeId: formData.collegeId
  }
  getEduClient().createClass(params).then(res => {
    if(res.id){
      emit('handleClose')
    }
  });
}

</script>

<template>
<el-form :model="formData">
  <el-form-item label="班级名称" prop="name">
    <el-input v-model="formData.name"></el-input>
  </el-form-item>
  <el-form-item label="班级口号" prop="slogan">
    <el-input v-model="formData.slogan"></el-input>
  </el-form-item>
  <el-form-item label="成立时间" prop="year">
    <el-date-picker type="year" v-model="formData.year"></el-date-picker>
  </el-form-item>
  <el-form-item label="归属学院" prop="collegeId" v-if="collegeList.length">
    <el-select v-model="formData.collegeId" placeholder="请选择班级">
      <el-option
        v-for="item in collegeList"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">提交</el-button>
  </el-form-item>
</el-form>

</template>

<style scoped>

</style>
