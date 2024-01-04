<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getEduClient } from '@/api/eduApi'
import BehaviorCard from '@/components/BehaviorCard.vue'

const props = defineProps({
  classId: Number,
})
const classId = computed(() => props.classId)
const studentsBehavior = ref([
  {name: '---', behavior1: '举手', behavior2: '睡觉', behavior3: '玩手机', behavior1Num: 1, behavior2Num: 2, behavior3Num: 3},
])
const getStudentsBehaviorByClassId = async (classId: number) => {
  const res = await getEduClient().getStudentsBehaviorByClassId(classId)
  console.log(res)
  studentsBehavior.value = res
}
onMounted(() => {
  classId.value && getStudentsBehaviorByClassId(classId.value)
})
</script>

<template>
<BehaviorCard v-for="item in studentsBehavior" :key="item.name" :name="item.name" :behavior1="item.behavior1" :behavior2="item.behavior2" :behavior3="item.behavior3" :behavior1Num="item.behavior1Num" :behavior2Num="item.behavior2Num" :behavior3Num="item.behavior3Num"></BehaviorCard>
</template>

<style scoped>

</style>
