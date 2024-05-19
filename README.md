# Nuxt JWT Authentication Demo

This project demonstrates a simple authentication solution for Nuxt3 applications. It includes basic functionality for user login, logout, and session management using JSON Web Token.

<img alt="Screenshot 1" src="./screenshot_1.png">

## ⚠️ Disclaimer

- **This specific implementation has not been audited for security!**

- This is just a *demo* of what I had tried to get working and is mainly for educational purposes and maybe small-scale projects. Use at your own risk only after reviewing the code yourself.


## 💡 Credits

1. The [damien-hl/nuxt3-auth-example](https://github.com/damien-hl/nuxt3-auth-example) project served as a very helpful resource. You should check it out. There are similarities to this reference project in my codebase. Thanks.


## 📋 Requirements

- NodeJS Version 20 or higher.


## 🏁 How to use it

1. Get dependencies with your package manager.

    ```sh
    yarn install
    ```

2. Generate a new SQLite database and add an account with the included script.

    ```sh
    node ./scripts/manage_db.js myusername mypassword
    ```

3. Copy the `.env.example` file to `.env`.

    ```sh
    cp .env.example .env
    ```

4. Change the secret value for the JSON Web Token. You can generate a sample one with the included script and use it as the value for `APP_JWT_SECRET` in `.env` fle.

    ```sh
    node ./scripts/generate_secret.js  # I am going to copy the output
    vi .env  # I am going to paste the output in this file
    ```

5. Start the development server and play around with it!

    ```sh
    yarn run dev
    ```