## Installing and running the server
1. `git clone`
2. `npm i`
3. `nodemon app.js`

## Adding new pages
1. Create a markdown file in /texts
2. All done! The index.js file will automatically detect the filename and add a listing to the homepage. The router will automatically detect the file and serve it up, e.g. 'signifiers.md' will be under `localhost:3000/texts/signifiers`.

## Styling
Styling is injected as an HTML style tag; that tag is found in css.js 

## Using Backlink Janitor
This service only works for [[simple-style]] wiki links. Hopefully we can fork and add the desired getfunctionality.
1. `yarn global add @andymatuschak/note-link-janitor`
2. `note-link-janitor /PATH/TK21/texts`
