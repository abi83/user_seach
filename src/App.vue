<template>
  <div class="left" >
    <div class="form">
      <input class="input" type="text" id="search" placeholder="Filter users"
          v-bind:value="searchString"
          v-on:input="filterUsers"
      >
      <label for="search">Filter users</label>
      <div>
        <input type="checkbox" id="male" name="sex" value="male" checked>
        <label for="male">Male</label>
        <input type="checkbox" id="female" name="sex" value="female" checked>
        <label for="female">Female</label>
      </div>
    </div>
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
    const sessionStoredUsers = sessionStorage.getItem('users') || ''
    if (sessionStoredUsers){
      this.users = JSON.parse(sessionStoredUsers)
      this.selectedUser = JSON.parse(sessionStorage.getItem('selectedUser') || '')
    } else {
      this.fetchUsers()
    }
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
        .then(()=>{
          sessionStorage.setItem('users', JSON.stringify(this.users))
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
      sessionStorage.setItem('selectedUser', JSON.stringify(user))
    },
  }
})

</script>

<style>
.input{
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
.status{
  min-height: 80px;
  display: flex;
  margin-bottom: 0;
  height: 7vh;
}
</style>