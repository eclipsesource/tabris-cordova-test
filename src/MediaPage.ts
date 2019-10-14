import PluginPage from './PluginPage';
import {Button, app, device} from 'tabris';
//import 'cordova-plugin-media/types'; // requires "MediaError"

const TITLE = 'Media';
const PLUGIN_ID = 'cordova-media';
const PLAY_BUTTON_TEXT = 'Play';

declare const Media: any;

export default class MediaPage extends PluginPage {

  //private _media: Media;
  private _media: any;

  constructor(properties) {
    super(Object.assign({pluginId: PLUGIN_ID, title: TITLE}, properties));
    this._media = this._createMedia();
    this.on('disappear', () => {
      this._media.stop();
      this._media.release();
    });
  }

  private _createMedia() {
    let path = app.getResourceLocation('resources/media.wav');
    // According to Media plugin documentation the media path must be
    // relative to the "www" folder under iOS
    if (device.platform === 'iOS' && (path.indexOf('/www/') !== -1)) {
      path = path.substr(path.indexOf('/www/') + 5);
    }
    let onSuccess = () => console.log('Audio file loaded successfully');
    let onError = err => console.log('Unable to play audio file: ' + err.code + ' - ' + err.message);
    return new Media(path, onSuccess, onError);
  }

  protected createUI() {
    super.createUI();
    this.content.append(
      new Button({id: 'playButton', text: PLAY_BUTTON_TEXT})
        .on('select', () => this._media.play())
    );
  }

  protected applyLayout() {
    super.applyLayout();
    this.content.apply({
      '#playButton': {left: 16, top: 8, right: 16}
    });
  }

};
