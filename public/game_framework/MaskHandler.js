'use strict';

class MaskHandler {
  constructor() {
    if (MaskHandler.prototype._singletonInstance)
      return MaskHandler.prototype._singletonInstance;

    this._masksData = {'static': {}, 'dynamic': {}};
    this._helperCanvas = document.createElement('canvas');
    this._helperCanvasCTX = this._helperCanvas.getContext('2d');
    MaskHandler.prototype._singletonInstance = this;
  }

  static getInstance() {
    return new MaskHandler();
  }

  _resizeHelperCanvas(height, width) {
    this._helperCanvas.height = height;
    this._helperCanvas.width = width;
  }

  _getImageData(image) {
    this._resizeHelperCanvas(image.height, image.width);
    this._helperCanvasCTX.drawImage(image, 0, 0);
    return this._helperCanvasCTX.getImageData(0, 0, image.width, image.height);
  }

  createMask(entity) {
    this._resizeHelperCanvas(entity.getImage().height, entity.getImage().width);
    if (entity.hasDynamicMask)
      entity.draw(this._helperCanvasCTX, new Position(0, 0));
    else
      this._helperCanvasCTX.drawImage(entity.getImage(), 0, 0);
    return this._helperCanvasCTX.getImageData(0, 0, entity.getImage().width, entity.getImage().height);
  }

  createStaticMasks(images) {
    for (const key of Object.keys(images)) {
      this._masksData['static'][images[key].src] = this._getImageData(images[key]);
    }
  }

  getMask(entity, forceStatic = false) {
    if ((entity.hasDynamicMask) && (!forceStatic))
      return this._masksData.dynamic[entity._entityID];
    return this._masksData.static[entity.getImage().src];
  }

  refreshDynamicMasks(entities) { //TODO: Maybe some event like approach? The entity alert if its mask change
    for (const entity of entities) {
      if (entity.hasDynamicMask)
        this._refreshDynamicMask(entity);
    }
  }

  _refreshDynamicMask(entity) {
    this._masksData.dynamic[entity._entityID] = this.createMask(entity);
  }

  _createDynamicMask(entity) {
    this._masksData.dynamic[entity._entityID] = this._getImageData(entity.getImage());
  }

  deleteMask(entity) {
    delete this._masksData[entity._entityID];
  }
}
