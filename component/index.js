import Applicahtion from './components/Application.js';
import List from './components/List.js';
import Footer from './components/Footer.js';


window.customElements.define('todomvc-app', Applicahtion);
window.customElements.define('todomvc-list', List);
window.customElements.define('todomvc-footer', Footer);
