import PluginPage from './PluginPage';
import {Button, TextView} from 'tabris';
// import 'cordova-plugin-network-information/types'; // requires "EventListenerOrEventListenerObject"

declare var Connection: any;

const TITLE = 'Network';
const PLUGIN_ID = 'cordova-plugin-network-information';
const GET_NETWORK_STATE_BUTTON_TEXT = 'Get Network State';
const NETWORK_STATES = {
  [Connection.UNKNOWN]  : 'Unknown connection',
  [Connection.ETHERNET] : 'Ethernet connection',
  [Connection.WIFI]     : 'WiFi connection',
  [Connection.CELL_2G]  : 'Cell 2G connection',
  [Connection.CELL_3G]  : 'Cell 3G connection',
  [Connection.CELL_4G]  : 'Cell 4G connection',
  [Connection.CELL]     : 'Cell generic connection',
  [Connection.NONE]     : 'No network connection'
};

export default class NetworkPage extends PluginPage {

  constructor(properties) {
    super(Object.assign({pluginId: PLUGIN_ID, title: TITLE}, properties));
  }

  protected createUI() {
    super.createUI();
    this.content.append(
      new Button({id: 'getNetworkStateButton', text: GET_NETWORK_STATE_BUTTON_TEXT})
        .on('select', () => this._showNetworkState()),
      new TextView({id: 'networkStateDisplay'})
    );
  }

  private _showNetworkState() {
    let state = (navigator as any).connection.type;
    this.find('#networkStateDisplay').first(TextView).text = NETWORK_STATES[state];
  }

  protected applyLayout() {
    super.applyLayout();
    this.content.apply({
      '#getNetworkStateButton': {left: 16, top: 8, right: 16},
      '#networkStateDisplay': {top: 'prev() 16', left: 16, right: 16}
    });
  }
};
