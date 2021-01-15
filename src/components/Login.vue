<template>
 <div class="my-2">
  <v-btn x-large color="success" dark v-on:click="play">Play</v-btn>
  <span id="audio"></span>
  
 </div>
</template>

<script>
import Three3D from "./Three3D.vue";

export default {
  name: "Login",
  components: {
    Three3D,
  },
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
        audio.html('<audio autoplay><source src="@/assets/sounds/theme.mp3"></audio>');
    },
    play() {
      audio.play();
    },
  },
};
</script>
<style>
.bg {
  width: 100%;
  height: 100%;
  background-color: #17334f;
}
</style>
