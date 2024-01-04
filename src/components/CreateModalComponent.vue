<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  isVisible: Boolean,
  type: String,
  isEdit: Boolean,
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
  }
  return strTitle
}
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
      这里是form 表单
    </div>
  </el-drawer>
</template>

<style scoped>

</style>
