<template>
  <div class="search-user-container">
    <h1 class="search-user-title">JCHAT</h1>
    <div
      class="search-user-btn"
      v-if="!isShowSearchInput"
      @click="showSearchInput"
    >
      搜索
    </div>
    <transition name="display">
      <div class="search-user-input-wrap" v-clickoutside="clickOutside" v-if="isShowSearchInput">
        <input
          class="search-user-input input-focus"
          type="text"
          placeholder="联系人/群组/聊天室ID"
        />
        <span></span>
        <p></p>
      </div>
    </transition>
  </div>
</template>

<script>
import Clickoutside from 'element-ui/src/utils/clickoutside'

export default {
  name: 'searchUser',
  directives: {
    Clickoutside
  },
  data () {
    return {
      isShowSearchInput: false
    }
  },
  methods: {
    showSearchInput () {
      this.isShowSearchInput = true
    },
    clickOutside () {
      this.isShowSearchInput = false
    }
  }
}
</script>

<style lang="scss" scoped>
.search-user-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  border-bottom: 1px solid #d8dfe4;
  line-height: 50px;
  padding-left: 20px;
  position: relative;
  .search-user-btn {
    width: 41px;
    height: 17px;
    line-height: 17px;
    float: right;
    font-size: 12px;
    color: #8a8c8c;
    text-align: right;
    background: url(../../../assets/images/search-user.svg) left 2px no-repeat;
    background-size: 14px;
    cursor: pointer;
    position: absolute;
    top: 17px;
    right: 20px;
  }
  .search-user-title {
    font-family: Helvetica;
    font-size: 18px;
    color: #9b9b9b;
    font-weight: 100;
    margin: 0;
  }
  .search-user-input-wrap {
    width: 240px;
    height: 30px;
    border-radius: 4px;
    position: relative;
    margin-right: 20px;

    span {
      position: absolute;
      top: 9px;
      right: 39px;
      cursor: pointer;
      display: block;
      width: 12px;
      height: 12px;
      background: url(../../../assets/images/search-user-delete.svg) center
        center no-repeat;
      background-size: 12px;
    }
    p {
      position: absolute;
      top: 0;
      right: 0;
      width: 30px;
      height: 30px;
      margin: 0;
      border-radius: 0 4px 4px 0;
      background: #2dd0cf url(../../../assets/images/search-user-action.svg)
        center center no-repeat;
    }
    .search-user-input {
      width: 100%;
      height: 30px;
      padding-left: 12px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      font-size: 12px;
      border-radius: 4px;
      background: #e8edf3;
      float: left;
      background-size: 14px;
      border: 1px solid transparent;
    }
  }
  .search-user-no-result {
    line-height: 80px;
    height: 80px;
    background-color: #fff;
    position: absolute;
    z-index: 5;
    width: 240px;
    top: 46px;
    right: 20px;
    -webkit-box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.2);
    box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    font-size: 14px;
    color: #2c2c2c;
    text-align: center;
  }
  .search-user-result {
    position: absolute;
    top: 46px;
    right: 20px;
    z-index: 5;
    line-height: 50px;
    background-color: #fff;
    width: 240px;
    -webkit-box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.2);
    box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    max-height: 452px;
    .search-user-single {
      overflow: hidden;
    }
    .search-user-group {
      overflow: hidden;
    }
    .search-user-show {
      height: 26px;
      line-height: 26px;
      margin: 0 8px;
      border-bottom: 1px solid #d9dee4;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      font-size: 12px;
      color: #808080;
      span {
        color: #2dd0cf;
        cursor: pointer;
        &:hover {
          color: #02bdbc;
        }
      }
    }
    li {
      padding: 0 8px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      .search-user-avatar-container {
        width: 30px;
        height: 30px;
        margin: 10px 10px 0 0;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .search-user-name {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: default;
      }
      &:hover {
        background-color: #f2f6fb;
      }
    }
  }
}
.display-enter {
  transform: translateX(260px) translate3d(0, 0, 0);
}
.display-enter-active {
  transition: all 0.3s ease;
}
.display-leave-active {
  transition: all 0.3s ease;
}
.display-leave-to {
  -webkit-transform: translateX(260px) translate3d(0, 0, 0);
  transform: translateX(260px) translate3d(0, 0, 0);
}
</style>
