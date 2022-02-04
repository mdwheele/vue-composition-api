<template>
  <div class="rounded-2xl p-6 bg-white shadow-xl">
    <div v-if="loading">
      <Icon name="refresh" outline class="boxw-16 h-16 shrink-0 animate-spin text-gray-500" />
    </div>
    <div v-else class="flex items-start space-x-6">
      <img :src="user.avatar" class="w-32 h-32 rounded-full"/>
      <div>
        <div class="font-semibold text-2xl text-gray-800">{{ user.name }}</div>
        <div class="text-gray-500">{{ user.username }}</div>
        <div class="mt-2 text-sm space-y-0.5">
          <div class="flex items-center space-x-1.5">
            <Icon name="office-building" outline class="w-5 h-5 shrink-0 text-gray-600" />
            <span>{{ user.company }}</span>
          </div>
          <div class="flex items-center space-x-1.5">
            <Icon name="location-marker" outline class="w-5 h-5 shrink-0 text-gray-600" />
            <span>{{ user.location }}</span>
          </div>
          <div class="flex items-center space-x-1.5">
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

  methods: {
    fetchUser() {      
      this.loading = true

      const headers = new Headers()
      headers.set('Authorization', `Basic ${btoa(import.meta.env.VITE_GITHUB_TOKEN)}`)

      fetch(`https://api.github.com/users/${this.username}`, { headers })
        .then(response => response.json())
        .then(user => {
          this.user = {
            name: user.name,
            username: user.login,
            avatar: user.avatar_url,
            company: user.company,
            location: user.location,
            twitter: user.twitter_username
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