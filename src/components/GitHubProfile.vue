<template>
  <div class="rounded-2xl p-6 bg-white shadow-xl">
    <div v-if="loading">
      <Icon name="refresh" outline class="boxw-16 h-16 shrink-0 animate-spin text-gray-500" />
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
import Icon from 'vue-heroicon-next'

export default {
  name: 'GitHubProfile',

  components: { Icon },

  props: {
    username: { 
      type: String,
      required: true
    }
  },

  watch: {
    username() {
      if (this._debounce) {
        clearTimeout(this._debounce)
      }
      
      this._debounce = setTimeout(() => {
        this.fetchUser()
      }, 600)
    }
  },

  data() {
    return {
      loading: false,
      user: {}
    }
  },

  computed: {
    isHireableAndProductive() {
      return this.user.hireable === true && this.user.repos >= 10
    }
  },

  methods: {
    fetchUser() {      
      this.loading = true

      const headers = new Headers()
      headers.set('Authorization', `Basic ${btoa(import.meta.env.VITE_GITHUB_TOKEN)}`)

      fetch(`https://api.github.com/users/${this.username}`, { headers })
        .then(response => response.json())
        .then(response => {
          this.user = {
            name: response.name,
            username: response.login,
            avatar: response.avatar_url,
            company: response.company,
            location: response.location,
            twitter: response.twitter_username,
            hireable: response.hireable,
            repos: response.public_repos
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  },

  mounted() {
    this.fetchUser()
  }
}
</script>