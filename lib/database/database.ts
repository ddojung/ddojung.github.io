import firebase from 'firebase/app';
import { IMenuTitleElement } from '../../models/interface/IMenuTitle';

export const instanceF = async () => {
  await import('firebase/firestore');

  return firebase.firestore();
};

export async function setPost<T>(collection: string, doc: string, data: T): Promise<boolean> {
  const result = await instanceF().then(firestore => {
    return firestore
      .collection(collection)
      .doc(decodeURI(doc))
      .set(data, { merge: true })
      .then(() => true)
      .catch(err => {
        console.error(err);
        return false;
      });
  });

  return result;
}

export async function delPost(collection: string, doc: string): Promise<boolean> {
  const result = await instanceF().then(firestore => {
    return firestore
      .collection(collection)
      .doc(decodeURI(doc))
      .delete()
      .then(() => true)
      .catch(err => {
        console.error(err);
        return false;
      });
  });

  return result;
}

export async function getPost<T>(collection: string, doc: string): Promise<T | Error> {
  const result = await instanceF().then(firestore => {
    return firestore
      .collection(collection)
      .doc(doc)
      .get()
      .then(doc => {
        if (doc.exists) {
          return doc.data() as T;
        }
        return new Error('Data is not exist');
      })
      .catch(err => {
        console.log(err);
        return new Error('Data Get Fail');
      });
  });

  return result;
}

export async function getPostTitle(collection: string): Promise<IMenuTitleElement[] | Error> {
  const result = await instanceF().then(firestore => {
    return firestore
      .collection(collection)
      .get()
      .then(collection => {
        if (collection.empty) {
          return [];
        }

        const datas = collection.docs.map(doc => {
          return {
            id: doc.data().id,
            title: doc.data().title,
          } as IMenuTitleElement;
        });

        return datas;
      })
      .catch(err => {
        console.log(err);
        return new Error('Data Get Fail');
      });
  });

  return result;
}
