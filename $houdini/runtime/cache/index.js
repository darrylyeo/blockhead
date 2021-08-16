import config from "../../../houdini.config.js"
import { Cache } from './cache';
// @ts-ignore: config will be defined by the generator
export default new Cache(config || {});
