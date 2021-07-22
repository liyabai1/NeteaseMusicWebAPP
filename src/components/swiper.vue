<template>
  <div class="swiper-container bannerSwiper">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination banner"></div>
  </div>
</template>
<script>
// import Swiper core and required modules
import Swiper from 'swiper/js/swiper'

// Import Swiper styles
import 'swiper/swiper.scss'

// Import Swiper styles
export default {
  components: {},
  mounted () {
    new Swiper('.bannerSwiper', {
      slidesPerView: 3,
      autoplay: true,
      centeredSlides: true,
      loop: true,
      onserver: true,
      pagination: {
        el: 'swiper-pagination',
        clickable: true
      }
    })
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
img {
  width: 540px;
  height: 200px;
  border-radius: 5px;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  transition: 300ms;
  transform: scale(0.7);
}
.swiper-slide-active,
.swiper-slide-duplicate-active {
  transform: scale(1);
  z-index: 5;
}
.swiper-slide-next,
.swiper-slide-prev {
  z-index: 4;
}
</style>
