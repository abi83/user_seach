<template>
  <div class='users' ref='scrollComponent'>
    <user-card
        v-for="user in users" :key="user.id"
        v-bind:user="user"
        @click="$emit('selectUser', user)"
    />
  </div>
  <loading-spinner v-if="fetchingNew"/>
</template>

<script>
import userCard from './userCard'
import loadingSpinner from './loadingSpinner'

export default {
  emits:['selectUser', 'getMoreUsers'],
  data(){
    return{
      fetchingNew: false,
      justFetched: false
    }
  },
  components:{
    userCard, loadingSpinner
  },
  props: {
    users:{
      type: Array,
      required: true
    }
  },
  mounted(){
    const userList = document.querySelector('.users')
    userList.addEventListener("scroll", this.handleScroll)
  },
  methods:{
    handleScroll(){
    let element = this.$refs.scrollComponent
    if (
        !this.fetchingNew &&
        !this.justFetched &&
        element.scrollHeight - element.scrollTop === element.clientHeight) {
      this.fetchingNew = true
      console.log('Fetching called')
      this.$emit('getMoreUsers')
          .then(()=>{
            this.fetchingNew = false
            this.justFetched = true
            console.log('fetching false, just true')
            return new Promise(resolve => setTimeout(resolve, 1500))
          })
          .then(()=>{
            this.justFetched=false
            console.log('Can fetch again')
          })
    }
    // if (element.getBoundingClientRect().bottom < element.innerHeight) {
    //     console.log('DONE')
    //   } else {
    //   console.log('Scrolling',
    //       // element.getBoundingClientRect().bottom,
    //       // element.scrollTop,
    //       // element.scrollHeight,
    //       // element.clientHeight,
    //       element.scrollHeight - element.scrollTop === element.clientHeight,
    //   )
    //   }
    }
  },
  unmounted(){
    const userList = document.querySelector('.users')
    userList.removeEventListener("scroll", this.handleScroll)
    console.log('Unmounted')
  },
}
</script>

<style scoped>
.users{
  overflow-y: scroll;
  overflow-x: auto;
}
</style>