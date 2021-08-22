<template>
  <div>
    {{user.name.first + ' ' +user.name.last}}
  </div>
</template>

<script>
export default {
  props: {
    user:{
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>