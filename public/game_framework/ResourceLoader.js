class ResourceLoader {
  constructor() {
    this.resourceLocations = [];
    this.resources = {};
  }

  getFileName(path) {
    return path.split('/').pop().split('.')[0]
  }

  loadResources() {
    let loadingImagePromises = this.resourceLocations.map((resourceLocation) => {
      return new Promise((resolve, reject) => {
        let tempImg = new Image();
        tempImg.onload = () => {
          this.resources[this.getFileName(resourceLocation)] = tempImg;
          resolve("Image loaded");
        };
        tempImg.src = resourceLocation;
      });
    });

    return loadingImagePromises;
  }

  startLoad(resourceLocations) {
    this.resourceLocations = resourceLocations;
    return this.loadResources();
  }

  getResources(){
    return this.resources;
  }
}
