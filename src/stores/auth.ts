import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref({
    id: 1,
    role_id: 1,
    name: 'John Doe',
    token: '123'
  });
  const isLogin = computed(() => !!user.value.token);
  const resetUser = () => {
    user.value = {
      id: 0,
      role_id: 0,
      name: '',
      token: ''
    }
  }
  const setUser = (newUser: any) => {
    user.value = newUser
  }
  
  return { user, isLogin, resetUser, setUser}
}, {persist: true})
