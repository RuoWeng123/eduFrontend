<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { getEduClient } from '@/api/eduApi'
import type { Class, ClassList, Student } from '@/common/types/eduType'
const props = defineProps({
  editData: Object as () => Student,
});
const formData = reactive({
  name: props.editData?.name || '',
  sex: props.editData?.sex || '',
  card: props.editData?.card || '',
  classId: props.editData?.classId || '',
})

const emit = defineEmits<
  {
    handleClose: []
  }>();
const onSubmit = () =>{
  getEduClient().createStudent({
    name: formData.name,
    id: props.editData?.id,
    sex: formData.sex,
    card: formData.card,
    classId: formData.classId
    }
  ).then(res => {
    console.log(res)
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

const sexList = ref([
  {label: '男', value: 1},
  {label: '女', value: 2},
])
</script>

<template>
  <el-form :model="formData">
    <el-form-item label="名字" prop="name">
      <el-input v-model="formData.name"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-select v-model="formData.sex" placeholder="请选择性别">
        <el-option
          v-for="item in sexList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="身份证" prop="card">
      <el-input v-model="formData.card"></el-input>
    </el-form-item>
    <el-form-item label="班级" prop="class">
      <el-select v-model="formData.classId" placeholder="请选择班级">
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
