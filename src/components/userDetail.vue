<template>
  <div class="user-detail">
    {{ userName }}
    {{ user }}
  </div>
</template>

<script>
import {UserType} from '@/types/user'
export default {
  props: {
    user:{
      type: UserType,
      required: true
    }
  },
  computed:{
    userName() {return this.user.name.first + ' ' + this.user.name.last}
  }
}
</script>

<style scoped>
.user-detail{
  padding: 100px;
}
</style>