'use strict';

class MaskHandler {
  constructor() {
    if (MaskHandler.prototype._singletonInstance)
      return MaskHandler.prototype._singletonInstance;

    this._masksData = {'static': {}, 'dynamic': {}};
    this._helperCanvas = document.createElement('canvas');
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
    this._helperCanvas.getContext('2d').drawImage(image, 0, 0);
    return this._helperCanvas.getContext('2d').getImageData(0, 0, image.width, image.height);
  }

  createMask(entity) {
    this._resizeHelperCanvas(entity.getHeight(), entity.getWidth());
    if (entity.hasDynamicMask)
      entity.draw(this._helperCanvas.getContext('2d'), new Position(0, 0));
    else
      this._helperCanvas.getContext('2d').drawImage(entity.getImage(), 0, 0);
    return this._helperCanvas.getContext('2d').getImageData(0, 0, entity.getWidth(), entity.getHeight());
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
      if (entity.hasDynamicMask && entity.isCollidable())
        this._refreshDynamicMask(entity);
    }
  }

  _refreshDynamicMask(entity) {
    this._createDynamicMask(entity);
  }

  _createDynamicMask(entity) {
    this._masksData.dynamic[entity._entityID] = this.createMask(entity);
  }

  deleteMask(entity) {
    delete this._masksData[entity._entityID];
  }
}
