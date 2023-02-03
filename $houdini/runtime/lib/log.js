function colorize(message) {
  const matches = [...message.matchAll(/\$HOUDINI\$(\w*\$)?/g)];
  if (matches.length === 0) {
    return [message];
  }
  let final = message.replaceAll(/\$HOUDINI\$(\w*\$)?/g, "%c");
  let colors = [];
  for (const match of matches) {
    const color = match[1] ? `color:${match[1].slice(0, -1)}` : "";
    colors.push(color);
  }
  return [final, ...colors];
}
function error(message) {
  console.error(...colorize(message));
}
function info(message) {
  console.log(...colorize(message));
}
function cyan(message) {
  return wrapMessage("cyan", message);
}
function red(message) {
  return wrapMessage("red", message);
}
function yellow(message) {
  return wrapMessage("yellow", message);
}
function green(message) {
  return wrapMessage("green", message);
}
const tag = `$HOUDINI$`;
const wrapMessage = (color, message) => {
  return tag + `${color}$` + message + tag;
};
export {
  cyan,
  error,
  green,
  info,
  red,
  yellow
};
