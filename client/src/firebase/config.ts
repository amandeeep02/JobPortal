import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBZNyGBFkSbxS7n_5rCUznQq_Pw4vI-_U4',
  authDomain: 'helper4u-jobs.firebaseapp.com',
  projectId: 'helper4u-jobs',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
