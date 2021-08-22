<template>
  <div class="users" v-for="user in users" :key="user.id">
    <user-card v-bind:user="user"/>
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
  padding: 5px;
  border: 2px solid blue;
}
</style>