<script setup>
/**
 * --------------------------------------------------------------------------
 * ENTERPRISE DASHBOARD SANDBOX FRAMEWORK
 * --------------------------------------------------------------------------
 * @package    SaaSAdmin / AdminCore
 * @author     Long Tran <Senior IT Project Leader & Design Engineer>
 * @version    1.0.0 (Vue 3 + Tailwind CSS v3 Hybrid)
 * @created    June 2026
 * * NOTE: This project is custom-built from scratch to demonstrate 1-1 mapping 
 * efficiency between Figma Local Variables (UI3) and Tailwind CSS configuration.
 * --------------------------------------------------------------------------
 */
 import { ref, computed, onMounted } from 'vue'

const API_BASE = import.meta.env.VITE_API_BASE

const themeTokens = ref(null)
const activeThemeName = ref(null)   // 'light' | 'dark'
const themeLoading = ref(false)
const themeError = ref(null)

const applyButtonLabel = computed(() => {
  if (themeLoading.value) return 'Applying...'
  return activeThemeName.value === 'dark'
    ? 'Apply Light Mode'
    : 'Apply Dark Mode'
})

const targetThemeName = computed(() =>
  activeThemeName.value === 'dark' ? 'light' : 'dark'
)

function parseTokens(raw) {
  return typeof raw === 'string' ? JSON.parse(raw) : raw
}

function applyThemeTokens(tokens) {
  Object.entries(tokens).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value)
  })
}

function applyThemePayload(payload) {
  const tokens = parseTokens(payload.tokens)
  applyThemeTokens(tokens)
  themeTokens.value = tokens
  activeThemeName.value = payload.theme_name
}

async function loadActiveTheme() {
  themeLoading.value = true
  themeError.value = null
  try {
    const response = await fetch(`${API_BASE}/active`)
    if (!response.ok) throw new Error('Failed to fetch active theme')
    const json = await response.json()
    applyThemePayload(json.data)
  } catch (err) {
    themeError.value = err.message
    console.error(err)
  } finally {
    themeLoading.value = false
  }
}

async function toggleThemeFromBackend() {
  themeLoading.value = true
  themeError.value = null
  try {
    const response = await fetch(`${API_BASE}/activate`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ theme_name: targetThemeName.value }),
    })
    if (!response.ok) throw new Error('Failed to activate theme')
    const json = await response.json()
    applyThemePayload(json.data)
  } catch (err) {
    themeError.value = err.message
    console.error(err)
  } finally {
    themeLoading.value = false
  }
}

onMounted(loadActiveTheme)

const users = ref([
  { id: 1, name: 'Sarah Johnson', email: 's.johnson@company.com', role: 'Admin', status: 'Active', lastActive: 'Today, 09:41 AM', initial: 'SJ' },
  { id: 2, name: 'Carlos Vega', email: 'c.vega@company.com', role: 'Viewer', status: 'Pending', lastActive: 'Jun 14, 2026', initial: 'CV' }
])
</script>

