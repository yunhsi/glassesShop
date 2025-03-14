<script setup>
import { ref, onMounted } from 'vue';
import { useHead } from '@vueuse/head';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import IndexTitle from '@/components/IndexTitle.vue';
import ProductCarousel from '@/components/ProductCarousel.vue';
import { useProductStore } from '@/pinia/useProductStore';

const productStore = useProductStore();

// 取得所有商品
onMounted(() => {
  getIndexProductLists();
});

const getIndexProductLists = async () => {
  // 取得所有商品
  await productStore.getAllProducts();
};

useHead({
  title: '日本眼鏡 墨鏡｜!WEAR'
});

const banners = [
  {
    imgPath: '/images/banner-1.jpg'
  },
  {
    imgPath: '/images/banner-2.jpg'
  },
  {
    imgPath: '/images/banner-3.jpg'
  }
];
</script>

<template>
  <!-- Banner -->
  <header>
    <swiper
      :modules="[Navigation, Autoplay, EffectFade]"
      :autoplay="{ delay: 2000, disableOnInteraction: false }"
      effect="fade"
      :speed="1000"
      loop
      :virtual-translate="true"
      class="banner-swiper"
    >
      <swiper-slide v-for="(banner, index) in banners" :key="index">
        <img :src="banner.imgPath" alt="Slide image" loading="lazy" />
      </swiper-slide>
    </swiper>
    <div class="mask" />
    <!-- scroll -->
    <div class="scroll">
      <small>SCROLL</small>
      <VIcon
        :icon="['fas', 'angle-down']"
        class="animate__animated animate__fadeInDown animate__infinite"
      />
    </div>
  </header>
  <!-- 熱門推薦 -->
  <section class="container py-5">
    <IndexTitle tw="熱門推薦" en="Recommendation" root-class="text-center" />
    <ProductCarousel :products="productStore.recommendationProducts" :isloop="true" />
    <div
      class="d-flex justify-content-end m-4"
      data-aos="fade-right"
      data-aos-anchor-placement="top-bottom"
      data-aos-duration="600"
    >
      <router-link to="/products?event=hot" prefetch>
        <VButton severity="danger" variant="outlined" class="hvr-icon-forward">
          View More
          <VIcon class="hvr-icon" :icon="['fas', 'circle-chevron-right']" />
        </VButton>
      </router-link>
    </div>
  </section>
  <hr />
  <!-- 優惠活動 -->
  <section class="container py-5">
    <IndexTitle tw="優惠活動" en="On Sale" root-class="text-center" />
    <ProductCarousel :products="productStore.saleProducts" :isloop="true" />
    <div
      class="d-flex justify-content-end m-4"
      data-aos="fade-right"
      data-aos-anchor-placement="top-bottom"
      data-aos-duration="600"
    >
      <router-link to="/products?event=onsale" prefetch>
        <VButton severity="danger" variant="outlined" class="hvr-icon-forward">
          View More
          <VIcon class="hvr-icon" :icon="['fas', 'circle-chevron-right']" />
        </VButton>
      </router-link>
    </div>
  </section>
  <!-- 框型簡介 -->
  <section class="py-5 type">
    <div class="container py-3">
      <div class="row align-items-center">
        <!-- 標題 -->
        <div class="col-lg-3 d-md-flex align-items-center justify-content-between d-lg-block">
          <IndexTitle tw="框型簡介" en="Types Of Frames" root-class="mobile-text-center" />
          <div
            class="d-flex justify-content-center justify-content-md-start me-md-2 mt-lg-4"
            data-aos="fade-right"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="600"
            data-aos-delay="100"
          >
            <router-link to="/products" prefetch>
              <VButton severity="danger" variant="outlined" class="hvr-icon-forward">
                View More
                <VIcon class="hvr-icon" :icon="['fas', 'circle-chevron-right']" />
              </VButton>
            </router-link>
          </div>
        </div>
        <!-- 框型 -->
        <div class="col-lg-9">
          <div class="row">
            <!-- 圓 -->
            <div class="col-6 col-md-3">
              <router-link to="/products" class="hvr-float-shadow text-dark" prefetch>
                <div
                  class="card custom-shadow"
                  data-aos="flip-left"
                  data-aos-duration="800"
                  data-aos-delay="250"
                >
                  <img src="https://jp.owndays.com/images/frame-types/round.svg" alt="" />
                  <small>
                    圓框款
                    <br />
                    清新柔和風格
                  </small>
                </div>
              </router-link>
            </div>
            <!-- 方 -->
            <div class="col-6 col-md-3">
              <router-link to="/products" class="hvr-float-shadow text-dark" prefetch>
                <div
                  class="card custom-shadow"
                  data-aos="flip-left"
                  data-aos-duration="800"
                  data-aos-delay="400"
                >
                  <img src="https://jp.owndays.com/images/frame-types/square.svg" alt="" />
                  <small>
                    方型款
                    <br />
                    簡潔俐落風格
                  </small>
                </div>
              </router-link>
            </div>
            <!-- 波 -->
            <div class="col-6 col-md-3">
              <router-link to="/products" class="hvr-float-shadow text-dark" prefetch>
                <div
                  class="card custom-shadow"
                  data-aos="flip-left"
                  data-aos-duration="800"
                  data-aos-delay="550"
                >
                  <img src="https://jp.owndays.com/images/frame-types/boston.svg" alt="" />
                  <small>
                    波士頓
                    <br />
                    流行時尚風格
                  </small>
                </div>
              </router-link>
            </div>
            <!-- 威 -->
            <div class="col-6 col-md-3">
              <router-link to="/products" class="hvr-float-shadow text-dark" prefetch>
                <div
                  class="card custom-shadow"
                  data-aos="flip-left"
                  data-aos-duration="800"
                  data-aos-delay="700"
                >
                  <img src="https://jp.owndays.com/images/frame-types/wellington.svg" alt="" />
                  <small>
                    威靈頓
                    <br />
                    經典風格
                  </small>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- 商品特色 -->
  <section class="container">
    <div class="row feature">
      <!-- 1 -->
      <div
        class="col-6 col-md-4 d-flex justify-content-center align-items-center"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
        data-aos-duration="600"
        data-aos-delay="600"
      >
        <div class="media">
          <img src="/images/icon_index_tokyodesign.svg" alt="" />
          <div class="media-body">
            <p>
              所有鏡框
              <br />
              日本設計
            </p>
          </div>
        </div>
      </div>
      <!-- 2 -->
      <div
        class="col-6 col-md-4 d-flex justify-content-center align-items-center"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
        data-aos-duration="600"
        data-aos-delay="600"
      >
        <div class="media">
          <img src="/images/icon_index_0yen.svg" alt="" />
          <div class="media-body">
            <p>
              無論任何度數
              <br />
              追加費用都是0元
            </p>
          </div>
        </div>
      </div>
      <!-- 3 -->
      <div
        class="col-6 col-md-4 d-flex justify-content-center align-items-center"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
        data-aos-duration="600"
        data-aos-delay="600"
      >
        <div class="media">
          <img src="/images/icon_index_quality.svg" alt="" />
          <div class="media-body">
            <p>
              無論何處製造
              <br />
              堅持嚴守優良品質
            </p>
          </div>
        </div>
      </div>
      <!-- 4 -->
      <div
        class="col-6 col-md-4 d-flex justify-content-center align-items-center"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
        data-aos-duration="600"
        data-aos-delay="600"
      >
        <div class="media">
          <img src="/images/icon_index_delivery.svg" alt="" />
          <div class="media-body">
            <p>
              當日
              <br />
              交件服務
            </p>
          </div>
        </div>
      </div>
      <!-- 5 -->
      <div
        class="col-6 col-md-4 d-flex justify-content-center align-items-center"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
        data-aos-duration="600"
        data-aos-delay="600"
      >
        <div class="media">
          <img src="/images/icon_index_service.svg" alt="" />
          <div class="media-body">
            <p>
              讓您『安心』
              <br />
              充實可靠的售後服務
            </p>
          </div>
        </div>
      </div>
      <!-- 6 -->
      <div
        class="col-6 col-md-4 d-flex justify-content-center align-items-center"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
        data-aos-duration="600"
        data-aos-delay="600"
      >
        <div class="media">
          <img src="/images/icon_index_lens.svg" alt="" />
          <div class="media-body">
            <p>
              薄型非球面鏡片
              <br />
              為標準配備
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- 門市資訊 -->
  <section class="store">
    <div class="mask" />
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-6 col-11">
          <div class="info custom-shadow">
            <IndexTitle tw="門市資訊" en="Store Information" />
            <div
              class="text-muted"
              data-aos="fade-zoom-in"
              data-aos-easing="ease-in-sine"
              data-aos-duration="600"
              data-aos-delay="100"
            >
              <ul class="nav flex-column mb-3">
                <li class="nav-item">台中市台中區台中街57巷8號</li>
                <li class="nav-item">
                  <a href="tel:0409876543">04-0987-6543</a>
                </li>
                <li class="nav-item">營業時間：週一～週五 10:00～22:00</li>
              </ul>
              <a href="https://goo.gl/maps/xjUnhNYuYxxZu3G79" target="_blank">
                <VButton label="觀看地圖" severity="contrast" size="small" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/scss/grid' as *;
