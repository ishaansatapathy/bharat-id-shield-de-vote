// IndexedDB helper for storing user profiles and documents

export type UserProfile = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  createdAt: number
}

const DB_NAME = 'bharat-id'
const DB_VERSION = 2
const STORE_USERS = 'users'
const STORE_DOCS = 'documents'
const STORE_AUTH = 'auth'

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE_USERS)) {
        const users = db.createObjectStore(STORE_USERS, { keyPath: 'id' })
        users.createIndex('phone', 'phone', { unique: true })
        users.createIndex('email', 'email', { unique: false })
      }
      if (!db.objectStoreNames.contains(STORE_DOCS)) {
        db.createObjectStore(STORE_DOCS, { keyPath: 'id' })
      }
      if (!db.objectStoreNames.contains(STORE_AUTH)) {
        const auth = db.createObjectStore(STORE_AUTH, { keyPath: 'phone' })
        auth.createIndex('phone', 'phone', { unique: true })
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

export async function saveUser(profile: UserProfile): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_USERS], 'readwrite')
    tx.objectStore(STORE_USERS).put(profile)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function getUserByPhone(phone: string): Promise<UserProfile | undefined> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_USERS], 'readonly')
    const idx = tx.objectStore(STORE_USERS).index('phone')
    const req = idx.get(phone)
    req.onsuccess = () => resolve(req.result as UserProfile | undefined)
    req.onerror = () => reject(req.error)
  })
}

export async function saveDocument(id: string, data: unknown): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_DOCS], 'readwrite')
    tx.objectStore(STORE_DOCS).put({ id, data, createdAt: Date.now() })
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// PIN auth helpers
export async function savePinHash(phone: string, pinHash: string): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_AUTH], 'readwrite')
    tx.objectStore(STORE_AUTH).put({ phone, pinHash })
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function getPinHash(phone: string): Promise<string | undefined> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_AUTH], 'readonly')
    const req = tx.objectStore(STORE_AUTH).get(phone)
    req.onsuccess = () => resolve(req.result?.pinHash as string | undefined)
    req.onerror = () => reject(req.error)
  })
}

export async function hashPin(pin: string): Promise<string> {
  const enc = new TextEncoder().encode(pin)
  const digest = await crypto.subtle.digest('SHA-256', enc)
  const bytes = Array.from(new Uint8Array(digest))
  return bytes.map(b => b.toString(16).padStart(2, '0')).join('')
}


