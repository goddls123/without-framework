import Applicahtion from './componets/Application.js';
import List from './componets/List.js';
import Footer from './componets/Footer.js';


window.customElements.define('todomvc-app', Applicahtion);
window.customElements.define('todomvc-list', List);
window.customElements.define('todomvc-footer', Footer);
