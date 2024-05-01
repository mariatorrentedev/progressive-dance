export type User = {
  id: string;
  name: string;
  email?: string;
  pictureUrl: string;
};

export type BackendEnvironment = {
  authentication: {
    login: () => Promise<void>;
    logout: () => void | Promise<void>;
    saveUser: () => Promise<User>;
  };
};

type LoadableData<T> = {
  value: T | null;
  isLoading: boolean;
};

// Data for the client, to be loaded & provided to the app's DataContext.
export type AppData = {
  user: LoadableData<User>;
};
