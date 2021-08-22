<template>
  <li class="user-card">
    <img class="user-picture-small" :src="user.picture.thumbnail" :alt="userName">
    <div class="user-text">
      <div class="name">
        {{ userName }}
      </div>
      <div class="email">
        {{ user.email }}
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import UserType from '@/types/user'
import {defineComponent, PropType} from "vue";

export default defineComponent({
  props: {
    user:{
      type: Object as PropType<UserType>,
      required: true
    }
  },
  computed: {
    userName():string {return this.user.name.first + ' ' + this.user.name.last},
  }
})
</script>

<style scoped>
.user-card{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin:20px 10px;
  cursor: pointer;
}
.user-picture-small{
  border-radius: 50%;
  width: 56px;
  height: 56px;
}
.user-text{
  padding-left: 20px;
  margin: auto 0 auto 0;
}
.name{
  font-size: 1.2em;
}
.email{
  font-size: 0.7em;
}
</style>