<template>
  <div class="flex min-h-screen bg-surface-main text-text-body transition-colors duration-200 font-sans">
    
    <aside class="w-64 bg-sidebar-bg flex flex-col justify-between p-6 transition-colors duration-200">
      <div>
        <div class="flex items-center gap-3 mb-10 px-2">
          <div class="w-9 h-9 bg-sidebar-text-active rounded-lg flex items-center justify-center text-sidebar-bg shadow-sm">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <span class="text-sidebar-text-active font-bold text-xl tracking-wide">AdminCore</span>
        </div>
        
        <nav class="space-y-2">
          <a href="#" class="flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm text-sidebar-text-inactive hover:bg-white/5 hover:text-sidebar-text-active transition-all">
            <svg class="w-5 h-5 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            Dashboard
          </a>
          <a href="#" class="flex items-center justify-between px-4 py-3 rounded-xl text-sm bg-sidebar-item-active-bg text-sidebar-text-active font-semibold shadow-inner transition-all">
            <div class="flex items-center gap-3.5">
              <svg class="w-5 h-5 text-sidebar-text-active" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              Users
            </div>
            <div class="w-1.5 h-1.5 bg-sidebar-text-active rounded-full opacity-80"></div>
          </a>
          <a href="#" class="flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm text-sidebar-text-inactive hover:bg-white/5 hover:text-sidebar-text-active transition-all">
            <svg class="w-5 h-5 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            Roles & Permissions
          </a>
          <a href="#" class="flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm text-sidebar-text-inactive hover:bg-white/5 hover:text-sidebar-text-active transition-all">
            <svg class="w-5 h-5 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            Security
          </a>
          <a href="#" class="flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm text-sidebar-text-inactive hover:bg-white/5 hover:text-sidebar-text-active transition-all">
            <svg class="w-5 h-5 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            Settings
          </a>
        </nav>
      </div>

      <div class="flex items-center gap-3.5 pt-6 transition-colors duration-200">
        <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-sidebar-text-active font-bold text-sm">JD</div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold text-sidebar-text-active leading-tight truncate">James Doe</p>
          <p class="text-xs text-sidebar-text-inactive truncate mt-0.5">Super Admin</p>
        </div>
      </div>
    </aside>

    <div class="flex-1 flex flex-col min-w-0">
      
      <header class="h-[72px] bg-surface-card border-b border-text-body/10 flex items-center justify-between px-8 transition-colors duration-200 shadow-sm z-10 relative">
        <div class="w-full max-w-md relative">
          <svg class="w-4 h-4 text-text-body/50 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input type="text" placeholder="Search users, emails..." class="w-full pl-11 pr-4 py-2.5 bg-surface-main rounded-button text-sm text-text-title placeholder-text-body/50 focus:outline-none focus:ring-1 focus:ring-brand-primary transition-colors" />
        </div>
        
        <div class="flex items-center gap-6">          
          <button class="text-text-body/70 hover:text-text-title transition-colors relative p-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
            <span class="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-surface-card"></span>
          </button>
          
          <div class="w-px h-6 bg-text-body/15"></div>

          <div class="flex items-center gap-3 cursor-pointer">
            <div class="w-9 h-9 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">JD</div>
            <div class="leading-tight hidden sm:block">
              <p class="text-sm font-semibold text-text-title">James Doe</p>
              <p class="text-xs text-text-body mt-0.5">Super Admin</p>
            </div>
            <svg class="w-4 h-4 text-text-body mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </header>

      <main class="flex-1 p-8 overflow-y-auto bg-surface-main transition-colors duration-200">
        <!-- Theme Controller -->
        <section class="mb-8 bg-surface-card rounded-card shadow-sm border border-text-body/5 overflow-hidden transition-all duration-200">
          <div class="p-5 border-b border-text-body/10 flex items-center justify-between gap-4">
            <div>
              <h1 class="text-[26px] font-bold text-text-title tracking-tight">Headless Theme Controller</h1>
              <p class="text-sm text-text-body mt-1">
                Active theme from Backend:
                <span class="font-semibold text-text-title capitalize">{{ activeThemeName ?? '—' }}</span>
              </p>
            </div>
            <button
              @click="toggleThemeFromBackend"
              :disabled="themeLoading || !activeThemeName"
              class="bg-brand-primary text-white px-4 py-2.5 rounded-button text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-all shrink-0"
            >
              {{ applyButtonLabel }}
            </button>
          </div>

          <div class="p-5">
            <p v-if="themeError" class="text-sm text-red-500 mb-3">{{ themeError }}</p>
            <pre
              v-if="themeTokens"
              class="text-xs font-mono bg-surface-main p-4 rounded-button overflow-x-auto text-text-body border border-text-body/10"
            >{{ JSON.stringify(themeTokens, null, 2) }}</pre>
            <p v-else class="text-sm text-text-body">Loading tokens...</p>
          </div>
        </section>
        
        <div class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-[26px] font-bold text-text-title tracking-tight">User Directory</h1>
            <p class="text-sm text-text-body mt-1">Manage and monitor all user accounts across your workspace.</p>
          </div>
          <button class="bg-brand-primary text-white px-5 py-2.5 rounded-button font-medium text-sm shadow-sm hover:opacity-90 transition-all flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
            Add New User
          </button>
        </div>

        <div class="grid grid-cols-3 gap-6 mb-8">
          <div class="bg-surface-card p-6 rounded-card shadow-sm border border-text-body/5 transition-all duration-200">
            <div class="flex justify-between items-start">
              <div class="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              </div>
              <span class="px-2.5 py-1 bg-status-success-bg text-status-success-text text-xs font-semibold rounded-full flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                +12.5%
              </span>
            </div>
            <h3 class="text-3xl font-extrabold text-text-title mt-5 tracking-tight">4,238</h3>
            <p class="text-sm font-medium text-text-body mt-1">Total Users</p>
          </div>
          <div class="bg-surface-card p-6 rounded-card shadow-sm border border-text-body/5 transition-all duration-200">
            <div class="flex justify-between items-start">
              <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
              </div>
              <span class="px-2.5 py-1 bg-status-success-bg text-status-success-text text-xs font-semibold rounded-full flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                +8.1%
              </span>
            </div>
            <h3 class="text-3xl font-extrabold text-text-title mt-5 tracking-tight">3,691</h3>
            <p class="text-sm font-medium text-text-body mt-1">Active Members</p>
          </div>
          <div class="bg-surface-card p-6 rounded-card shadow-sm border border-text-body/5 transition-all duration-200">
            <div class="flex justify-between items-start">
              <div class="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <span class="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-1"></span>
            </div>
            <h3 class="text-3xl font-extrabold text-text-title mt-5 tracking-tight">47</h3>
            <p class="text-sm font-medium text-text-body mt-1">Pending Approvals</p>
          </div>
        </div>

        <div class="bg-surface-card rounded-card shadow-sm border border-text-body/5 overflow-hidden transition-all duration-200">
          
          <div class="flex items-center justify-between p-5 border-b border-text-body/10">
            <div class="flex gap-4">
              <div class="relative w-64">
                <svg class="w-4 h-4 text-text-body/60 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <input type="text" placeholder="Filter users..." class="w-full pl-9 pr-4 py-2 border border-text-body/10 bg-surface-card rounded-button text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary" />
              </div>
              <select class="px-4 py-2 bg-surface-card text-text-title border border-text-body/10 text-sm rounded-button focus:outline-none">
                <option>Role</option>
              </select>
              <select class="px-4 py-2 bg-surface-card text-text-title border border-text-body/10 text-sm rounded-button focus:outline-none">
                <option>Status</option>
              </select>
            </div>
            <span class="text-sm text-text-body">2 of 6 users</span>
          </div>

          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="text-xs font-bold tracking-wider text-text-body/60 uppercase border-b border-text-body/10">
                <th class="px-6 py-4">User</th>
                <th class="px-6 py-4">Role</th>
                <th class="px-6 py-4">Status</th>
                <th class="px-6 py-4">Last Active</th>
                <th class="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-text-body/10 text-sm text-text-title/90">
              <tr v-for="user in users" :key="user.id" class="hover:bg-surface-main/30 transition-colors">
                <td class="px-6 py-4 flex items-center gap-3.5">
                  <div :class="user.initial === 'SJ' ? 'bg-brand-primary' : 'bg-amber-500'" class="w-9 h-9 text-white rounded-full flex items-center justify-center font-bold text-xs shadow-sm">
                    {{ user.initial }}
                  </div>
                  <div>
                    <p class="font-bold text-text-title">{{ user.name }}</p>
                    <p class="text-xs text-text-body mt-0.5">{{ user.email }}</p>
                  </div>
                </td>
                <td class="px-6 py-4 text-text-title font-medium">{{ user.role }}</td>
                <td class="px-6 py-4">
                  <span :class="user.status === 'Active' ? 'bg-status-success-bg text-status-success-text' : 'bg-status-warning-bg text-status-warning-text'" class="px-2.5 py-1 rounded-md text-xs font-bold transition-colors duration-200 flex inline-flex items-center gap-1.5">
                    <span :class="user.status === 'Active' ? 'bg-status-success-text' : 'bg-amber-500'" class="w-1.5 h-1.5 rounded-full"></span>
                    {{ user.status }}
                  </span>
                </td>
                <td class="px-6 py-4 text-text-body">{{ user.lastActive }}</td>
                <td class="px-6 py-4 text-right text-text-body/50 hover:text-text-title cursor-pointer text-xl p-2">
                  &#8942;
                </td>
              </tr>
            </tbody>
          </table>

          <div class="flex items-center justify-between p-5 border-t border-text-body/10">
            <span class="text-sm text-text-body">Showing 8 results</span>
            <div class="flex gap-1 text-sm font-medium">
              <button class="w-8 h-8 rounded-md bg-blue-900 text-white flex items-center justify-center shadow-sm">1</button>
              <button class="w-8 h-8 rounded-md text-text-body hover:bg-surface-main flex items-center justify-center">2</button>
              <button class="w-8 h-8 rounded-md text-text-body hover:bg-surface-main flex items-center justify-center">3</button>
            </div>
          </div>

        </div>

        <div class="pt-4 border-t border-slate-800/10 dark:border-slate-700/10 text-[11px] text-slate-500 text-center tracking-wide font-mono">
          Built with ❤️ by Long Tran • 2026
        </div>
      </main>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
font-sans {
  font-family: 'Inter', sans-serif;
}
</style>