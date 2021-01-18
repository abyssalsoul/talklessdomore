<template>
  <div class="center">
    <button id="svgButton" v-on:click="Start">
      <p id="abyssal">Abysse</p>
      <Particles></Particles>
    </button>
    <span class="sr-only">Click to start</span>
  </div>
</template>

<script>
import Particles from "./../particles";
import { AudioHandler } from "./../../components/audiohandler.js";
export default {
  name: "Login",
  components: { Particles },
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {},
    Start() {
      this.$router.push("/navigation");
    },
  },
};
</script>
<style lang="scss">
.center {
  margin: 0 auto;
  border-radius: 3px;
  justify-content: center;
  align-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  display: flex;
}
#abyssal {
  font: bold 10px sans-serif;
  letter-spacing: 10px;
  color: white;
  position: absolute;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none;

}
#svgButton {
  border: none;
  background: none;
  cursor: pointer;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  
  /* position the div in center */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &:focus {
    outline: 0px;
  }

  &::-moz-focus-inner {
    border: 0;
  }
}
.sr-only {
  height: 1px;
  overflow: hidden;
  position: absolute;
  width: 1px;
}
</style>
