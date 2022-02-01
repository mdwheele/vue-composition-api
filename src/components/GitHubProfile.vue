<template>
  <div class="rounded-2xl p-6 bg-white shadow-xl">
    <div v-if="loading">
      <Icon name="refresh" outline class="w-16 h-16 shrink-0 animate-spin text-gray-500" />
    </div>
    <div v-else-if="error" class="text-red-600 text-3xl">
      {{ error }}
    </div>
    <div v-else class="flex items-start space-x-6">
      <div class="relative">
        <img :src="user.avatar" class="w-32 h-32 rounded-full"/>
        <div v-if="isHireableAndProductive" class="absolute right-0 bottom-0 bg-green-600 rounded-full p-1.5 ring-4 ring-white">
          <Icon name="check" class="w-5 h-5 text-white" />
        </div>
      </div>
      <div>
        <div class="font-semibold text-2xl text-gray-800">{{ user.name }}</div>
        <div class="text-gray-500">{{ user.username }}</div>
        <div class="mt-2 text-sm space-y-0.5">
          <div v-if="user.company" class="flex items-center space-x-1.5">
            <Icon name="office-building" outline class="w-5 h-5 shrink-0 text-gray-600" />
            <span>{{ user.company }}</span>
          </div>
          <div v-if="user.location" class="flex items-center space-x-1.5">
            <Icon name="location-marker" outline class="w-5 h-5 shrink-0 text-gray-600" />
            <span>{{ user.location }}</span>
          </div>
          <div v-if="user.twitter" class="flex items-center space-x-1.5">
            <Icon name="cake" outline class="w-5 h-5 shrink-0 text-gray-600" />
            <span>{{ user.twitter }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs } from 'vue'
import Icon from 'vue-heroicon-next'
import useGitHub from '@/composables/github'

export default {
  name: 'GitHubProfile',

  components: { Icon },

  props: {
    username: { 
      type: String,
      required: true
    }
  },

  setup(props) {
    const { username } = toRefs(props)
    const { loading, user, error, isHireableAndProductive } = useGitHub(username)

    return {
      loading,
      user,
      error, 
      isHireableAndProductive
    }
  }
}
</script>