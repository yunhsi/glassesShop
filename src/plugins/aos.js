import AOS from 'aos';
import 'aos/dist/aos.css';

export default function installAOS() {
  AOS.init({
    once: false
  });
}
