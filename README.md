# martins-movies
## Overview
A small web application built to demonstrate skills.
## Original Brief
```
Martin's Movies is a client who reviews movies online. They have moved all of their movies to an online movie database which is only accessible via an API.

They need to:
- build a new paginated listing page to pull all data from their new database
- allow customers to search by different movie attributes which are:
  - Keyword
- mark a movie as 'watched' so when they open the listing page again in the same browser it will still be marked as 'watched'

Martin's Movies would like to link the Read More button for each movie off to the IMDB page if the imdb_id is set for a movie.

He would like the design to match a theme he liked but make all make all links a dead link (eg <a href="#">x</a>) for now:

https://gnodesign.com/templates/movify/movie-grid3.html (feel free to put a centered search bar just above the listing for search)

Deliverables:
- a ReactJS/NextJS App broken up as you see fit (languages isn't too important so TS is fine too)

We are using The Movie Database which is located here:

https://developers.themoviedb.org/3/getting-started/introduction
You can sign up for a free account to get an API key.

Feel free to copy the CSS and repurpose for the test, not looking for everything to be pixel perfect and written from scratch.
```
# martins-movies
## Overview
A small web application built to demonstrate skills.
## Original Brief
```
Martin's Movies is a client who reviews movies online. They have moved all of their movies to an online movie database which is only accessible via an API.

They need to:
- build a new paginated listing page to pull all data from their new database
- allow customers to search by different movie attributes which are:
  - Keyword
- mark a movie as 'watched' so when they open the listing page again in the same browser it will still be marked as 'watched'

Martin's Movies would like to link the Read More button for each movie off to the IMDB page if the imdb_id is set for a movie.

He would like the design to match a theme he liked but make all make all links a dead link (eg <a href="#">x</a>) for now:

https://gnodesign.com/templates/movify/movie-grid3.html (feel free to put a centered search bar just above the listing for search)

Deliverables:
- a ReactJS/NextJS App broken up as you see fit (languages isn't too important so TS is fine too)

We are using The Movie Database which is located here:

https://developers.themoviedb.org/3/getting-started/introduction
You can sign up for a free account to get an API key.

Feel free to copy the CSS and repurpose for the test, not looking for everything to be pixel perfect and written from scratch.
```

– SSR NextJS application. 


## Project Plan
There are a few ways to implement the above. I could implement a static NextJS application which simply fetches the movies from The Movie DB API with pagination. There isn't an explicit request to host this application.

However, as this is a demonstration of skills, for the sake of this exercise I will be creating the following:
Application 
– SSR NextJS application. 
- Framework will be a decomposed extration of the markup from the movie listing provided.
- Reusable architecture with tiles and list components.
- It has been requested the links be dead links; no movies to be played or individual pages to be linked to.
- FE will injest GET vars and resume bookmarked search term/s and pagination index.
- Cookies will be leverages for marking movies as watched.
  - Important note: this will be built for an Australian Audience, so no GDPR cookie usage consent will be provisioned for.
 
Integrations
- Upon initial client request, NextJS will injest GET variables and make a request to The Movie DB API.
- NextJS should make future requests to the server API 

Hosting
- Simple AWS EC2 Hosting.
- Bare minimum firewall, elastic IP, load balancing.
- Cloudflare DNS.
- No use of blue/green hosting.

CI/CD
- Github actions.
- No use of blue/green pipelines.
- Gitflow version control process.

## Post-Development Summary

This project was developed iteratively, with the following key milestones:

1. Initial commit and project brief documentation
2. Next.js app initialization and configuration
3. Implementation of SSR logic and pretty URLs for search and pagination
4. Addition of Github Actions for CI/CD and deployment
5. Creation of API utility functions for TMDB integration
6. MoviesList component for displaying and searching movies, with throttled search
7. Theming and UI improvements, including MovieTile and MovieAccordion components
8. Smart pagination with ellipsis and deduplication
9. Genre fetching and mapping for human-readable categories
10. Internal Next.js API routes to hide API keys and secure backend logic
11. Loading animations for grid and list views
12. 'Watched' functionality using cookies, with UI in both grid and list layouts

The application works as follows:
* On initial load, the server fetches movies and genres from TMDB and renders the page with SSR.
* The MoviesList component handles SPA navigation, search, and pagination, calling internal API routes for all data.
* Users can search by keyword or click on genre badges to filter by genre.
* Each movie can be marked as 'Watched' using a persistent cookie, and this state is reflected in both grid and list views.
* All API keys and sensitive logic are kept server-side.

## Installation Instructions

Requirements:
* Node.js v22.17.1
* npm v10.9.2
* Next.js v15.4.3

Install dependencies:
```sh
npm install
```

Set up environment variables in a `.env.local` file:
```sh
TMDB_API_ROOT=https://api.themoviedb.org
TMDB_API_ACCESS_TOKEN=your_tmdb_access_token
TMDB_API_KEY=your_tmdb_api_key
```

Run the development server:
```sh
npm run dev
```

Build for production:
```sh
npm run build
npm start
```

## Additional Notes

* All movie and genre data is fetched from The Movie Database (TMDB) API.
* The 'Watched' state is stored in a cookie named `watchedMovies` as a JSON array of movie IDs.
* All API requests from the frontend go through internal Next.js API routes to keep credentials secure.
* The UI is based on the Movify theme, with custom components for grid and list layouts.
* Pagination is capped at 500 pages due to TMDB API limitations.
* No GDPR consent is implemented, as the app is intended for an Australian audience.
* For deployment, see the included Github Actions workflow and AWS/Cloudflare notes in the project plan.

