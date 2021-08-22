<template>
  <div class="left">
    <input class="input" type="text" placeholder="Filter users"
        v-bind:value="searchString"
        v-on:input="filterUsers"
    >
    <template v-if="selectedUsers.length">
      <user-list v-bind:users="selectedUsers" />
    </template>
    <template v-else-if="users.length">
      <user-list v-bind:users="users" />
    </template>
    <template v-else>
      <div>Users are loading</div>
    </template>
    <button @click="fetchUsers">Get users</button>
  </div>
  <div class="right">Detailed</div>
</template>

<script>
import userList from './components/usersList'
export default {
  components:{
    userList
  },
  data() {
    return{
      users:[],
      selectedUsers: [],
      searchString:''
    }
  },
  methods:{
    filterUsers(event){
      this.searchString = event.target.value
      this.selectedUsers = this.users.filter(user=>user.name.first.includes(this.searchString))
    },
    async fetchUsers(){
      const users = await fetch('https://randomuser.me/api/?results=25&inc=gender,name,email,picture')
        .then(res=>res.json())
        .catch(e=>console.error(e))
      this.users = users.results;
    }
  }
}

</script>

<style>
#app{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  max-width: 1076px;
  margin: auto;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.input{
  border: 1px solid black;
  /*min-width: 100px;*/
  padding: 10px;
  margin: 10px;
}
.left{
  flex: 33%;
  border: 1px solid red;
}
.right{
  flex: 67%;
  border: 1px solid green;
}

</style>