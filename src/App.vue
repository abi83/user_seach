<template>
  <div>
    Left block
    <input type="text" v-model="searchString" v-on:input="filterUsers">
    {{ selectedUsers.map(u=>u.name) }}
  </div>
  <div>Detailed</div>
</template>

<script>
export default {
  data() {
    return{
      users:[{name: 'user1'}, {name: 'user2'}],
      selectedUsers: [],
      searchString:''
    }
  },
  methods:{
    filterUsers(){
      console.log('filter', this.searchString)
      this.selectedUsers = this.users.filter(user=>user.name.includes(this.searchString))
    }
  }
}

</script>

<style>

</style>