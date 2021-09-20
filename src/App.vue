<template>
    <div id="app">
      <span class="load-msg" id="load-msg"></span>
      <router-view/>
    </div>
</template>

<script>
export default {

};
</script>

<style>
.load-msg{
  position: fixed;
  left:50%;
  top:50%;
  z-index: 1;
  font-size:40px;
  color:#666;
  transform: translate3D(-50%,-50%,0);
}
</style>
