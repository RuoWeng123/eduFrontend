<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { getEduClient } from '@/api/eduApi'
import type { Class, ClassList, Teacher } from '@/common/types/eduType'
const props = defineProps({
  editData: Object as () => Teacher,
});
const formData = reactive({
  name: props.editData?.name || '',
  course: props.editData?.course || '',
  headClassId: props.editData?.headClassId || '',
  classes: props.editData?.classes || [],
})

const emit = defineEmits<
  {
    handleClose: []
  }>();
const onSubmit = () =>{
  getEduClient().createTeacher({
      id: props.editData?.id,
      name: formData.name,
      course: formData.course,
      headClassId: formData.headClassId,
      classes: formData.classes,
      roleId: 2
    }
  ).then(res => {
    if(res){
      emit('handleClose')
    }
  });
}

const classList = ref<ClassList>([])
const getClassList = async (): Promise<ClassList> =>{
  let res = await getEduClient().getClassAll()
  return res.map((item: Class) =>{
    return {
      id: item.id,
      name: `${item.name}_${item.year}`,
    }
  })
}
onMounted(async () => {
  classList.value = await getClassList()
})

</script>

<template>
  <el-form :model="formData" label-width="100px">
    <el-form-item label="名字" prop="name">
      <el-input v-model="formData.name"></el-input>
    </el-form-item>
    <el-form-item label="课程" prop="course">
      <el-input v-model="formData.course"></el-input>
    </el-form-item>
    <el-form-item label="班主任" prop="headClassId">
      <el-select v-model="formData.headClassId" placeholder="请选择班级">
        <el-option
          v-for="item in classList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="教学班级" prop="classes">
      <el-select multiple v-model="formData.classes" placeholder="please choose">
        <el-option
          v-for="item in classList"
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
