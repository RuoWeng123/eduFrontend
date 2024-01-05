<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'
import EditCollegeComponent from '@/views/college/EditCollegeComponent.vue'

const props = defineProps({
  isVisible: Boolean,
  type: String,
  isEdit: Boolean,
  editData: Object,
  close: Function
})
const emit = defineEmits([ 'close' ])
const visible = computed(() =>props.isVisible)
const getTile = ()=>{
  const prefix = props.isEdit ? '编辑' : '创建'
  let strTitle = '';
  switch (props.type){
    case 'class':
      strTitle = `${prefix}班级`
      break;
    case 'teacher':
      strTitle = `${prefix}老师`
      break;
    case 'student':
      strTitle = `${prefix}学生`
      break;
    case 'college':
      strTitle = `${prefix}学院`
      break;
  }
  return strTitle
}
const type = computed(() =>props.type)
const onClose = () =>{
  emit('close')
}
</script>

<template>
  <el-drawer
    v-model="visible"
    :title="getTile()"
    :close-on-click-modal="false"
    :close-on-press-escape="true"
    @close="onClose">
    <div class="modal_content">
      <editCollegeComponent v-if="type === 'college'" :edit-data="props.editData" @handleClose="onClose"></editCollegeComponent>
    </div>
  </el-drawer>
</template>

<style scoped>

</style>
