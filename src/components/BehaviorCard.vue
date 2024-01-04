<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps({
  name: String,
  behavior1: String,
  behavior2: String,
  behavior3: String,
  behavior1Num: Number,
  behavior2Num: Number,
  behavior3Num: Number
})
const name = computed(() => props.name)
const behavior1 = computed(() => `${props.behavior1}(${props.behavior1Num})`)
const behavior2 = computed(() => `${props.behavior2}(${props.behavior2Num})`)
const behavior3 = computed(() => `${props.behavior3}(${props.behavior3Num})`)
</script>

<template>
  <div class="student_card">
    <span class="name">{{name}}</span>
    <div class="behavior">
      <div class="behavior_item">
        {{behavior1}}
      </div>
      <div class="behavior_item">
        {{behavior2}}
      </div>
      <div class="behavior_item">
       {{behavior3}}
      </div>
    </div>
  </div>

</template>

<style scoped lang="less">
.student_card{
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
    width: 25%;
  }
  .behavior{
    width: 75%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .behavior_item{
      width: 25%;
    }
  }
  &:hover {
    background: rgba(134, 224, 242, 0.15);
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.07);
    border-radius: 4px;
    border: 1px solid #1BACC8;
  }
}
</style>
