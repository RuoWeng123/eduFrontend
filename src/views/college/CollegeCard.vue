<script setup lang="ts">
import { computed } from 'vue'
import { Delete } from '@element-plus/icons-vue'

const props = defineProps({
  id: Number,
  name: String,
  classNum: Number,
})
const id = computed(() => props.id)
const name = computed(() => props.name)
const classNum = computed(() => props.classNum)

const emit = defineEmits<{
  onAction:[value: string]
}>()
const handleAction = (type: string) =>{
 emit('onAction', type)
}
</script>

<template>
  <div class="class_card">
    <span class="name">{{name}}</span>
    <span class="class_num">{{classNum}}</span>
    <span class="action">
      <el-tooltip placement="top" content="编辑">
        <el-icon @click="handleAction('edit')"><Edit /></el-icon>
      </el-tooltip>
      <el-tooltip placement="top" content="删除">
        <el-icon class="ml24" @click="handleAction('delete')"><Delete /></el-icon>
      </el-tooltip>
    </span>
  </div>
</template>

<style scoped lang="less">
.class_card{
  width: 100%;
  position: relative;
  background: #FFFFFF;
  border: 1px solid #FFFFFF;
  box-shadow: 0.5px 1px 4px 0.5px #D9D9D9;
  padding: 13px 32px 13px 32px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  .name{
    width: 30%;
  }
  .class_num{
    width: 20%;
  }
  .action{
    width: 50%;
  }

  &:hover {
    background: rgba(134, 224, 242, 0.15);
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.07);
    border-radius: 4px;
    border: 1px solid #1BACC8;
  }
}
</style>
