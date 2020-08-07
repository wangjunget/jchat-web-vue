<template>
  <div class="main-menu">
    <div class="main-self-avatar" @click="isShowUserInfo = true">
      <img src="@/assets/images/single-avatar.svg" alt="" />
    </div>
    <div class="main-tab">
      <div class="main-chat">
        <div class="main-conversation-icon"></div>
      </div>
      <div class="main-chat">
        <div class="main-contact-icon"></div>
      </div>
      <div class="main-chat">
        <div class="main-room-icon"></div>
      </div>
    </div>
    <div class="main-add-container">
      <div class="main-add-single">
        <div class="main-add-single-icon" />
      </div>
      <div class="main-setting">
        <div class="main-setting-icon" />
      </div>
    </div>
    <user-info :is-show-user-info.sync="isShowUserInfo"></user-info>
  </div>
</template>

<script>
import UserInfo from './userInfo'

export default {
  name: 'MainMenu',
  components: {
    UserInfo
  },
  data () {
    return {
      isShowUserInfo: false
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.main-menu {
  width: 70px;
  border-right: 1px solid #d8dfe4;
  background: #e8edf3;
  display: flex;
  flex-direction: column;
}
.main-self-avatar {
  margin: 61px 0 57px 13px;
  width: 44px;
  height: 44px;
  overflow: hidden;
  img {
    cursor: pointer;
    width: 100%;
  }
}
.main-tab {
  .main-chat {
    position: relative;
    height: 30px;
    margin-bottom: 31px;

    > div {
      background-size: 30px;
      width: 30px;
      height: 30px;
      margin: 0 auto;
      cursor: pointer;
    }

    .main-conversation-icon {
      background: url(../../../assets/images/chat-normal.svg) center center
        no-repeat;
      position: relative;
      &:hover {
        background-image: url(../../../assets/images/chat-active.svg);
      }
      &.active {
        background-image: url(../../../assets/images/chat-active.svg);
      }
    }
    .main-contact-icon {
      background: url(../../../assets/images/contact-normal.svg) center center
        no-repeat;
      position: relative;
      &:hover {
        background-image: url(../../../assets/images/contact-active.svg);
      }
      &.active {
        background-image: url(../../../assets/images/contact-active.svg);
      }
    }
    .main-room-icon {
      background: url(../../../assets/images/room-normal.svg) center center
        no-repeat;
      position: relative;
      &:hover {
        background-image: url(../../../assets/images/room-active.svg);
      }
      &.active {
        background-image: url(../../../assets/images/room-active.svg);
      }
    }
  }
}
.main-add-container {
  margin-bottom: 48px;
  margin-top: auto;

  .main-add-single {
    height: 21px;
    margin-bottom: 38px;

    .main-add-single-icon {
      cursor: pointer;
      background: url(../../../assets/images/add-single-normal.svg) center
        center no-repeat;
      background-size: 21px;
      width: 21px;
      height: 21px;
      margin: 0 auto;
      &:hover {
        background: url(../../../assets/images/add-single-active.svg) center
          center no-repeat;
      }
    }
  }

  .main-setting {
    height: 21px;

    .main-setting-icon {
      cursor: pointer;
      background: url(../../../assets/images/menu-normal.svg) center center
        no-repeat;
      background-size: 21px;
      width: 21px;
      height: 21px;
      margin: 0 auto;
      &:hover {
        background: url(../../../assets/images/menu-active.svg) center center
          no-repeat;
      }
    }
  }
}
</style>
