import { Client, Account,Databases, Storage } from 'appwrite';

const client = new Client();
client.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);

export const database = new Databases(client);

export const storage = new Storage(client);