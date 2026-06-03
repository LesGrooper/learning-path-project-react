# React & React Native Learning Path (20 Hari)

**Prasyarat:** Familiar Angular, Ionic | **Target:** 1-2 jam/hari | **Output:** App live di Vercel + Lightsail AWS

---

## Phase 1 — React Core (Hari 1–7)

### Hari 1 — Mental Model Shift: Angular → React

**Fokus:** JSX, komponen, struktur project

| Angular | React |
|---|---|
| `@Component` decorator | Function component |
| `template`, `templateUrl` | JSX return |
| `NgModule` | Tidak ada (Vite/Next auto) |
| `*ngIf`, `*ngFor` | `{condition && <X/>}`, `.map()` |

**Praktik:** Buat project dengan Vite (`npm create vite@latest`), buat 3 komponen sederhana.

---

### Hari 2 — Props, State & Hooks

**Fokus:** useState, useEffect — padanan Angular

| Angular | React |
|---|---|
| `@Input()` | Props |
| `ngOnInit()` | `useEffect(() => {}, [])` |
| `Component state` | `useState()` |
| `ngOnDestroy()` | `useEffect` return cleanup |

**Praktik:** Counter app + fetch data dari public API.

---

### Hari 3 — Event Handling & Forms

**Fokus:** Controlled components vs Angular Reactive Forms

```jsx
// Angular: FormControl
// React: controlled input
const [val, setVal] = useState('');
<input value={val} onChange={e => setVal(e.target.value)} />
```

**Praktik:** Form registrasi dengan validasi manual.

---

### Hari 4 — React Router

**Fokus:** `react-router-dom` v6 vs Angular Router

| Angular | React Router v6 |
|---|---|
| `RouterModule.forRoot()` | `<BrowserRouter>` |
| `[routerLink]` | `<Link to="">` |
| `ActivatedRoute` | `useParams()`, `useSearchParams()` |
| `CanActivate` | Wrapper component (custom guard) |

**Praktik:** App 3 halaman dengan navigasi dan param.

---

### Hari 5 — State Management

**Fokus:** Context API + Zustand (skip Redux dulu)

**Padanan Angular:**
```
Angular Service + BehaviorSubject  →  React Context API (built-in, sederhana)
Angular NgRx Store                 →  Zustand / Redux Toolkit (scalable)
```

**Level 1 — Context API (built-in, tanpa library)**

Cocok untuk state sederhana: tema, bahasa, auth user.

```tsx
// AuthContext.tsx
const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)!;
```

```tsx
// Penggunaan di komponen mana saja
const { user, setUser } = useAuth();
```

> **Kelemahan Context:** setiap update re-render semua consumer. Jangan pakai untuk state yang sering berubah (form, counter, dsb).

---

**Level 2 — Zustand (recommended untuk production)**

Ringan, tidak butuh Provider, DevTools support.

```bash
npm install zustand
```

```ts
// store/authStore.ts
import { create } from 'zustand';

interface AuthStore {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  login: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
}));
```

```tsx
// Di komponen mana saja — tidak perlu Provider
const { user, login, logout } = useAuthStore();
```

**Persist ke localStorage (untuk web):**
```ts
import { persist } from 'zustand/middleware';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: 'auth-storage' } // key di localStorage
  )
);
```

---

**Kapan pakai apa:**

| Kebutuhan | Solusi |
|---|---|
| Theme / bahasa / auth sederhana | Context API |
| State global ringan, scalable | Zustand |
| Server state (API data, cache) | TanStack Query (Hari 6) |
| State kompleks dengan history/undo | Zustand + immer middleware |
| Tim besar, butuh strict pattern | Redux Toolkit |

**Praktik:** Auth store dengan Zustand (login, logout, persist), plus ThemeContext dengan Context API.

---

### Hari 6 — Data Fetching

**Fokus:** React Query (TanStack Query) vs Angular HttpClient + RxJS

| Angular | React Query |
|---|---|
| `http.get()` + `subscribe()` | `useQuery()` |
| `switchMap`, `pipe` | `queryFn` async/await |
| Loading/error state manual | Built-in `isLoading`, `isError` |
| `async` pipe | `data` dari hook |

**Praktik:** List + detail page dengan React Query.

---

### Hari 7 — Mini Project (Checkpoint 1)

