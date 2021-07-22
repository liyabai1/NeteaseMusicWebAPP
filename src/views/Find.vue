<template>
  <div>
    <top-nav></top-nav>
    <main>
      <div class="container">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>
<script>
import TopNav from '@/views/find/TopNav'
export default {
  data () {
    return {}
  },
  components: {
    TopNav
  },
  mounted () {}
}
</script>
<style lang="scss" scoped>
div {
  display: flex;
  flex-direction: column;
  topnav {
    position: relative;
    top: 0px;
  }
  main {
    width: 100%;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    justify-content: center;
    .container {
      width: 95%;
    }
    &::-webkit-scrollbar {
      width: 6px;
      opacity: 0;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #444;
      border-radius: 3px;
    }
  }
}
</style>
