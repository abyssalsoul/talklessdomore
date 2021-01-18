<template>
  <p id="abyssal">{{ hover }}</p>
  <div>
    <button
      id="svgButton"
      @click="Start"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
      <p id="abyssal">Abysse</p>
      <NoiseCircle ref="noise" />
    </button>
    <span class="sr-only">Click to start</span>
  </div>
</template>

<script>
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
      
      this.$router.push("/navigation");
    },
    OnMouseOver() {
      console.log("begin");
    },
    OnMouseLeave() {
      console.log("leave");
    },
  },
};
</script>
<style lang="scss">

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
