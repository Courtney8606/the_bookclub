Set up instructions

1) cd into frontend folder
2) run npm install
3) run npm install react-router-dom@latest
4) run npm dev to start frontend server
5) cd into api folder
6) run pipenv install
7) run pipenv shell
8) run pipenv install Flask
9) run pipenv install psycopg
10) Create databases in your terminal: createdb bookclub & createdb test_bookclub
11) Seed databases: psql bookclub < seeds/bookclub.sql; psql test_bookclub < seeds/bookclub.sql
12) run python app.py to start the backend server
13) navigate to http://localhost:5173/

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
