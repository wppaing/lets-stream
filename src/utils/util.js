const getImage = (imgArr, resolution) => {
  return Object.values(imgArr.filter((el) => Object.keys(el) == resolution)[0]);
};

const formatDuration = (time) => {
  return time
    ? Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    : "00:00";
};

const decodeLrc = (encodedString) => {
  return decodeURIComponent(escape(atob(encodedString)));
};

export { getImage, formatDuration, decodeLrc };
