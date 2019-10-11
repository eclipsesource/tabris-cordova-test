import PluginPage from './PluginPage';
import {Button, TextView} from 'tabris';

const TITLE = 'BarcodeScanner';
const PLUGIN_ID = 'phonegap-plugin-barcodescanner';
const SCAN_BARCODE_BUTTON_TEXT = 'Scan Barcode';

export default class BarcodeScannerPage extends PluginPage {

  constructor(properties) {
    super(Object.assign({pluginId: PLUGIN_ID, title: TITLE}, properties));
  }

  protected createUI() {
    super.createUI();
    this.content.append(
      new Button({id: 'scanBarcodeButton', text: SCAN_BARCODE_BUTTON_TEXT})
        .on('select', () => this._scanBarcode()),
      new TextView({id: 'resultDisplay', markupEnabled: true})
    );
  }

  private _scanBarcode() {
    let resultDisplay = this.find('#resultDisplay').only(TextView);
    let onSuccess = (result) => {
      resultDisplay.text = result.cancelled ?
        '<b>Scan cancelled</b>' :
        '<b>Scan result:</b> ' + result.text + ' (' + result.format + ')';
    };
    let onError = error => resultDisplay.text = '<b>Error:</b> ' + error;
    (cordova.plugins as any).barcodeScanner.scan(onSuccess, onError);
  }

  protected applyLayout() {
    super.applyLayout();
    this.content.apply({
      '#scanBarcodeButton': {left: 16, top: 8, right: 16},
      '#resultDisplay': {top: 'prev() 16', left: 16, right: 16}
    });
  }

}
