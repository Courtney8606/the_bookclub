Set up instructions

cd into frontend folder
run npm install
run npm install react-router-dom@latest
run npm dev to start frontend server
cd into api folder
run pipenv install
run pipenv shell
run pipenv install Flask
run pipenv install psycopg
Create databases in your terminal: createdb bookclub & createdb test_bookclub
Seed databases: psql bookclub < seeds/bookclub.sql; psql test_bookclub < seeds/bookclub.sql
run python app.py to start the backend server
navigate to http://localhost:5173/

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