**Bangun:** Todo/Task Manager App
- CRUD lengkap
- React Router (list, form, detail)
- Zustand untuk state
- React Query untuk API (gunakan JSONPlaceholder)
- Deploy preview ke **Vercel** (drag & drop folder `dist`)

---

## Phase 2 — Next.js + Deploy ke Vercel (Hari 8–11)

### Hari 8 — Next.js Fundamentals

**Kenapa Next.js:** SSR/SSG = SEO, Vercel-native, App Router modern

```
Vite (SPA)   → seperti Angular standalone
Next.js      → seperti Angular Universal (SSR)
```

**Fokus:** App Router, `page.tsx`, `layout.tsx`, file-based routing

---

### Hari 9 — Next.js API Routes & Data Fetching

**Fokus:** Server Components, `fetch` di server, API Routes

```
app/
├── page.tsx               ← Server Component (default)
├── api/
│   └── users/route.ts     ← REST endpoint built-in
└── (auth)/
    └── login/page.tsx     ← Route group
```

**Praktik:** Full-stack mini app — API route + fetch dari client.

---

### Hari 10 — Styling: Tailwind + CSS Modules

**Fokus:** Setup Tailwind di Next.js, utility-first vs SCSS Angular

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Praktik:** Redesign project Hari 7 dengan Tailwind.

---

### Hari 11 — Deploy Next.js ke Vercel (Production)

**Step:**
1. Push ke GitHub
2. Import repo di vercel.com
3. Set Environment Variables di Vercel dashboard
4. Custom domain (opsional)
5. Preview deployments per branch (seperti Netlify)

**Praktik:** Deploy Next.js app, setup env `NEXT_PUBLIC_API_URL`.

---

## Phase 3 — React Native + Expo (Hari 12–18)

### Hari 12 — Mental Model: Ionic → React Native

| Ionic | React Native + Expo |
|---|---|
| HTML tags (`<ion-button>`) | RN components (`<Button>`) |
| CSS styling | `StyleSheet.create({})` |
| Cordova/Capacitor plugins | Expo SDK modules |
| Browser WebView | Native UI engine |
| `ionic serve` | `npx expo start` |

**Setup:**
```bash
npx create-expo-app@latest MyApp --template blank-typescript
```

---

### Hari 13 — Core Components & Layout

**Fokus:** Flexbox (default di RN), komponen dasar

| Web/Ionic | React Native |
|---|---|
| `<div>` | `<View>` |
| `<p>`, `<span>` | `<Text>` |
| `<img>` | `<Image>` |
| `<input>` | `<TextInput>` |
| `<ul>` + `<li>` | `<FlatList>` |
| `overflow: scroll` | `<ScrollView>` |

**Praktik:** Profile card + FlatList data list.

---

### Hari 14 — Navigation: React Navigation

**Fokus:** Stack + Tab Navigator vs Ionic NavController

```bash
npm install @react-navigation/native @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context
```

**Praktik:** App dengan Bottom Tab (Home, Profile, Settings) + Stack navigator dalam satu tab.

---

### Hari 15 — Native APIs dengan Expo SDK

**Fokus:** Camera, Location, Notifications, AsyncStorage

```bash
npx expo install expo-camera expo-location @react-native-async-storage/async-storage
```

**Padanan:** Capacitor/Cordova plugin → Expo module (lebih mudah, tidak perlu eject)

**Praktik:** App simpan data lokal + akses kamera.

---

### Hari 16 — State Management di React Native

**Fokus:** Zustand di RN — sama persis dengan React web, beda di storage engine

**Persist ke AsyncStorage (ganti localStorage):**

```bash
npx expo install @react-native-async-storage/async-storage
```

```ts
// store/authStore.ts — sama dengan versi web, ganti storage-nya saja
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage), // ← beda dari web
    }
  )
);
```

**Integrasi dengan React Navigation (protected routes):**

```tsx
function RootNavigator() {
  const { user } = useAuthStore();
  return user ? <AppStack /> : <AuthStack />;
}
```

**Praktik:** Auth flow lengkap — login persist saat app ditutup, logout clear semua state.

---

### Hari 17 — Styling Lanjutan: NativeWind

**Fokus:** Tailwind utility classes di React Native

```bash
npm install nativewind tailwindcss
```

