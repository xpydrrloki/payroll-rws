import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface User {
  id: number;
  username: string;
  name: string;
  role: string;
  token?: string;
}

type State = {
  user: User;
};

interface AuthAction {
  loginAction: (user: User) => void;
  logoutAction: () => void;
}
export const useAuthStore = create<State & AuthAction>()(
  persist(
    (set, get) => ({
      user: {
        id: 0,
        name: '',
        role: '',
        username: '',
        token: '',
      },
      loginAction: (user: User) =>
        set((state) => {
          state.user = user;
          return state;
        }),
      logoutAction: () => {
        set((state) => {
          state.user = { id: 0, name: '', role: '', username: '', token: '' };
          return state; 
        });
      },
    }),
    { name: 'userAuth' },
  ),
);
