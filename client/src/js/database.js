import { openDB } from "idb";
import "regenerator-runtime/runtime";

export const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database

// Export a function we will use to POST to the database.
export const postDb = async (name, email, phone, profile) => {
  console.log("Post to the database");

  // Create a connection to the database database and version we want to use.
  const contactDb = await openDB("contact_db", 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = contactDb.transaction("contact_db", "readwrite");

  // Open up the desired object store.
  const store = tx.objectStore("contacts");

  // Use the .add() method on the store and pass in the content.
  const request = store.add({
    name: name,
    email: email,
    phone: phone,
    profile: profile,
  });

  // Get confirmation of the request.
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

export const putDb = async (id, name, email, phone, profile) => {
  console.log("PUT to the database");

  const contactDb = await openDB("contact_db", 1);

  const tx = contactDb.transaction("contact_db", "readwrite");

  const store = tx.objectStore("contacts");

  const request = store.put({
    id: id,
    name: name,
    email: email,
    phone: phone,
    profile: profile,
  });
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

// console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET from the database");

  // Create a connection to the database database and version we want to use.
  const contactDb = await openDB("contact_db", 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = contactDb.transaction("contact_db", "readonly");

  // Open up the desired object store.
  const store = tx.objectStore("contacts");

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log("result.value", result);
  return result;
};

// console.error('getDb not implemented');

// EXPORTED DELETE function

export const deleteDb = async (id) => {
  console.log("DELETE from the database", id);

  // Create a connection to the database database and version we want to use.
  const contactDb = await openDB("contact_db", 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = contactDb.transaction("contact_db", "readwrite");

  // Open up the desired object store.
  const store = tx.objectStore("contacts");

  // Use the .delete() method to get all data in the database.
  const request = store.delete(id);

  // Get confirmation of the request.
  const result = await request;
  console.log("result.value", result);
  return result?.value;
};

// EXPORTED EDIT function
export const editDb = async (id, name, email, phone, profile) => {
  console.log("PUT to the database");

  const contactDb = await openDB("contact_db", 1);

  const tx = contactDb.transaction("contact_db", "readwrite");

  const store = tx.objectStore("contacts");

  const request = store.put({
    id: id,
    name: name,
    email: email,
    phone: phone,
    profile: profile,
  });
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

// initdb();
