import './logo.css';
import Logo from './logo.png';

const img = new Image();
img.classList.add('logo');
img.src = Logo;
document.body.appendChild(img);

export const logo = img;