<template>
  <div>
    <micro-app
      name="appname-oa"
      :url="url"
      baseroute="/main-vite/app-oa"
      :data="microAppData"
      @created="handleCreate"
      @beforemount="handleBeforeMount"
      @mounted="handleMount"
      @unmount="handleUnmount"
      @error="handleError"
      @datachange="handleDataChange"
    ></micro-app>
  </div>
</template>

<script lang="ts">
import config from "../config";

export default {
  name: "oa",
  data() {
    return {
      url: `${config.oa}/child/oa/`,
      microAppData: { msg: "来自基座的数据" },
    };
  },
  methods: {
    handleCreate(): void {
      console.log("child-oa 创建了");
    },

    handleBeforeMount(): void {
      console.log("child-oa 即将被渲染");
    },

    handleMount(): void {
      console.log("child-oa 已经渲染完成");

      setTimeout(() => {
        // @ts-ignore
        this.microAppData = { msg: "来自基座的新数据" };
      }, 2000);
    },

    handleUnmount(): void {
      console.log("child-oa 卸载了");
    },

    handleError(): void {
      console.log("child-oa 加载出错了");
    },

    handleDataChange(e: CustomEvent): void {
      console.log("来自子应用 child-oa 的数据:", e.detail.data);
    },
  },
};
</script>

<style></style>