header {
  position: relative;
  // Banner
  .banner-swiper {
    height: 100vh;
    width: 100%;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
  .mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.1);
    z-index: 1;
  }
  // Scroll
  .scroll {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--nav-bg-dark);
    small {
      letter-spacing: 2px;
      font-weight: 400;
      margin-bottom: 10px;
    }
  }
}

section {
  padding: 60px 0;
  @include phone {
    padding: 30px 0;
  }
}

// 框型簡介
.type {
  background: var(--background-second-color-light);
  .col-lg-9 {
    // 響應式
    @include pad {
      padding-top: 30px;
    }
    @media screen and (max-width: 767px) {
      .col-6 {
        display: flex;
        justify-content: center;
        a {
          margin-bottom: 30px;
        }
        .card {
          width: 190px;
          height: 190px;
          small {
            font-size: 15px !important;
          }
          @include phone {
            width: 155px;
            height: 155px;
          }
        }
      }
    }
    .card {
      padding: 20px;
      justify-content: center;
      text-align: center;
      border-radius: 50%;
      border: 1px solid #fff;
      width: 155px;
      height: 155px;
      cursor: pointer;
      &:first-child {
        margin-left: 0;
      }
      small {
        padding-top: 10px;
        font-size: 13px;
      }
    }
  }
}

