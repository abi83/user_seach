<template>
  <div class="left">
    <input class="input" type="text" placeholder="Filter users"
        v-bind:value="searchString"
        v-on:input="filterUsers"
    >
    <template class="users-list" v-if="selectedUsers.length">
      <user-list v-bind:users="selectedUsers" />
    </template>
    <template class="users-list" v-else-if="users.length">
      <user-list v-bind:users="users" />
    </template>
    <div v-else>
      <div>Users are loading</div>
    </div>
    <button class="btn" @click="fetchUsers">Get users</button>
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
@font-face {
  font-family: "Poppins";
  src: local("Poppins"),
        url("./fonts/Poppins-Regular.ttf") format("truetype");
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", Helvetica, Arial, serif;
}
.input{
  border: 1px solid black;
  padding: 10px;
  margin: 30px 10px 30px 10px;
  width: calc(100% - 20px);
}
.left{
  flex: 33%;
  /*border: 1px solid red;*/
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  /*height: 100%;*/
}
.right{
  flex: 67%;
  /*border: 1px solid green;*/
}
.btn{
  padding: 10px 30px;
  margin: 20px auto;

}

</style>