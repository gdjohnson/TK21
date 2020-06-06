## Installing and running the server
1. `git clone`
2. `npm i`
3. `nodemon app.js`

## Adding new pages
1. Create a markdown file in /texts
2. All done! The index.js file will automatically detect the filename and add a listing to the homepage. The router will automatically detect the file and serve it up, e.g. 'signifiers.md' will be under `localhost:3000/texts/signifiers`.

## Creating composite pages
If you want to inject atomic components into a larger markdown page, use Markdownit's `.render` method.
```
const page = (
    textsTitle + textsList
    + conceptsTitle + conceptsList
  )
return md.render(page)
```

## CSS
Styling is injected as an HTML style tag; that tag is found in style.js. Since it exports as HTML, and markdownit's render function exports as HTML, the best option is just to concat them when calling Express's `res` method:
```
app.get('/', (req, res) => res.send(style + index.getHomePage()));
```
Here, `index.getHomePage()` returns a markdownit-rendered HTML string; that gets concatted onto the style tags, and Express renders the tags.

## Using Backlink Janitor
This service only works for [[simple-style]] wiki links. Hopefully we can fork and add the desired getfunctionality.
1. `yarn global add @andymatuschak/note-link-janitor`
2. `note-link-janitor /PATH/TK21/texts`

## Code style
This is a semicolon-free codebase! The only time to use semicolons is when you're running multiple methods on the same line, or similar compilation ambiguities.