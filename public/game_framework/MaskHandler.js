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

  _getImageData(img) {
    this._resizeHelperCanvas(img.height, img.width);
    this._helperCanvasCTX.drawImage(img, 0, 0);
    return this._helperCanvasCTX.getImageData(0, 0, img.width, img.height);
  }

  createMask(entity) {
    this._resizeHelperCanvas(entity.img.height, entity.img.width);
    if (entity.hasDynamicMask)
      entity.draw(this._helperCanvasCTX, 0, 0);
    else
      this._helperCanvasCTX.drawImage(entity.img, 0, 0);
    return this._helperCanvasCTX.getImageData(0, 0, entity.img.width, entity.img.height);
  }

  createStaticMasks(images) {
    for (const key of Object.keys(images)) {
      this._masksData['static'][images[key].src] = this._getImageData(images[key]);
    }
  }

  getMask(entity, forceStatic = false) {
    if ((entity.hasDynamicMask) && (!forceStatic))
      return this._masksData.dynamic[entity._entityID];
    return this._masksData.static[entity.img.src];
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
    this._masksData.dynamic[entity._entityID] = this._getImageData(entity.img);
  }

  deleteMask(entity) {
    delete this._masksData[entity._entityID];
  }
}
