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
    const usersList = this.$refs.scrollComponent as HTMLElement
    usersList.addEventListener("scroll", this.handleScroll)
  },
  beforeUnmount():void{
    const usersList = this.$refs.scrollComponent as HTMLElement
    usersList.removeEventListener("scroll", this.handleScroll)
  },
  methods:{
    handleScroll():void{
      const usersList = this.$refs.scrollComponent as HTMLElement
      if (usersList.scrollHeight - usersList.scrollTop === usersList.clientHeight) {
        this.$emit('getMoreUsers')
      }
    }
  },
})
</script>

<style scoped>
.users{
  height: 83vh;
  overflow-y: auto;
  /*overflow-x: auto;*/
}
</style>