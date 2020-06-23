# Movie Days / Filmanac

## Install

Run the following in order:

- `git clone https://github.com/markhoney/amoviefortoday.git`
- `yarn install`
- `yarn extras`

Next create a file called `.env` in the root of the repo, looking like this:

```env
GoogleAPIKey=XXXXXXX-XXXXXXXXXXXXXXXXXXXX-XXXXXXXXXX
GoogleSheetID=XXXXXXXXXXXXXXXXXXXXXXXXXX-XXXXXXXXXX-XXXXXX
OMDBAPIKey=XXXXXXXX
FanartTVKey=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
TheMovieDBKey=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Finally, to download and cache all required files, run:

- `yarn scrape`

## Run

- `yarn dev` to start a local dev server at `http://localhost:8080`
- `yarn deploy` to build a set of static files and push them to GitHub

## To Do

- Components
  - ~~Movie card view~~
    - ~~Use for categories~~
  - ~~Event card view~~
    - ~~Use for Days~~
  - ~~Movie full screen view~~
    - ~~Single Movie~~
  - Movie cover view
    - Genres, Studios, etc
      - Split by month with headers?
    - All movies?
  - Timeline view
    - All movies?
  - ~~Ratings~~
  - ~~Actors~~
  - ~~Director~~
  - ~~Rated~~

- Layout
  - Red curtain
    - Fixed top
      - Make 4k wide?
      - Centre
    - Variable sides
      - Tiled on the outside
  - ~~Dark body~~

- Stats
  - Google Analytics
