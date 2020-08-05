<template>
  <main>
    <div class="chat-container">
      <main-menu />
      <main-right />
    </div>
  </main>
</template>

<script>
import MainMenu from './components/mainMenu'
import MainRight from './components/mainRight'

export default {
  components: {
    MainMenu,
    MainRight
  }
}
</script>

<style lang="scss" scoped>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: #71c3a457;
    }
    .chat-container {
        display: flex;
        max-width: 980px;
        width: 100%;
        max-height: 710px;
        min-width: 770px;
        min-height: 550px;
        height: 100%;
        margin: 0 auto;
        background: #fff;
        border-radius: 4px;
        overflow: hidden;
    }
</style>
