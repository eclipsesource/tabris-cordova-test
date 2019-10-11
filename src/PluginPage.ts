import {Composite, Page, TextView, WebView, NavigationView} from 'tabris';

export default class PluginPage extends Page {

  protected content: Composite;
  protected _pluginId: string;

  constructor(properties) {
    super(Object.assign({autoDispose: false}, properties));
    this.createUI();
    this.applyLayout();
    this.applyStyles();
  }

  protected createUI() {
    this.append(
      new TextView({id: 'pluginIdLabel', text: 'Plugin: ' + this.pluginId})
        .on('tap', () => this._openPluginInfoPage()),
      this.content = new Composite()
    );
  }

  protected _openPluginInfoPage() {
    $(NavigationView).only().append(
      new Page({title: 'Plugin Info'}).append(
        new WebView({
          left: 0, top: 0, right: 0, bottom: 0,
          url: 'https://www.npmjs.com/package/' + this.pluginId
        })
      )
    );
  }

  set pluginId(id) {
    this._pluginId = this._pluginId || id;
  }

  get pluginId() {
    return this._pluginId;
  }

  protected applyLayout() {
    this.find('#pluginIdLabel').first(TextView).set({left: 16, top: 16, right: 16});
    this.content.set({left: 0, top: 'prev() 8', right: 0, bottom: 0});
  }

  protected applyStyles() {
    this.find('#pluginIdLabel').first(TextView).textColor = 'rgb(22, 126, 251)';
  }

};
