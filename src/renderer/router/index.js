import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/landing-page',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'index',
      components: {
        default: require('@/components/Index/Index.vue').default
      },
      children: [
        {
          path: '',
          redirect: 'list'
        },
        {
          path: 'list',
          name: 'list',
          components: {
            body: require('@/components/Index/Right/Body/List/List.vue').default
          }
        },
        {
          path: 'search',
          name: 'search',
          components: {
            body: require('@/components/Index/Right/Body/Search/Search.vue').default
          },
        },
        {
          path: 'localSearch',
          name: 'localSearch',
          components: {
            body: require('@/components/Index/Right/Body/LocalSearch/LocalSearch.vue').default
          }
        },
        {
          path: 'webSearch',
          name: 'webSearch',
          components: {
            body: require('@/components/Index/Right/Body/WebSearch/WebSearch.vue').default
          }
        },
        {
          path: 'settings',
          name: 'settings',
          components: {
            body: require('@/components/Index/Right/Body/Settings/Settings.vue').default
          }
        },
        {
          path: 'core',
          name: 'core',
          components: {
            body: require('@/components/Index/Right/Body/Core/Core.vue').default
          },
          children: [
            {
              path: '',
              redirect: 'lyric'
            },
            {
              path: 'lyric',
              name: 'lyric',
              components: {
                coreBody: require('@/components/Index/Right/Body/Core/Lyric/Lyric.vue').default
              }
            },
            {
              path: 'currentList',
              name: 'currentList',
              components: {
                coreBody: require('@/components/Index/Right/Body/Core/CurrentList/CurrentList.vue').default
              }
            },
            {
              path: 'mv',
              name: 'mv',
              components: {
                coreBody: require('@/components/Index/Right/Body/Core/MV/MV.vue').default
              }
            }
          ]
        },
      ],
    }
  ]
})
