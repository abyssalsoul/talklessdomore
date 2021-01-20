<template>
  <div class="center">
    <button
      class="starter"
      @click="Start"
      id="svgButton"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
      <p id="abyssal">START</p>
      <NoiseCircle ref="noise" />
    </button>
    <span class="sr-only">Click to start</span>
  </div>
</template>

<script>
import anime from "animejs";
import NoiseCircle from "./../NoiseCircle";
import { AudioHandler } from "./../../components/audiohandler.js";
export default {
  name: "Login",
  components: { NoiseCircle },
  data() {
    return {
      hover: false,
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    hover: function (val) {
      if (val == true) {
        this.$refs.noise.begin();
      } else {
        this.$refs.noise.stop();
      }
    },
  },
  methods: {
    init() {},
    Start() {
      var logEl = document.querySelector(".starter");
      console.log(logEl);
      this.anim = anime({
        targets: logEl,
        scaleX: 3,
        scaleY: 3,
        opacity: 0,
        easing: "easeInExpo",
        duration: 1000,
        complete: this.onCompleted,
        loop: false,
      });
    },
    onCompleted() {
      this.$router.push("/navigation");
    },
  },
};
</script>
<style lang="scss">
.center {
  height:100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
