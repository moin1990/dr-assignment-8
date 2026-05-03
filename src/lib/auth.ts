import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

function createAuth() {
  const client = new MongoClient(process.env.MONGODB_URI!);
  const db = client.db();

  return betterAuth({
    database: mongodbAdapter(db),
    secret: process.env.BETTER_AUTH_SECRET!,
    baseURL: process.env.BETTER_AUTH_URL!,
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      },
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // 1 day
    },
    user: {
      additionalFields: {
        image: {
          type: "string",
          required: false,
        },
      },
    },
  });
}

type AuthInstance = ReturnType<typeof createAuth>;

let cached: AuthInstance | undefined;

function getAuth(): AuthInstance {
  if (!cached) cached = createAuth();
  return cached;
}

export const auth: AuthInstance = new Proxy({} as AuthInstance, {
  get(_target, prop) {
    const instance = getAuth();
    return Reflect.get(instance, prop, instance);
  },
  has(_target, prop) {
    return Reflect.has(getAuth(), prop);
  },
  ownKeys() {
    return Reflect.ownKeys(getAuth());
  },
  getOwnPropertyDescriptor(_target, prop) {
    return Reflect.getOwnPropertyDescriptor(getAuth(), prop);
  },
});

export type Auth = AuthInstance;
