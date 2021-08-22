<template>
  <div class="left" >
    <input class="input" type="text" placeholder="Filter users"
        v-bind:value="searchString"
        v-on:input="filterUsers"
    >
    <div v-if="!users.length">
      Users are loading...
    </div>
    <div v-if="serverError">
      Connection problem...
    </div>
    <user-list
        v-else-if="users.length && selectedUsers.length"
        v-bind:users="selectedUsers"
        v-on:selectUser="showUserDetail"
        v-on:getMoreUsers="fetchUsers"
    />
    <div v-else>
      No users found
    </div>
    <div class="status">
      <loading-spinner v-if="fetchingNow" />
      <button v-else class="btn" @click="fetchUsers">
        Get users
      </button>
    </div>
  </div>
  <div class="right">
    <user-detail
        v-bind:user="selectedUser"
        v-if="selectedUser"
        :close-detail="() => this.selectedUser=null"
    />
    <div class="right-none" v-else>
      Click user in left panel
    </div>
  </div>
</template>

<script lang="ts">
import userList from './components/usersList.vue'
import userDetail from './components/userDetail.vue'
import loadingSpinner from './components/loadingSpinner.vue'

import { defineComponent } from 'vue';
import UserType from '@/types/user';

export default defineComponent({
  name: 'App',
  components:{ userList, userDetail, loadingSpinner },
  data(){
    return{
      users: [] as UserType[],
      searchString: '' as string,
      selectedUser: null as UserType | null,
      fetchingNow: false,
      serverError: false,
    }
  },
  computed:{
    selectedUsers(): UserType[] {
      if (!this.searchString) {
        return this.users
      }
      return this.users.filter(
          (user)=>{
            return user.name.first.toLowerCase().includes(this.searchString.toLowerCase()) ||
                   user.name.last.toLowerCase().includes(this.searchString.toLowerCase())
          }
      )
    },
  },
  created():void{
    this.fetchUsers()
  },
  mounted():void{
    if (localStorage.getItem('searchString')){
      this.searchString = localStorage.getItem('searchString') || ''
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
    },
    async fetchUsers(): Promise<any>{
      if (this.fetchingNow){
        return
      }
      this.fetchingNow = true

      return await fetch('https://randomuser.me/api/?results=25&inc=gender,name,email,picture,location,dob,phone')
        .then(res=>{
          if (!res.ok) {
            return Promise.reject(res.status)
          }
          return res.json()})
        .then((json: {results: Array<UserType> })=>{
          const users: UserType[]  = json.results;
          this.users.push(...users);
        })
        .then(()=>{
          this.serverError = false
        })
        .catch((e)=>{
          this.serverError = true
          console.error(e)
        })
        .finally(() => {
          this.fetchingNow = false
        })
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
  font-style: normal;
  font-weight: 400;
}
@font-face {
  font-family: "Poppins";
  src: local("Poppins"),
        url("./fonts/Poppins-SemiBold.ttf") format("truetype");
  font-style: normal;
  font-weight: 600;

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
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.right{
  flex: 67%;
  display: flex;
}
.right > div:first-child {
  margin: auto;
}
@media screen and (max-width: 800px) {
  .right-none{
    display: none;
  }
  .right{
    flex: 0;
  }
}
.btn{
  margin: 20px auto;
  padding: 10px 25px;
  font-weight: 600;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  border: 2px solid rgb(0, 0, 0);
  z-index: 1;
  color: black;
}
.btn:after {
  position: absolute;
  content: "";
  width: 100%;
  height: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  background: black;
  transition: all 0.3s ease;
}
.btn:hover {
  color:rgb(80, 180, 180);
}
.btn:hover:after {
  top: 0;
  height: 100%;
}
.btn:active {
  top: 2px;
}
.status{
  min-height: 80px;
  display: flex;
  margin-bottom: 0;
}
</style>