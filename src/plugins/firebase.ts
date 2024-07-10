import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  onValue,
  update,
  push,
  ref,
  set,
  get,
} from 'firebase/database';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  getAuth,
  signOut,
  User,
} from 'firebase/auth';

// Import environment variables
import {
  VITE_MESSAGING_SENDER_ID,
  VITE_STORAGE_BUCKET,
  VITE_AUTH_DOMAIN,
  VITE_PROJECT_ID,
  VITE_API_KEY,
  VITE_APP_ID,
} from '../constanst/env';
import { GetDB, NewUser, SetDB, UpdateData } from '../types';

// Firebase configuration
const firebaseConfig = {
  messagingSenderId: VITE_MESSAGING_SENDER_ID,
  storageBucket: VITE_STORAGE_BUCKET,
  authDomain: VITE_AUTH_DOMAIN,
  projectId: VITE_PROJECT_ID,
  apiKey: VITE_API_KEY,
  appId: VITE_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);

export const authStateChange = onAuthStateChanged.bind(null, auth);

export const logout = signOut.bind(null, auth);

export const signInWithEmailAndPass = async (
  email: string,
  password: string,
) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  const rootPath = `users/${user.uid}/profile`;
  const userRef = ref(db, rootPath);
  const userProfile = await get(userRef);

  return {
    ...user,
    ...userProfile.val(),
  } as User;
};

export const createAccount = async ({ email, password, fullName }: NewUser) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  const rootPath = `users/${user.uid}/profile`;
  const pushRef = ref(db, rootPath);

  const newUser: Partial<User> = {
    displayName: fullName.trim().toLowerCase(),
    email: user.email,
    emailVerified: user.emailVerified,
  };

  console.log('newUser', newUser);

  await set(pushRef, newUser);

  return { ...user, newUser } as User;
};

export const resetPassword = sendPasswordResetEmail.bind(null, auth);

export const getDB: GetDB = (path, userId, snapshot, error) => {
  const rootPath = `users/${userId}/${path}`;
  const starCountRef = ref(db, rootPath);

  return onValue(starCountRef, snapshot, error);
};

export const setDB: SetDB = async <T>(path: string, data: T) => {
  try {
    const rootPath = `users/${auth.currentUser?.uid}/${path}`;
    const pushRef = push(ref(db, rootPath));
    const newData = { uid: pushRef.key, ...data };

    await set(pushRef, newData);

    return newData as T;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateData: UpdateData = (path, data) => {
  let updates: Record<string, unknown> = {};
  const rootPath = `users/${auth.currentUser?.uid}`;
  const dbRef = ref(db);

  if (!data && typeof path === 'object') {
    updates = Object.entries(path).reduce(
      (acc, [updatePath, value]) => ({
        ...acc,
        [`${rootPath}/${updatePath}`]: value,
      }),
      {},
    );
  }

  if (typeof path === 'string') {
    updates[`${rootPath}/${path}`] = data;
  }

  update(dbRef, updates);
};
