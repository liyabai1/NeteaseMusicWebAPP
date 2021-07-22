<template>
  <div>
    <rank-list :rankInfo="s" class="rankList"></rank-list>
    <rank-list :rankInfo="n" class="rankList"></rank-list>
    <rank-list :rankInfo="o" class="rankList"></rank-list>
    <rank-list :rankInfo="h" class="rankList"></rank-list>
  </div>
</template>
<script>
import RankList from "@/components/RankList.vue";
export default {
  data() {
    return {
      s: {
        // 飙升榜
        name: "飙升榜",
        imgUrl:
          "https://p2.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=175y175",
        listId: 19723756,
      },
      n: {
        name: "新歌榜",
        imgUrl:
          "https://p2.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=175y175",
        listId: 3779629,
      },
      o: {
        name: "新歌榜",
        imgUrl:
          "https://p2.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg?param=175y175",
        listId: 2884035,
      },
      h: {
        name: "热歌榜",
        imgUrl:
          "https://p2.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg?param=175y175",
        listId: 3778678,
      },
    };
  },
  components: {
    RankList,
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.rankList {
  margin-bottom: 50px;
}
</style>
