<template>
  <div className="user-detail">
    {{ userName }}
    {{ user }}
  </div>
</template>

<script lang="ts">
import UserType from '@/types/user'
import {defineComponent, PropType} from "vue";

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<UserType>,
      required: true
    }
  },
  computed: {
    userName() {
      return this.user.name.first + ' ' + this.user.name.last
    }
  }
})
</script>

<style scoped>
.user-detail {
  padding: 100px;
}
</style>