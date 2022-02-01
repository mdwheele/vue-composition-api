<template>
  <div class="flex flex-col items-center justify-center h-screen font-sans bg-gradient-to-r from-purple-500 to-indigo-500">
    <div class="flex space-x-8">
      <div class="p-6 overflow-hidden text-center bg-white shadow-xl rounded-2xl">
        <Identicon :seed="normalizedInput" class="w-32 h-32" />
      </div>
      <div class="p-6 overflow-hidden text-center bg-white shadow-xl rounded-2xl">
        <Identicon theme="retro" :seed="normalizedInput" class="w-32 h-32" />
      </div>
    </div>

    <div class="my-8">
      <GitHubProfile :username="input" />
    </div>

    <div class="w-96">
      <input type="text" v-model="input" class="w-full rounded-2xl p-6 text-2xl shadow-xl focus:outline-none" placeholder="Type something..." />
    </div>
  </div>
</template>

<script>
import Identicon from 'vue-identicon'
import GitHubProfile from '@/components/GitHubProfile.vue'

export default {
  components: { Identicon, GitHubProfile },

  data() {
    return {
      input: 'mdwheele'
    }
  },

  computed: {
    normalizedInput() {
      return `${this.input}${this.input}`
    }
  }
}
</script>