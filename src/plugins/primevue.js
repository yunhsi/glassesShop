import Lara from '@primevue/themes/lara';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import OverlayBadge from 'primevue/overlaybadge';
import Badge from 'primevue/badge';
import Menu from 'primevue/menu';
import Card from 'primevue/card';
import Tag from 'primevue/tag';
import ProgressSpinner from 'primevue/progressspinner';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Select from 'primevue/select';
import Breadcrumb from 'primevue/breadcrumb';
import FloatLabel from 'primevue/floatlabel';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';

import 'primeicons/primeicons.css';

export default function installPrimeVue(app) {
  app.use(PrimeVue, {
    theme: {
      preset: Lara,
      options: {
        darkModeSelector: '.dark-mode'
      }
    }
  });

  app.use(ToastService);

  // ✅ 註冊 PrimeVue 元件
  app.component('VButton', Button);
  app.component('VMenubar', Menubar);
  app.component('VOverlayBadge', OverlayBadge);
  app.component('VBadge', Badge);
  app.component('VMenu', Menu);
  app.component('VCard', Card);
  app.component('VTag', Tag);
  app.component('VProgressSpinner', ProgressSpinner);
  app.component('VToast', Toast);
  app.component('VInputText', InputText);
  app.component('VInputNumber', InputNumber);
  app.component('VInputGroup', InputGroup);
  app.component('VInputGroupAddon', InputGroupAddon);
  app.component('VSelect', Select);
  app.component('VBreadcrumb', Breadcrumb);
  app.component('VFloatLabel', FloatLabel);
  app.component('VAccordion', Accordion);
  app.component('VAccordionPanel', AccordionPanel);
  app.component('VAccordionHeader', AccordionHeader);
  app.component('VAccordionContent', AccordionContent);
}
