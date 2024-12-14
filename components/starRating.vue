<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  rating: {
    type: Number,
    required: true,
  },
  maxStars: {
    type: Number,
    default: 5,
  },
});

const fullStars = computed(() => Math.floor(props.rating));
const hasHalfStar = computed(() => props.rating % 1 >= 0.5);
const emptyStars = computed(() => props.maxStars - fullStars.value - (hasHalfStar.value ? 1 : 0));
</script>

<template>
  <div class="star-rating">
    <span
        v-for="index in fullStars"
        :key="'full-' + index"
        class="star full"
    >
      ★
    </span>

    <span v-if="hasHalfStar" class="star half">
      ★
      <span class="half-overlay">★</span>
    </span>

    <span
        v-for="index in emptyStars"
        :key="'empty-' + index"
        class="star empty"
    >
      ★
    </span>
  </div>
</template>

<style scoped>
.star-rating {
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.star {
  font-size: 24px;
  line-height: 1;
  display: inline-block;
  position: relative;
  color: #ffd700;
}


.star.empty {
  color: #ccc;
}

.star.half {
  position: relative;
  overflow: hidden;
  color: #ccc;
}

.star.half .half-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  overflow: hidden;
  color: #ffd700;
}
</style>