<template>
  <div>
    <p class="subTitle">根据您最近听歌记录推荐</p>
    <musiclist-box :list="list" :key="list.length"></musiclist-box>
  </div>
</template>
<script>
import MusiclistBox from "@/components/MusiclistBox";
import axios from "axios";
import { api } from "@/modules/api.js";
export default {
  data() {
    return {
      list: [],
    };
  },
  components: {
    MusiclistBox,
  },
  mounted() {
    console.log("zhixing");
    if (this.$store.state.userInfo.isLogin) {
      this.getRecomData();
    } else {
      alert("请先登录");
      this.$store.state.loginIng = true;
    }
  },
  methods: {
    getRecomData() {
      axios({
        url: `${api}/recommend/resource?cookie=${this.$store.state.userInfo.cookie}`,
      }).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          console.log(res.data.recommend);
          let recommend = res.data.recommend;
          recommend.forEach((item) => {
            let preSongInfo = {
              listName: item.name,
              listId: item.id,
              listImg: item.picUrl,
            };
            this.list.push(preSongInfo);
          });
        }
        console.log(this.list);
      });
    },
  },
  computed: {
    login() {
      return this.$store.state.userInfo.isLogin;
    },
  },
  watch: {
    login: function () {
      this.getRecomData();
    },
  },
};
</script>
<style scoped>
.subTitle {
  font-size: 20px;
  font-weight: bold;
  margin: 10px;
}
</style>
