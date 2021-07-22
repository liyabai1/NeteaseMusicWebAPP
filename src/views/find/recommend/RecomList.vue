<template>
  <div>
    <!-- 推荐歌单 -->
    <p class="listTitle" @click="navToMusicList">
      <span>推荐歌单</span>
      <i class="iconfont">&#xe639;</i>
    </p>
    <musiclist-box
      :key="this.$store.state.recommendList.length"
      :list="this.$store.state.recommendList | filter(this.$store.state)"
    ></musiclist-box>

    <!-- 网易云音乐雷达 -->
    <p class="listTitle">
      <span>{{ this.$store.state.neteaseRadar.uiElement.subTitle.title }}</span>
      <i class="iconfont">&#xe639;</i>
      <musiclist-box
        :list="this.$store.state.neteaseRadar | filterRadar(this.$store.state)"
      ></musiclist-box>
    </p>

    <!-- 最新音乐 -->
    <!-- <p class="listTitle" @click="navToNewMusic">
      <span>最新音乐</span>
      <i class="iconfont">&#xe639;</i>
      <musiclist :list="this.$store.state.dayRecommendMusic"></musiclist>
    </p> -->
  </div>
</template>
<script>
import MusiclistBox from "@/components/MusiclistBox.vue";

export default {
  data() {
    return {
      listData: [],
    };
  },
  methods: {
    navToMusicList() {
      this.$router.push("/home/customers");
    },
    // navToNewMusic() {
    //   this.$router.push("/home/newmusic");
    // },
  },
  mounted() {},
  components: {
    MusiclistBox,
  },
  filters: {
    filter(item, store) {
      // 只需要图片，文字描述，歌单ID
      const listData = [];
      console.log("需要过滤的歌单", item);
      // 判断用户是否登录，登录传入推荐歌单，未登录传入发现页默认推荐
      if (store.userInfo.isLogin) {
        item.map((data) => {
          const listName = data.name;
          const listImg = data.picUrl;
          const listId = data.id;
          const itemData = {
            listName,
            listImg,
            listId,
          };
          listData.push(itemData);
          listData.splice(10); // 只传入十个
        });
      } else {
        item.creatives.map((data) => {
          const listName = data.resources[0].uiElement.mainTitle.title;
          const listImg = data.resources[0].uiElement.image.imageUrl;
          const listId = data.creativeId;
          const itemData = {
            listName,
            listImg,
            listId,
          };
          listData.push(itemData);
        });
      }
      return listData;
    },
    // 过滤音乐雷达传入的数据
    filterRadar(res) {
      console.log("chaunru", res);
      const listData = [];
      res.creatives.map((data) => {
        const listName = data.resources[0].uiElement.mainTitle.title;
        const listImg = data.resources[0].uiElement.image.imageUrl;
        const listId = data.creativeId;
        const itemData = {
          listName,
          listImg,
          listId,
        };
        listData.push(itemData);
      });
      return listData;
    },
  },
};
</script>
<style lang="scss" scoped>
div {
  margin-top: 20px;
}
.listTitle {
  font-size: 20px;
  font-weight: bold;
  width: auto;
  span {
    cursor: pointer;
  }
}
</style>
