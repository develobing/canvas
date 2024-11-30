class Tween {
  play = (startVal, endVal, duration, callback) => {
    const startTime = new Date();
    const changeVal = endVal - startVal;

    this.ease(startVal, endVal, changeVal, startTime, duration, callback);
  };

  ease = (startVal, endVal, changeVal, startTime, duration, callback) => {
    const elapsed = new Date() - startTime;

    if (elapsed < duration) {
      const newVal = this.quadEaseOut(elapsed / duration, changeVal, startVal);
      callback?.(newVal);

      window.requestAnimationFrame(() => {
        this.ease(startVal, endVal, changeVal, startTime, duration, callback);
      });
    } else {
      callback?.(endVal);
    }
  };

  quadEaseOut = (normTime, changeVal, startVal) => {
    return changeVal * normTime * (2 - normTime) + startVal;
  };
}

export default Tween;
