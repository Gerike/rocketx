class ResourceLoader {
  constructor() {
    this.resourceLocations = [];
    this._resources = {};
  }

  _getFileName(path) {
    return path.split('/').pop().split('.')[0];
  }

  _loadResources() {
    let loadingImagePromises = this.resourceLocations.map((resourceLocation) => {
      return new Promise((resolve, reject) => {
        let tempImg = new Image();
        tempImg.onload = () => {
          this._resources[this._getFileName(resourceLocation)] = tempImg;
          resolve("Image loaded");
        };
        tempImg.src = resourceLocation;
      });
    });

    return loadingImagePromises;
  }

  startLoad(resourceLocations) {
    this.resourceLocations = resourceLocations;
    return this._loadResources();
  }

  getResources(){
    return this._resources;
  }
}
