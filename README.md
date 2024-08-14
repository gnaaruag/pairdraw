## Pairdraw

PairDraw is a fun and interactive platform that allows users to send hand-drawn memos and doodles to their friends. PairDraw makes communication personal and creative via hand drawn sketches and memos

### Features

- Hand-drawn Memos: Express yourself through hand-drawn messages and doodles.
- Real-time Interaction: Send and receive messages in real-time, enhancing the immediacy of communication.
- User Authentication: Secure user authentication using ClerkAuth ensures privacy and data security.
- Persistent Data Storage: Messages are stored securely in a MongoDB database, ensuring reliability and accessibility.

### - Technology Stack: 
Built using modern web technologies including 
- React
- Node.js
- Express
- MongoDB
- TypeScript.

A third party Auth service [clerk.com](clerk.com) was also used

### Environment Variable Setup

#### React App
create a .env.local file in /pairdraw-front directory with following entries
```
VITE_CLERK_PUBLISHABLE_KEY=<YOUR_CLERK_PUBLISHABLE_KEY>
VITE_API_ENDPOINT=<YOUR_API_URL_ENDPOINT>
```
#### Express API
create a .env file in /pairdraw-back directory with following entries
```
PORT = <PORT VALUE>
DB=<MONGODB_INSTANCE_URI>
```

### React App Setup

Step 1
```
cd pairdraw-front
```

Step 2
```
npm install
```

Step 3
```
npm start
```

in another terminal instance run the following
```
npm run tailwind
```

### Express API Setup

Step 1
```
cd pairdraw-back
```

Step 2
```
npm install
```

Step 3
```
npm start
```
or 
```
npm run dev
```

Both services have docker configs too  

### Usage
1. Sign up for an account on PairDraw.
2. Log in using your credentials.
3. Create a pair from New Pair tab
4. Find the invite code for the created pair inside the pairing
5. Send it to friends as an invite to the pairing
6. Communicate via hand drawn memos

### Contributing
Contributions are welcome! If you'd like to contribute to PairDraw, please fork the repository and create a pull request with your proposed changes.

### Examples

##### You can access all your pairings under the pairlist tab
![image](https://github.com/gnaaruag/pairdraw/assets/68043860/e5dd4951-b986-4bdb-a550-088b9e91deea)
##### In any given pairing you can draw a doodle and send it to your friend (access it via your canvas under pairlist tab)
![image](https://github.com/gnaaruag/pairdraw/assets/68043860/60182276-0f80-44f5-af52-069dd98289db)
##### You can see the memo/doodle your pairing has sent under the pair canvas tab
![image](https://github.com/gnaaruag/pairdraw/assets/68043860/50e0c084-65b1-4159-8e7c-dd70d7920845)
##### There is a freedraw mode where you can draw doodles without having to be in a pair
![image](https://github.com/gnaaruag/pairdraw/assets/68043860/76b100e8-6314-4619-9e9a-880018774446)


### Caveats/ Points to note

- The Express API has been hosted on a free render instance. so before using the application i would recommend you open the url [pairdraw.onrender.com](https://pairdraw.onrender.com)
- When you sent a new memo, your old memo gets overriden (this is keeping in mind space constraints of the free tier mongo instance)
- the drawing ux on mobile is not very fun, would recommend using the site on a pc browser (owing to the mobile browser's canvas behaviour)

Visit PairDraw at [pairdraw.vercel.app](https://pairdraw.vercel.app) 


