<template>
  <div className="user-card">
    <img className="user-picture-small" :src="user.picture.thumbnail" :alt="userName">
    <div className="user-text">
      <div className="name">
        {{ userName }}
      </div>
      <div className="email">
        {{ user.email }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    userName() {
      return this.user.name.first + ' ' + this.user.name.last
    }
  }
}
</script>

<style scoped>
.user-card {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 20px 10px;
  cursor: pointer;
}

.user-picture-small {
  border-radius: 50%;
  width: 56px;
  height: 56px;
}

.user-text {
  padding-left: 20px;
  margin: auto 0 auto 0;
}

.name {
  font-size: 1.2em;
}

.email {
  font-size: 0.7em;
}
</style>