```jsx
<View className="flex-1 bg-white p-4">
  <Text className="text-xl font-bold text-blue-600">Hello</Text>
</View>
```

**Praktik:** Redesign UI dari Hari 14 menggunakan NativeWind.

---

### Hari 18 — EAS Build & Release (Checkpoint 2)

**Fokus:** Expo Application Services — build cloud

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android  # APK/AAB
eas build --platform ios      # IPA (perlu Mac atau EAS cloud)
```

**Output:**
- `.apk` untuk Android testing
- Submit ke Play Store / App Store via `eas submit`

---

## Phase 4 — Production Full Stack (Hari 19–20)

### Hari 19 — Backend di AWS Lightsail

**Skenario:** Next.js API routes tidak cukup → butuh backend terpisah (Node.js/Express atau NestJS)

**Setup Lightsail:**
```
1. Buat instance Lightsail (Ubuntu 22.04, $5-10/bulan)
2. Install Node.js, PM2, Nginx
3. Setup SSL dengan Certbot
4. Deploy via GitHub Actions atau manual git pull
```

```nginx
# Nginx reverse proxy
server {
  server_name api.yourdomain.com;
  location / {
    proxy_pass http://localhost:3001;
  }
}
```

**Praktik:** Deploy Express API ke Lightsail, connect dari Next.js di Vercel via `NEXT_PUBLIC_API_URL`.

---

### Hari 20 — CI/CD & Production Checklist

**GitHub Actions untuk Lightsail:**
```yaml
name: Deploy API
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.LIGHTSAIL_IP }}
          username: ubuntu
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /app && git pull && npm install && pm2 restart api
```

**Production Checklist:**
- [ ] Environment variables aman (tidak di-commit)
- [ ] CORS dikonfigurasi di backend
- [ ] Rate limiting di API
- [ ] Error boundary di React
- [ ] Expo app build release (bukan debug)
- [ ] Vercel: preview branch aktif
- [ ] Lightsail: PM2 auto-restart, Nginx SSL aktif
- [ ] Custom domain terhubung ke Vercel + Lightsail

---

## Ringkasan Timeline

| Hari | Topik | Output |
|---|---|---|
| 1–3 | React core (JSX, hooks, forms) | Komponen dasar |
| 4–6 | Router, state, data fetching | App fungsional |
| 7 | Mini project | Deploy Vercel preview |
| 8–10 | Next.js + Tailwind | Full-stack app |
| 11 | Deploy Next.js | App live di Vercel |
| 12–14 | RN setup, layout, navigasi | Struktur app mobile |
| 15–17 | Native API, state, NativeWind | App mobile fungsional |
| 18 | EAS Build | APK siap distribusi |
| 19 | AWS Lightsail backend | API live di cloud |
| 20 | CI/CD + checklist | Full production stack |

---

---

## Appendix — State Management Deep Dive

### Peta Ekosistem

```
State di React terbagi dua kategori berbeda:

┌─────────────────────────────────────────────────────┐
│  CLIENT STATE                  SERVER STATE          │
│  (UI, form, auth, theme)       (API data, cache)    │
│                                                      │
│  Context API  ──── simple      TanStack Query        │
│  Zustand      ──── scalable    SWR                   │
│  Jotai        ──── atomic      RTK Query             │
│  Redux Toolkit ─── enterprise                        │
└─────────────────────────────────────────────────────┘
```

> Kesalahan umum pemula: pakai Redux/Zustand untuk data dari API — padahal itu sudah dihandle TanStack Query.

---

### Perbandingan Library Client State

| | Context API | Zustand | Jotai | Redux Toolkit |
|---|---|---|---|---|
| Bundle size | 0kb (built-in) | ~1kb | ~3kb | ~15kb |
| Boilerplate | Sedang | Minimal | Minimal | Tinggi |
| DevTools | Tidak | Ya | Ya | Ya (Redux DevTools) |
| Learning curve | Rendah | Rendah | Rendah | Tinggi |
| Cocok untuk | Auth, theme | 90% use case | Atomic state | Tim besar / enterprise |
| Padanan Angular | Service sederhana | Service + Subject | Signal | NgRx |

---

### Zustand — Pola Lanjutan

**Multiple stores (rekomendasi: pisah per domain):**

```ts
// store/uiStore.ts
export const useUIStore = create<UIStore>((set) => ({
  theme: 'light',
  sidebarOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
}));

