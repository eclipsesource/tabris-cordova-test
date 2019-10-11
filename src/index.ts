import {Button, Page, NavigationView, ScrollView, contentView} from 'tabris';
import SharingPage from './SharingPage';
import MotionPage from './MotionPage';
import NetworkPage from './NetworkPage';
import MediaPage from './MediaPage';
//import CameraPage from './CameraPage';
//import BarcodeScannerPage from './BarcodeScannerPage';


(window as any).MediaError = Error;

let navigationView = new NavigationView({left: 0, top: 0, right: 0, bottom: 0})
  .appendTo(contentView);

let mainPage = new Page({
  title: 'Cordova Examples'
}).appendTo(navigationView);

let contentContainer = new ScrollView({
  left: 0, top: 0, right: 0, bottom: 0
}).appendTo(mainPage);

[
  SharingPage,
  MotionPage,
  NetworkPage,
  //CameraPage, // broken and superseded by the 3.2 camera API
  //BarcodeScannerPage, // TODO: broken, replace with tabris-plugin-barcode-scanner
  MediaPage,
].forEach(Page => {
  let page = new Page({});
  addPageSelector(page);
});

function addPageSelector(page) {
  new Button({
    left: 16, top: 'prev() 8', right: 16,
    text: page.title
  }).on('select', () => page.appendTo(navigationView))
    .appendTo(contentContainer);
}
