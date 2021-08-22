<template>
  <div class="left" >
    <input class="input" type="text" placeholder="Filter users"
        v-bind:value="searchString"
        v-on:input="filterUsers"
    >
    <div v-if="!users.length">
      Users are loading...
    </div>
    <dif v-if="serverError">
      Connection problem...
    </dif>
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
  <!--  TODO: make popup with styles-->
  <div class="right" v-if="!mobile">
    <user-detail v-bind:user="selectedUser" v-if="selectedUser"/>
    <div v-else>
      Click user in left panel
    </div>
  </div>
  <Popup
      v-if="mobile && selectedUser"
      :close-popup="() => this.selectedUser=null"
  >
    <user-detail v-bind:user="selectedUser" />
  </Popup>
</template>

<script lang="ts">
import userList from './components/usersList.vue'
import userDetail from './components/userDetail.vue'
import loadingSpinner from './components/loadingSpinner.vue'

import { defineComponent,
  // PropType,
  ref } from 'vue';
import UserType from '@/types/user';
import Popup from "@/components/Popup.vue";

export default defineComponent({
  name: 'App',
  components:{
    userList, userDetail, loadingSpinner, Popup
  },
  data(){
    return{
      users: [] as UserType[],
      searchString: '' as string,
      selectedUser: null as UserType | null,
      fetchingNow: false,
      serverError: false,
      windowWidth: ref(window.innerWidth),
      popup: false
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
    mobile: function (): boolean{
      return this.windowWidth < 800
    }
  },
  created():void{
    this.fetchUsers()
  },
  mounted():void{
    if (localStorage.getItem('searchString')){
      this.searchString = localStorage.getItem('searchString') || ''
    }
    window.addEventListener('resize', this.onWidthChange)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onWidthChange)
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
    onWidthChange(){
      this.windowWidth = window.innerWidth
    }
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
.btn{
  padding: 10px 30px;
  margin: 20px auto;
}
.status{
  min-height: 84px;
  display: flex;
  margin-bottom: 0;
}
</style>