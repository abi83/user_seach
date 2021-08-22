<template>
  <div class='users' ref='scrollComponent'>
    <user-card
        v-for="user in users" :key="user.id"
        v-bind:user="user"
        @click="$emit('selectUser', user)"
    />
  </div>
</template>

<script>
import userCard from './userCard'

export default {
  emits:['selectUser', 'getMoreUsers'],
  components:{userCard,},
  props: {
    users:{
      type: Array,
      required: true
    }
  },
  mounted(){
    const userList = this.$refs.scrollComponent
    userList.addEventListener("scroll", this.handleScroll)
  },
  unmounted(){
    const userList = this.$refs.scrollComponent
    userList.removeEventListener("scroll", this.handleScroll)
  },
  methods:{
    handleScroll(){
      const element = this.$refs.scrollComponent
      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        this.$emit('getMoreUsers')
      }
    }
  },
}
</script>

<style scoped>
.users{
  overflow-y: scroll;
  overflow-x: auto;
}
</style>