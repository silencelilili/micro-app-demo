<template>
  <div id="pdf-container">
    <div id="canvas-container" ref="canvasRef"></div>
  </div>
</template>
<script lang="ts" setup>
import { GlobalWorkerOptions, getDocument, version } from "pdfjs-dist";
import { ref } from "vue";
const canvasRef = ref<HTMLCanvasElement | null>(null);
const PDFMJS = `https://cdn.jsdelivr.net/npm/pdfjs-dist@4.5.136`;
async function loadPdf(url: string) {
  //* 加载 PDF 文档
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      console.log("blob", blob);
      return fileToBase64(blob);
    })
    .then(async (data) => {
      GlobalWorkerOptions.workerSrc = PDFMJS + "/build/pdf.worker.mjs";
      const loadingTask = getDocument({
        data,
        cMapUrl: PDFMJS + "/cmaps/",
        cMapPacked: true,
      });
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages; // 获取PDF文档的总页数
      //* 禁用字体文件的工作线程加载

      // 渲染全部页
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum); // 获取每一页的对象
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const viewport = page.getViewport({ scale: 2 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext: any = {
          canvasContext: ctx,
          viewport: viewport,
          // useWorkerFetch: true,
          // useRequestAnimationFrame: true,
        };
        await page.render(renderContext);
        canvasRef.value.appendChild(canvas);
      }
    });
}
function fileToBase64(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const result = reader.result;
      resolve(result);
    };
    reader.onerror = reject;
  });
}
setTimeout(() => {
  const fileUrl =
    "https://file.wygsy.com/tct/1648264233166112282/wygtech-signature/1632644885165183894/20240929/%E8%81%94%E5%90%88%E4%BD%93%E5%8D%8F%E8%AE%AE_1727578604860.pdf"; // data?.signedUrl || data?.originUrl;
  loadPdf(fileUrl);
}, 1000);

console.log("pdf version:::::", version);
</script>
<style lang="less" scoped></style>
