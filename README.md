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
