<template>
  <div class="left pl-2" >
    <div class="form">
      <div class="text-input-container">
        <input class="text-input" type="text" id="search" placeholder="Filter users" autocomplete="off"
            v-bind:value="searchString"
            v-on:input="filterUsers"
        >
        <label class="text-label" for="search">Filter users</label>
      </div>
      <div class="checkbox-input-container">
        <label class="custom-checkbox mb-0" for="male">
          Male
          <input type="checkbox" id="male" v-model="searchMale">
          <span class="checkmark"></span>
        </label>
        <label class="custom-checkbox" for="female">
          Female
          <input type="checkbox" id="female" v-model="searchFemale">
          <span class="checkmark"></span>
        </label>
      </div>
    </div>
    <div v-if="!users.length" class="ma">
      Users are loading...
    </div>
    <div v-if="serverError" class="ma">
      Connection problem...
    </div>
    <user-list
        v-else-if="users.length && selectedUsers.length"
        v-bind:users="selectedUsers"
        v-on:selectUser="showUserDetail"
        v-on:getMoreUsers="fetchUsers"
    />
    <div v-else class="ma">
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
    <div class="right-none ma" v-else>
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
      searchString: '',
      searchMale: true,
      searchFemale: true,
      selectedUser: null as UserType | null,
      fetchingNow: false,
      serverError: false,
    }
  },
  computed:{
    selectedUsers(): UserType[] {
      if (!this.searchString && this.searchFemale && this.searchMale) {
        return this.users
      }
      const genders = [this.searchMale && 'male', this.searchFemale && 'female']
      return this.users.filter(
        (user)=>{
          return (
            (
              user.name.first.toLowerCase().includes(this.searchString.toLowerCase()) ||
              user.name.last.toLowerCase().includes(this.searchString.toLowerCase())
            ) &&
            genders.includes(user.gender)
          )
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
    this.searchString = sessionStorage.getItem('searchString') || ''
    this.searchMale = JSON.parse(sessionStorage.getItem('searchMale') || 'true')
    this.searchFemale = JSON.parse(sessionStorage.getItem('searchFemale') || 'true')
  },
  watch: {
    searchString(newValue):void{
      sessionStorage.setItem('searchString', newValue)
    },
    searchMale(newValue):void{
      sessionStorage.setItem('searchMale', JSON.stringify(newValue))
    },
    searchFemale(newValue):void{
      sessionStorage.setItem('searchFemale', JSON.stringify(newValue))
    },
    selectedUser(newValue):void{
      sessionStorage.setItem('selectedUser', JSON.stringify(newValue))
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
    },
  }
})

</script>

<style>
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
  height: 7vh;
}
.form{
  display: flex;
  flex-direction: column;
  min-height: 150px;
}
.checkbox-input-container{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
}
</style>