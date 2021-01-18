<template>
  <slot />
  <svg width="200" height="200">
    <polygon :points="points"></polygon>
  </svg>
</template>
<script>
import anime from "animejs";
export default {
  name: "NoiseCircle",
  components: {},
  data: function () {
    var defaultSides = 80;
    var edge = Array.apply(null, { length: defaultSides }).map(function () {
      return 100;
    });
    return {
      edge: edge,
      points: generatePoints(edge),
      sides: defaultSides,
      minRadius: 90,
      interval: null,
      duration: 50,
    };
  },

  mounted: function () {},
  methods: {
    begin: function () {
      this.isStopped = false;
      this.randomize();
      this.startAnimation(this.edge);
    },
    stop: function () {
      this.isStopped = true;
    },
    randomize: function () {
      var vm = this;
       this.edge = this.edge.map((x) => (x = vm.newRandomValue()));
     },

    startAnimation: function (newedge) {
      this.anim = anime({
        direction: "alternate",
        targets: this.$data,
        points: generatePoints(newedge),
        easing: "easeInOutQuart",
        duration: this.duration,
        baseFrequency: 0,
        complete: this.onCompleted,
        loop:false
      });
    },
    newRandomValue: function () {
      return Math.ceil(this.minRadius + Math.random() * (100 - this.minRadius));
    },
  
    onCompleted: function (anim) {
      var vm = this;
      if (this.isStopped) {
         this.edge = this.edge.map((x) => (x = 100));
      } else {
        this.randomize();
      }
      this.startAnimation(this.edge);
    },
  },
};

function valueToPoint(value, index, total) {
  var x = 0;
  var y = -value * 0.9;
  var angle = ((Math.PI * 2) / total) * index;
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  var tx = x * cos - y * sin + 100;
  var ty = x * sin + y * cos + 100;
  return { x: tx, y: ty };
}

function generatePoints(edge) {
  var total = edge.length;
  return edge
    .map(function (stat, index) {
      var point = valueToPoint(stat, index, total);
      return point.x + "," + point.y;
    })
    .join(" ");
}
</script>
<style lang="scss">
svg {
  display: block;
}
polygon {
  fill: #0f2b57;
}
</style>
