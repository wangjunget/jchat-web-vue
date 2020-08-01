<template>
  <div class="main-right">
    <search-user />
    <div class="main-center-container">
      <main-center-chat />
      <main-center-contact v-if="false" />
      <main-center-room v-if="false" />
    </div>
  </div>
</template>

<script>
import SearchUser from './searchUser'
import MainCenterChat from './mainCenterChat'
import MainCenterContact from './mainCenterContact'
import MainCenterRoom from './mainCenterRoom'

export default {
  components: {
    SearchUser,
    MainCenterChat,
    MainCenterContact,
    MainCenterRoom
  }
}
</script>

<style lang="scss" scoped>
    .main-right {
        flex-grow: 1;
    }
</style>
