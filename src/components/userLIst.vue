<template>
  <div class="users">
    <template v-for="user in users" :key="user.id">
      <user-card v-bind:user="user"/>
    </template>
  </div>
</template>

<script>
import userCard from './userCard'

export default {
  components:{
    userCard
  },
  props: {
    users:{
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.users{
  overflow-y: scroll;
  overflow-x: auto;
}
</style>