<template>
  <div class="detail">
    <div class="intro">
      <img class="picture-large" :src="user.picture.large" :alt="userName">
      <div class="main-text">
        <div class="h2">
          <h2>
            {{ userName }}
          </h2>
        </div>
        <p>
          {{ user.gender }}, {{ user.dob.age }}
        </p>
      </div>
    </div>
    <div class="info">
      <p>
        Location: {{ user.location}}
      </p>
      <p>
        Date of birth: {{ user.dob.date }}
      </p>
      <p>
        Contacts:
        email:{{user.email}}
        phone: {{user.phone}}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import UserType from '@/types/user'
import {fullName} from "@/utils/common";
import {defineComponent, PropType} from "vue";
export default defineComponent({
  props: {
    user:{
      type: Object as PropType<UserType>,
      required: true
    }
  },
  computed:{
    userName: function ():string {
     return fullName(this.user)
    }
  }
})
</script>

<style scoped>
.detail{
  padding: 50px;
  display: flex;
  flex-direction: column;
}
/*.user-name{*/
/*  background-color: red;*/
/*  text-shadow: gray;*/
/*}*/
.picture-large{
  border-radius: 50%;
  width: 200px;
  height: 200px;
}
.intro{
  display: flex;
  flex-direction: row;
}
.main-text{
  margin: auto;
}
.h2{
  position:relative;
  margin-bottom: 20px;
}
.h2:after  {
  content: "";
  display: inline-block;
  position: absolute;
  height: 2px;
  width: 100px;
  background:rgb(81, 227, 213);
  top: 130%;
  margin: 0 auto;
  left: 0;
  right: 0;
}
</style>