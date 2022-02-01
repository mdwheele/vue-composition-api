import { ref, unref, onMounted, watch, computed } from 'vue'

export default function useGitHub(username) {
  const loading = ref(false)
  const error = ref(null)
  const user = ref({})

  const isHireableAndProductive = computed(() => {
    console.log('foo')
    return user.value.hireable === true && user.value.repos >= 10
  })
  
  function fetchUser() {        
    loading.value = true
    error.value = null

    const headers = new Headers()

    headers.set('Authorization', `Basic ${btoa(import.meta.env.VITE_GITHUB_TOKEN)}`)

    fetch(`https://api.github.com/users/${unref(username)}`, { headers })
      .then(async response => {
        const json = await response.json()

        if (!response.ok) {
          throw new Error(json.message)
        }

        return json
      })
      .then(response => {
        user.value = {
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
      .catch(e => {
        error.value = e
      })
      .finally(() => {
        loading.value = false
      })
  }

  onMounted(() => {
    fetchUser()
  })

  let _debounce = null

  watch(() => unref(username), () => {
    if (_debounce) {
      clearTimeout(_debounce)
    }
    
    _debounce = setTimeout(() => {
      fetchUser()
    }, 600)
  })

  return {
    loading,
    user,
    error,
    isHireableAndProductive
  }
}