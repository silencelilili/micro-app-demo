<template>
  <div>
    <div id="public-links" @click="onRouteChange">
      <router-link to="/">Home</router-link> |
      <router-link to="/page2">Page2</router-link> |
      <a href="undefined">test</a> |
      <a-link type="text" @click="onClick">ALink标签</a-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
// 子应用内部跳转时，通知侧边栏改变菜单状态
const onRouteChange = () => {
  if (window.eventCenterForAppNameVite) {
    // 发送全局数据，通知侧边栏修改菜单展示
    window.eventCenterForAppNameVite.setGlobalData({ name: "child-vite" });
  }
};
const onClick = () => {
  console.log("点击了");
};
</script>

<style>
#vite-app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
