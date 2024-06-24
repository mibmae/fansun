// == Import : npm
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// == Import : local
// Composants
import App from 'src/components/App';
// Store
import store from 'src/store';

// == Render
// 1. Élément React racine (celui qui contient l'ensemble de l'app)
//    => crée une structure d'objets imbriqués (DOM virtuel)
const rootReactElement = (
  <Provider store={store}>
    <Router>
    <App />
    </Router>
  </Provider>
);
// 2. La cible du DOM (là où la structure doit prendre vie dans le DOM)
const target = document.getElementById('root');
const root = createRoot(target);
// 3. Déclenchement du rendu de React (virtuel) => DOM (page web)
root.render(rootReactElement);