// 商品特色
.feature {
  .media {
    text-shadow: 0 0 0.2em #fdc7d7;
    font-weight: lighter;
    display: flex;
    align-items: center;
    padding: 45px 0;
    // 響應式
    @include pad {
      display: flex;
      flex-direction: column;
      text-align: center;
      img {
        margin: 0 !important;
        padding-bottom: 10px;
      }
    }
    @include phone {
      font-size: 12px;
    }
    p {
      margin: 0;
    }
    img {
      margin-right: 15px;
    }
  }
}

// 門市資訊
.store {
  background: url('/images/index-2.jpg') no-repeat center/cover;
  position: relative;
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.1);
    pointer-events: none;
    backdrop-filter: blur(2px);
  }
  .info {
    width: 100%;
    padding: 30px;
    background: var(--nav-bg-light);
    display: inline-block;
    border-radius: 5px;
    position: relative;
    .nav {
      padding-top: 30px;
      color: var(--text-color-light);
      opacity: 0.8;
      .nav-item {
        padding-bottom: 10px;
        a {
          text-decoration: underline;
        }
      }
    }
    .btn {
      font-size: 15px;
      letter-spacing: 1.5px;
    }
  }
}

.dark-mode {
  header {
    .mask {
      background: rgba(0, 0, 0, 0.1);
    }
    .scroll {
      color: unset;
    }
  }
  .feature {
    img {
      filter: invert(1);
    }
  }
}
</style>
