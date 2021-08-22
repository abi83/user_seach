<template>
  <div class="left" >
    <input class="input" type="text" placeholder="Filter users"
        v-bind:value="searchString"
        v-on:input="filterUsers"
    >
    <user-list
        v-if="selectedUsers.length"
        v-bind:users="selectedUsers"
        v-on:selectUser="showUserDetail"
        v-on:getMoreUsers="fetchUsers"
    />
    <div v-else>
      <div>Users are loading</div>
    </div>
    <div class="status">
      <loading-spinner v-if="fetchingNew" />
      <button v-else class="btn" @click="fetchUsers">
        Get users
      </button>
    </div>
  </div>
  <div class="right">
    <user-detail v-bind:user="selectedUser" v-if="selectedUser"/>
    <div v-else>
      Click user in left panel
    </div>
  </div>
</template>

<script lang="ts">
import userList from './components/usersList.vue'
import userDetail from './components/userDetail.vue'
import loadingSpinner from './components/loadingSpinner.vue'

import { defineComponent, PropType } from 'vue';
import UserType from './types/user.ts'


export default defineComponent({
  name: 'App',
  components:{
    userList, userDetail, loadingSpinner
  },
  data(){
    return{
      users: [] as Array as PropType<UserType[]>,
      selectedUsers: [] as Array as PropType<UserType[]>,
      searchString: '' as string | null,
      selectedUser: null as UserType | null,
      fetchingNew: false,
      justFetched: false
    }
  },
  created():void{
    this.fetchUsers()
    this.selectedUsers = this.users
  },
  mounted():void{
    if (localStorage.getItem('searchString')){
      this.searchString = localStorage.getItem('searchString')
    }
  },
  watch: {
    searchString(newValue):void{
      localStorage.setItem('searchString', newValue)
    }
  },
  methods:{
    filterUsers(event: Event):void{
      const input = event.target as HTMLTextAreaElement;
      this.searchString = input.value
      this.selectedUsers = this.users.filter(
          (user:UserType)=>user.name.first.includes(this.searchString)
      )
    },
    async fetchUsers():Promise|void{
      if (this.justFetched || this.fetchingNew){
        return
      }
      this.fetchingNew = true

      return await fetch('https://randomuser.me/api/?results=25&inc=gender,name,email,picture,location,dob,phone')
        .then(res=>res.json())
        .then((json: {results: Array<UserType> })=>{
          const users: UserType[]  = json.results;
          this.users.push(...users);
          return new Promise(resolve => setTimeout(resolve, 1000))
        })
        .then(()=>{
          this.fetchingNew = false
          this.justFetched = true
          return new Promise(resolve => setTimeout(resolve, 300))
        })
        .then(()=>{
          this.justFetched=false
        })
        .catch(e=>console.error(e))
    },
    showUserDetail(user: UserType):void{
      this.selectedUser = user
    },
  }
})

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
  max-height: 100vh;
  display: flex;
  flex-direction: column;
}
.right{
  flex: 67%;
  padding: 100px;
}
.btn{
  padding: 10px 30px;
  margin: 20px auto;
}
.status{
  min-height: 84px;
  display: flex;
}

</style>