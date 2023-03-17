<!-- Please update value in the {}  -->

<h1 align="center">Authentication App</h1>

<div align="center">
   Solution for a challenge from  <a href="http://devchallenges.io" target="_blank">Devchallenges.io</a>.
</div>

<div align="center">
  <h3>
    <a href="https://shoppingify.vercel.app">
      Demo
    </a>
    <span> | </span>
    <a href="https://devchallenges.io/solutions/sDYdWiN1X1Xlgh02IY4I">
      Solution
    </a>
    <span> | </span>
    <a href="https://devchallenges.io/challenges/mGd5VpbO4JnzU6I9l96x">
      Challenge
    </a>
  </h3>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Table of Contents](#table-of-contents)
  - [Built With](#built-with)
- [Features](#features)
- [How To Use](#how-to-use)

<!-- OVERVIEW -->

### Built With

<!-- This section should list any major frameworks that you built your project using. Here are a few examples.-->

- [Nextjs](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org)
- [TailwindCSS](https://tailwindcss.com/)
- [SWR - for data fetching](https://swr.vercel.app)
- [Jotai - for global state management](https://jotai.org)
- [passportjs for authentication](https://passportjs.org)
- [mongoDB](https://mongodb.com)
- [headlessUI](https://headlessui.com)
- [Recharts](https://recharts.org)
  
## Features

<!-- List the features of your application or follow the template. Don't share the figma file here :) -->

This application/site was created as a submission to a [DevChallenges](https://devchallenges.io/challenges) challenge. The [challenge](https://devchallenges.io/challenges/mGd5VpbO4JnzU6I9l96x) was to build an application to complete the given user stories.

- User can register a new account
- User can log into an existing account
- User can create an item with name, image, description and category
- User can add categories 
- User can see list of items they have created
- User can add items to the current list
- User can increase or decrease the quantity of an item or delete it from the current list
- User can save or update the shopping list with a name
- User can mark shopping list is completed or cancelled
- User can see statistics of top items and categories, and their monthly comparisons
- User can search for an item

## How To Use

<!-- Example: -->

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/rd-trends/shoppingify

# Install dependencies
$ npm install

# Run the app
$ npm run dev
```

also

create a .env.local file in your root directory and add the following environment variables

```env
GOOGLE_CLIENT_ID = "your google client/app id"
GOOGLE_CLIENT_SECRET = "your google client/app secret"
MONGODB_URI = "your mongodb connection URI"
TOKEN_SECRET = "your session token secret"
```
