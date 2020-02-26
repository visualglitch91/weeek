![weeek](https://i.imgur.com/WfY3IzC.png?1)

This a nice and pretty and cute to-do list that I did because I hated all the others.

I want to plan stuff I have to do in the week without setting a specific day (I don't know, I just work better this way).

You won't find tests here and yeah, you can judge me, I would too, but I did this during the night, exploring what I could do with Ionic and Firebase, which I've never used before, so it's basicaly and experimentation that went way too well.

Also because of this I didn't care about performance AT ALL, we are always getting everything from firebase and looping though it a few times. I don't think it's gonna become a problem anytime soon, and even if it does, it would be easy to limit the data to a short range.

You can run it with or without firebase, if you want firebase, just set the following env vars:

```
REACT_APP_USE_FIREBASE=1
REACT_APP_API_KEY=YOUR_API_KEY
REACT_APP_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
REACT_APP_DATABASE_URL=YOUR_DATABASE_URL
REACT_APP_PROJECT_ID=YOUR_PROJECT_ID
REACT_APP_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
REACT_APP_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
REACT_APP_APP_ID=YOUR_APP_ID
```

The firestore rules should be this (or at least I think they should, I have no idea what I'm doing here)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{id} {
      allow read, update, delete: if request.auth.uid == resource.data.user;
      allow create: if request.auth.uid != null && request.resource.data.user == request.auth.uid;
    }
     match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

Anyway, in gereneral, this is a standard create-react-app project, so just run `yarn` to install dependencies, `yarn start` to start the development server and `yarn build` to build the production files.
