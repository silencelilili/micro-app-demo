import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import microApp from "@micro-zoe/micro-app";

microApp.start({
  disableScopecss: false, // 禁止样式隔离
  iframe: true, // 开启iframe沙箱
  "disable-memory-router": false, // 关闭虚拟路由系统
  "keep-router-state": true, // 保留路由状态
  "disable-patch-request": true, // 关闭子应用请求的自动补全功能
  "router-mode": "native-scope", // native: 主应用和子应用同时基于浏览器路由进行渲染，共用同一套location和history

  plugins: {
    modules: {
      "appname-vite": [
        {
          loader(code) {
            if (process.env.NODE_ENV === "development") {
              // 这里 /basename/ 需要和子应用vite.config.js中base的配置保持一致
              code = code.replace(
                /(from|import)(\s*['"])(\/child\/vite\/)/g,
                (all) => {
                  return all.replace(
                    "/child/vite/",
                    "http://localhost:4007/child/vite/"
                  );
                }
              );
            }

            return code;
          },
        },
      ],
    },
  },
});

const app = createApp(App);

app.use(router).mount("#app");
