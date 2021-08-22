<template>
  <li class="card">
    <img class="picture-small" :src="user.picture.thumbnail" :alt="userName">
    <div class="intro">
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
import {shortFullName} from "@/utils/common";

export default defineComponent({
  props: {
    user:{
      type: Object as PropType<UserType>,
      required: true
    }
  },
  computed: {
    userName: function ():string {
     return shortFullName(this.user)
    }
  }
})
</script>

<style scoped>
.card{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin:20px 10px;
  cursor: pointer;
}
.picture-small{
  border-radius: 50%;
  width: 56px;
  height: 56px;
}
.intro{
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