<script lang="ts" setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import {onMounted, ref} from 'vue';

// 导入store和类型
import {userStore} from '@/stores/user/userStore';
import {configStore} from '@/stores/user/configStore';
import type {ConfigState} from '@/types/pinia-persistedstate.d.ts';

// 当前主题类型
type Theme = ConfigState['theme'];

// 初始化store实例
const user = userStore();
const config = configStore();

// 当前主题
const currentTheme = ref<Theme>(config.theme);

// 测试用户登录
const testLogin = () => {
  // 设置用户令牌 - 使用直接赋值而不是调用方法
  user.$patch({
    token: 'abc123',
    profile: {
      ...user.profile,
      username: '测试用户',
      email: 'test@example.com'
    }
  });

  console.log('用户已登录:', !!user.token);
};

// 测试用户登出
const testLogout = () => {
  // 使用 $patch 直接更新状态
  user.$patch({
    token: '',
    profile: {
      ...user.profile,
      username: '',
      email: '',
      avatar: ''
    }
  });

  console.log('用户已登出:', !user.token);
};

// 切换主题
const toggleTheme = () => {
  const newTheme: Theme = config.theme === 'light' ? 'dark' : 'light';
  // 使用 $patch 更新状态
  config.$patch({
    theme: newTheme
  });
  currentTheme.value = newTheme;
  console.log('主题已切换为:', config.theme);
};

// 页面加载时执行
onMounted(() => {
  // 检查本地存储
  console.log('当前本地存储键:', localStorage.length);
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    console.log(`存储项 ${i}: ${key}`);
  }

  console.log('当前用户状态:', !!user.token ? '已登录' : '未登录');
  console.log('当前主题设置:', config.theme);
});
</script>

<template>
  <div :class="['app-container', currentTheme]">
    <header>
      <img alt="Vue logo" class="logo" height="125" src="@/assets/logo.svg" width="125"/>

      <div class="wrapper">
        <HelloWorld msg="Pinia 状态管理演示"/>
      </div>

      <div class="actions">
        <button class="theme-toggle" @click="toggleTheme">
          {{ currentTheme === 'light' ? '切换到暗色模式' : '切换到亮色模式' }}
        </button>

        <button v-if="!user.token" class="login-btn" @click="testLogin">
          测试登录
        </button>
        <button v-else class="logout-btn" @click="testLogout">
          测试登出
        </button>
      </div>
    </header>

    <main>
      <div v-if="user.token" class="user-info">
        <h3>当前用户信息</h3>
        <p>用户名: {{ user.profile.username }}</p>
        <p>邮箱: {{ user.profile.email }}</p>
        <p>令牌: {{ user.token }}</p>
      </div>

      <div class="theme-info">
        <h3>当前主题设置</h3>
        <p>主题: {{ config.theme }}</p>
        <p>语言: {{ config.language }}</p>
      </div>

      <TheWelcome/>
    </main>
  </div>
</template>

<style scoped>
/* 主题相关样式 */
.app-container {
  min-height: 100vh;
  transition: background-color 0.3s, color 0.3s;
}

.app-container.light {
  background-color: #ffffff;
  color: #213547;
}

.app-container.dark {
  background-color: #242424;
  color: rgba(255, 255, 255, 0.87);
}

header {
  line-height: 1.5;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.actions {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
}

button {
  padding: 0.6em 1.2em;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.theme-toggle {
  background-color: #646cff;
  color: white;
  border: none;
}

.theme-toggle:hover {
  background-color: #4854ff;
}

.login-btn {
  background-color: #42b883;
  color: white;
  border: none;
}

.login-btn:hover {
  background-color: #379f6e;
}

.logout-btn {
  background-color: #f87171;
  color: white;
  border: none;
}

.logout-btn:hover {
  background-color: #ef4444;
}

.user-info, .theme-info {
  background-color: rgba(100, 108, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  max-width: 600px;
}

.dark .user-info, .dark .theme-info {
  background-color: rgba(100, 108, 255, 0.2);
}

@media (min-width: 1024px) {
  header {
    flex-direction: row;
    justify-content: space-between;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .actions {
    margin-top: 0;
  }
}
</style>
