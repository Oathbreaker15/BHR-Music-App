<template>
  <div class="main-layout">
    <div class="main-layout__header">
      <button class="hamburger hamburger--emphatic" 
              type="button" 
              :class="{ 'is-active': isActive }" 
              @click="burgerActive()">
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
      <p class="main-layout__header-text">Выбор папки с музыкой</p>
    </div>
    <FolderSelect></FolderSelect> 
  </div>
</template>

<script>
import store from "vuex";
import FolderSelect from "~/components/FolderSelect.vue";

export default {
  middleware: 'checkAuth',
  components: {
    FolderSelect,
  },
  data(){
    return {
      isActive: false
    }
  },
  methods: {
    burgerActive() {
      this.isActive = !this.isActive;
    }
  },
}
</script>

<style scoped>
  .main-layout {
    padding: 20px;
    background-color: #cccccc;
  }

  .main-layout__header {
    padding-bottom: 20px;
    display: flex;
    justify-content: left;
    align-items: baseline;
  }

  .main-layout__header-text {
    padding-left: 27.5px;
    font-size: 24px;
  }

  .hamburger {
    padding: 10px;
    padding-left: 15px;
    outline: none;
  }

  .hamburger-box {
    width: 15px;
    height: 15px;
}

.hamburger-inner, 
.hamburger-inner:after, 
.hamburger-inner:before {
    width: 20px;
    height: 2px;
}
</style>