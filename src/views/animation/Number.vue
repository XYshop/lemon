<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import gsap from 'gsap'

const elInput = ref(null)
const number = ref(0)
const tweened = reactive({ number: 0 })
const checkBox = ref(false)

function change(event) {
  console.log(event.target.checked)
  checkBox.value = event.target.value
}

watch(number, (n) => {
  gsap.to(tweened, { duration: 0.5, number: Number(n) || 0 })
})

onMounted(() => {
  elInput.value.focus()
})
</script>

<template>
  <div class="demo">
    <div>
      Type a number: <input type="text" ref="elInput" v-model.number="number" />
      <p class="big-number">{{ tweened.number.toFixed(0) }}</p>
    </div>
    <div>
      <input type="checkbox" id="checkbox" value="Jack" @change="change" />
      <label for="checkbox">{{ checkBox }}</label>
    </div>
    <div>
      <input
        type="radio"
        id="one"
        value="One"
        name="number"
        checked
        @change="change"
      />
      <label for="one">One</label>
      <input type="radio" id="two" value="Two" name="number" @change="change" />
      <label for="two">Two</label>
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo {
  text-align: center;
  margin-top: 200px;
}
.big-number {
  font-weight: bold;
  font-size: 2em;
}

input[type='text'] {
  font-size: 1.2em;
  border: 1px solid rgba(60, 60, 60, 0.29);
  border-radius: 0.2em;
  padding: 0.2em 0.4em;
}
</style>
