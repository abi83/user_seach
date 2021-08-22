<template>
  <div class="detail-wrapper">
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
          Location: {{ user.location.country }}
        </p>
        <p>
          Address: {{ user.location.street.name }},
          {{user.location.street.number}}. {{user.location.postcode}} {{ user.location.city}}
        </p>
        <p>
          Date of birth: {{ dateOfBirth.toDateString() }}
        </p>
        <div  >
          Contacts:
          <p>
            email: {{user.email}}
          </p>
          <p>
            phone: {{user.phone}}
          </p>
        </div>
      </div>
      <button class="btn" @click="closeDetail()">Close</button>
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
    },
    closeDetail: {
     type: Function,
     required: true
    }
  },
  computed:{
    userName: function ():string {
     return fullName(this.user)
    },
    dateOfBirth: function (): Date{
      console.log('Date reformatting')
      return new Date(this.user.dob.date)
    }
  }
})
</script>

<style scoped>
.detail{
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
@media screen and (max-width: 800px) {
  .detail-wrapper{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, .2);

    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.picture-large{
  border-radius: 50%;
  width: 200px;
  height: 200px;
}
.intro{
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
}
.main-text{
  margin: auto;
  padding-left: 25px;
}
.h2{
  position:relative;
  margin-bottom: 50px;
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