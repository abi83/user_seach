<template>
  <div class="popup">
    <div class="popup-inner">
      <slot />
      <button class="btn" @click="closePopup()">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['closePopup']
}
</script>

<style scoped>
.popup{
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
.popup-inner{
  background-color: white;
  display: flex;
  flex-direction: column;
}
</style>