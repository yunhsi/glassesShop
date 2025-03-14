<script setup>
import { useHead } from '@vueuse/head';
import { ref } from 'vue';
import Breadcrumb from '@/components/Breadcrumb.vue';

const items = ref([{ label: '購物說明' }]);
useHead({
  title: '購物說明｜!WEAR'
});
</script>

<template>
  <main style="padding-top: 73px; min-height: calc(100vh - 104px)">
    <div class="container py-5">
      <Breadcrumb :items="items" />
      <div class="row justify-content-center pt-4">
        <div class="col-12 col-lg-9">
          <VAccordion value="0">
            <VAccordionPanel value="0">
              <VAccordionHeader>付款方式說明</VAccordionHeader>
              <VAccordionContent>
                <ol>
                  <li>目前提供銀行轉帳、信用卡線上支付、7-11超商取貨付款、全家超商取貨付款。</li>
                  <li>如有其他需求請來信詢問（FB / IG / LINE）</li>
                </ol>
              </VAccordionContent>
            </VAccordionPanel>
            <VAccordionPanel value="1">
              <VAccordionHeader>寄送方式說明</VAccordionHeader>
              <VAccordionContent>
                <ol>
                  <li>目前提供國內郵寄宅配、7-11超商取貨、全家超商取貨。</li>
                  <li>
                    除特殊情況，每週二、五、六 17:00前為訂單出貨時間。郵寄週六、週日無法出貨。
                  </li>
                  <li>運送時間：在「一般情況」為寄出日後2~3日送達。</li>
                  <li>如有其他需求請來信詢問（FB / IG / LINE）</li>
                </ol>
              </VAccordionContent>
            </VAccordionPanel>
            <VAccordionPanel value="2">
              <VAccordionHeader>訂單相關說明</VAccordionHeader>
              <VAccordionContent>
                <ol>
                  <li>訂單收件人姓名、電話、地址可以查詢訂單狀態。</li>
                  <li>如有其他需求請來信詢問（FB / IG / LINE）</li>
                </ol>
              </VAccordionContent>
            </VAccordionPanel>
            <VAccordionPanel value="3">
              <VAccordionHeader>售後服務說明</VAccordionHeader>
              <VAccordionContent>
                <p>
                  非常感謝您購買我們的商品：）
                  <br />
                  為了提供顧客更好的線上購物經驗，依據消保法之「七天鑑賞期」，我們提供以下售後服務。
                </p>
                <h6>一、商品到貨七日內如有以下情況，可無條件退換貨：</h6>
                <ol>
                  <li>品項、數量與訂購不符。</li>
                  <li>運送破損。</li>
                  <li>商品瑕疵。</li>
                </ol>
                <h6>二、以下情況恕不提供退換貨服務：</h6>
                <ol>
                  <li>品項、數量與訂購不符。</li>
                  <li>到貨超過七日。</li>
                  <li>商品經過拆封使用。</li>
                </ol>
                <h6>三、其他退換貨說明：</h6>
                <ol>
                  <li>如有以上需要退換貨的情況，請來信（FB / IG / LINE）告知，我們將協助處理。</li>
                  <li>如因商品的顏色、尺寸等等其他因素需要換貨，須酌收換貨所產生的運費。</li>
                </ol>
              </VAccordionContent>
            </VAccordionPanel>
          </VAccordion>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
