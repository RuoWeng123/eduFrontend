<script setup lang="ts">
import { reactive } from 'vue'
import { getEduClient } from '@/api/eduApi'
const props = defineProps({
  editData: Object,
});
const formData = reactive({
  name: props.editData?.name || '',
})

const emit = defineEmits<
  {
    handleClose: []
  }>();
const onSubmit = () =>{
  getEduClient().createCollege({name: formData.name, id: props.editData?.id}).then(res => {
    console.log(res)
    if(res.id){
      emit('handleClose')
    }
  });
}
</script>

<template>
  <el-form :model="formData">
    <el-form-item label="学院名称" prop="name">
      <el-input v-model="formData.name"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>
