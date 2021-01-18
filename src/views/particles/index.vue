<template>
  <slot />
  <svg width="200" height="200">
    <polygon :points="points"></polygon>
  </svg>
</template>
<script>
import anime from "animejs";
export default {
  name: "Particles",
  components: {},
  data: function () {
    var defaultSides = 80;
    var stats = Array.apply(null, { length: defaultSides }).map(function () {
      return 100;
    });
    return {
      stats: stats,
      points: generatePoints(stats),
      sides: defaultSides,
      minRadius: 90,
      interval: null,
      duration: 50,
    };
  },

  mounted: function () {
    this.randomizeStats();
    this.animeState(this.stats);
  },
  methods: {
    randomizeStats: function () {
      var vm = this;
      this.stats = this.stats.map((x) => (x = vm.newRandomValue()));
    },

    animeState: function (newStats) {
      var anim = anime({
        direction: "alternate",
        targets: this.$data,
        points: generatePoints(newStats),
        easing: "easeInOutQuart",
        duration: this.duration,
        baseFrequency: 0,
        loop: false,
        complete: this.OnCompleted,
      });
    },
    newRandomValue: function () {
      return Math.ceil(this.minRadius + Math.random() * (100 - this.minRadius));
    },
    OnCompleted: function (anim) {
      var vm = this;
      this.randomizeStats();
      this.animeState(this.stats);
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

function generatePoints(stats) {
  var total = stats.length;
  return stats
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
