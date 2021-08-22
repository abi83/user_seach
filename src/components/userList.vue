<template>
  <ul class='users' ref='scrollComponent'>
    <user-card
        v-for="user in users" :key="user.id"
        v-bind:user="user"
        @click="$emit('selectUser', user)"
    />
  </ul>
</template>

<script lang="ts">
import userCard from './userCard.vue'
import UserType from '@/types/user'
import { defineComponent, PropType} from 'vue'


export default defineComponent({
  emits:['selectUser', 'getMoreUsers'],
  components:{userCard,},
  props: {
    users: {
      required: true,
      type: Array as PropType<UserType[]>,
    }
  },
  mounted():void{
    const userList = this.$refs.scrollComponent as HTMLElement
    userList.addEventListener("scroll", this.handleScroll)
  },
  beforeUnmount():void{
    const userList = this.$refs.scrollComponent as HTMLElement
    userList.removeEventListener("scroll", this.handleScroll)
  },
  methods:{
    handleScroll():void{
      const userList = this.$refs.scrollComponent as HTMLElement
      if (userList.scrollHeight - userList.scrollTop === userList.clientHeight) {
        this.$emit('getMoreUsers')
      }
    }
  },
})
</script>

<style scoped>
.users{
  overflow-y: scroll;
  overflow-x: auto;
}
</style>