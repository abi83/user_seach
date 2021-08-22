<template>
  <div class="user-detail">
    {{ userName }}
  </div>
</template>

<script>
export default {
  props: {
    user:{
      // type: Object,
      // required: true
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