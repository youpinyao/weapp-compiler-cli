module.exports = (str) => {
  return `--${str.replace(/[A-Z]/g, (m) => {
    return `-${m.toLowerCase()}`;
  })}`;
};
