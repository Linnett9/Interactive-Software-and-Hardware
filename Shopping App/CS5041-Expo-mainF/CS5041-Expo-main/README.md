# Shopping list
This is a shopping list application built with Expo and React Native Paper, so it runs on iOS, Android, and the web.

Its features include:
* Sharing a shopping list with a group of users.
* Categorising the list.
* Assigning shopping items to different users.
* Tracking how many five-a-day items are in your shop.
* Splitting bills between members.
* Remembering a history of what you bought, so you can quickly re-add things you need to buy again.

## Running
As of October 2023, the St Andrews CS lab machines run Node v16.20.2 and NPM v8.19.4. If you are not working on a lab machine, you can use [Volta](https://volta.sh) to configure your local Node environment to match the lab. Run `curl https://get.volta.sh | bash`, then you should see the correct Node version is installed and used automatically when you are working on this project (check by running `node --version`).

1. Install dependencies with `npm install`.
2. Supply your Firebase access token in the environment variable `EXPO_PUBLIC_FIREBASE_TOKEN`.
3. Run the application locally using `npm start`, then follow the instructions to select Android, iOS, or web or enable development mode.
4. Visit the app at http://localhost:8081/dev and press "Create catalogue of known items". For testing purposes, there is also a button there to re-set the database if you need to.
   * The port may vary: check your console output for the exact hostname and port to use.
5. Start using the app at http://localhost:8081.
   * Again, the port may vary: check your console output for the exact hostname and port to use.

You can do steps 2 and 3 at the same time by running `EXPO_PUBLIC_FIREBASE_TOKEN=token-here npm start`. 

For development purposes, there is a button to clear the database at `/dev`.

If you modify source code while the app is running and your web browser hot-reloads the page, you will probably run into a bug when you add new list items. The bug is that new items appear visually many times, but are actually only stored once. To fix this, refresh the page in your browser. To prevent this, after a hot-reload happens, manually refresh the page in your browser.

## Database schema
The database schema is described in `schema.json`. The object in the `content` field needs to be converted to a string before being passed to Firebase.