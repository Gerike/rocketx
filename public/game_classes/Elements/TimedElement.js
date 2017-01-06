class TimedElement extends Element {
  constructor(x, y, expirationChecker){
    super(x, y);
    this.expirationChecker = expirationChecker;
  }

  isExpired(){
    return this.expirationChecker.expired();
  }
}
