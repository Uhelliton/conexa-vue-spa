<script>
import { mapActions, mapGetters } from 'vuex'
import Icon from '../svg/icon'

export default {
  name: 'Menu',
  components: { Icon },
  data: () => ({
    menu: [
      {
        name: 'Dashboard',
        router: '/dashboard',
        icon: 'ic-panel'
      }, {
        name: 'Tarefas',
        router: '/tasks',
        icon: 'ic-panel'
      }, {
        name: 'Usuários',
        router: '/users',
        icon: 'ic-panel'
      }
    ]
  }),
  computed: {
    ...mapGetters({
      user: 'user/user'
    })
  },
  methods: {
    ...mapActions({
      logout: 'user/logout'
    }),
    onLogout () {
      this.logout()
      this.$router.push({ name: 'auth.index' })
      setTimeout(() => {
        window.location.reload()
      })
    }
  }
}
</script>

<template>
  <nav class="m-menu" tabindex="0">
    <div class="m-menu_trigger"></div>
    <header class="m-menu_avatar">
      <img src="static/images/users/profile.jpg"
           width="128" />
    </header>
    <ul>
      <router-link tag="li"
                   tabindex="0"
                   title="Dashboard"
                   :to="item.router"
                   :key="item.title"
                   v-for="item in menu">
        <icon :name="item.icon" class="m-icon--sm"></icon>
        <span>{{ item.name }}</span>
      </router-link>
      <li tabindex="0"
          title="Sair"
          ref="logout"
          @click="onLogout()">
        <icon name="ic-sing-out" class="m-icon--sm"></icon>
        <span>Sair</span>
      </li>
    </ul>
  </nav>
</template>
