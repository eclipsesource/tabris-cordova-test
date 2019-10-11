import PluginPage from './PluginPage';
import {Button, ImageView} from 'tabris';

const TITLE = 'Camera';
const PLUGIN_ID = 'cordova-plugin-camera';
const PICTURE_BUTTON_TEXT = 'Take a picture';

export default class CameraPage extends PluginPage {

  constructor(properties) {
    super(Object.assign({pluginId: PLUGIN_ID, title: TITLE}, properties));
  }

  protected createUI() {
    super.createUI();
    this.content.append(
      new Button({id: 'pictureButton', text: PICTURE_BUTTON_TEXT})
        .on('select', () => this._takePicture()),
      new ImageView({id: 'image'})
    );
  }

  private _takePicture() {
    let onSuccess = image => this.find('#image').first(ImageView).image = image;
    let onFail = message => console.log('Camera failed because: ' + message);
    (navigator as any).camera.getPicture(onSuccess, onFail, {
      quality: 50,
      targetWidth: 1024,
      targetHeight: 1024,
      destinationType: (window as any).Camera.DestinationType.FILE_URI
    });
  }

  protected applyLayout() {
    super.applyLayout();
    this.content.apply({
      '#pictureButton': {left: 16, top: 8, right: 16},
      '#image': {top: '#pictureButton 16', left: 16, right: 16, bottom: 16}
    });
  }

};