// store/cartStore.ts
export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => set((s) => ({ items: [...s.items, item] })),
  total: () => get().items.reduce((sum, i) => sum + i.price, 0),
}));
```

**Immer middleware (mutasi state seperti NgRx Immer):**

```bash
npm install immer
```

```ts
import { immer } from 'zustand/middleware/immer';

const useStore = create<State>()(
  immer((set) => ({
    todos: [],
    addTodo: (text) =>
      set((state) => {
        state.todos.push({ id: Date.now(), text, done: false }); // mutasi langsung
      }),
    toggle: (id) =>
      set((state) => {
        const todo = state.todos.find((t) => t.id === id);
        if (todo) todo.done = !todo.done;
      }),
  }))
);
```

**Selector (hindari re-render tidak perlu):**

```ts
// Buruk — re-render setiap kali store berubah
const store = useCartStore();

// Baik — re-render hanya saat `items` berubah
const items = useCartStore((s) => s.items);
const total = useCartStore((s) => s.total());
```

---

### Redux Toolkit — Kapan Perlu?

Pakai Redux Toolkit jika:
- Tim > 5 orang yang butuh strict unidirectional data flow
- Butuh Redux DevTools time-travel debugging
- Sudah ada codebase Redux yang perlu dimigrasikan

```bash
npm install @reduxjs/toolkit react-redux
```

```ts
// store/todosSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    added: (state, action: PayloadAction<string>) => {
      state.push({ id: Date.now(), text: action.payload, done: false });
    },
    toggled: (state, action: PayloadAction<number>) => {
      const todo = state.find((t) => t.id === action.payload);
      if (todo) todo.done = !todo.done;
    },
  },
});

export const { added, toggled } = todosSlice.actions;
export default todosSlice.reducer;
```

```tsx
// Di komponen
const dispatch = useDispatch();
const todos = useSelector((state: RootState) => state.todos);

dispatch(added('Belajar React'));
```

---

### TanStack Query — Server State

Jangan simpan data API di Zustand/Redux. Biarkan TanStack Query yang handle cache, refetch, dan sinkronisasi.

```ts
// Query (GET)
const { data, isLoading, error } = useQuery({
  queryKey: ['todos'],
  queryFn: () => fetch('/api/todos').then(r => r.json()),
  staleTime: 1000 * 60 * 5, // cache 5 menit
});

// Mutation (POST/PUT/DELETE)
const mutation = useMutation({
  mutationFn: (newTodo: Todo) =>
    fetch('/api/todos', { method: 'POST', body: JSON.stringify(newTodo) }),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
});

mutation.mutate({ text: 'Todo baru' });
```

**Padanan Angular:**

| Angular | TanStack Query |
|---|---|
| `HttpClient` + `subscribe` | `useQuery` / `useMutation` |
| `shareReplay(1)` | `staleTime` |
| Manual loading state | `isLoading`, `isFetching` |
| Manual error handling | `isError`, `error` |
| `switchMap` cancel | `enabled: false` |

---

### Decision Tree — Pilih Solusi yang Tepat

```
State ini berasal dari API / server?
├── Ya  → TanStack Query
└── Tidak (UI state)
    ├── Hanya dipakai 1-2 komponen?  → useState lokal
    ├── Dipakai di banyak komponen?
    │   ├── Jarang berubah (theme, auth)?  → Context API
    │   └── Sering berubah / kompleks?     → Zustand
    └── Tim besar / butuh strict pattern?  → Redux Toolkit
```

---

## Resource Utama

- **React:** [react.dev](https://react.dev)
- **Next.js:** [nextjs.org/docs](https://nextjs.org/docs)
- **React Native:** [reactnative.dev](https://reactnative.dev)
- **Expo:** [docs.expo.dev](https://docs.expo.dev)
- **NativeWind:** [nativewind.dev](https://www.nativewind.dev)

**State Management:**
- **Zustand:** [zustand-demo.pmnd.rs](https://zustand-demo.pmnd.rs)
- **TanStack Query:** [tanstack.com/query](https://tanstack.com/query)
- **Redux Toolkit:** [redux-toolkit.js.org](https://redux-toolkit.js.org)
- **Jotai:** [jotai.org](https://jotai.org)
