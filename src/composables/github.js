import { ref, unref, onMounted, watch  } from 'vue'

export default function useGitHub(username) {
  const loading = ref(false)
  const user = ref({})
  
  function fetchUser() {        
    loading.value = true

    fetch(`https://api.github.com/users/${unref(username)}`)
      .then(response => response.json())
      .then(user => {
        user.value = {
          name: user.name,
          username: user.login,
          avatar: user.avatar_url,
          company: user.company,
          location: user.location,
          twitter: user.twitter_username
        }
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
    user
  }
}