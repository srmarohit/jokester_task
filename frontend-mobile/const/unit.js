import { Dimensions } from "react-native";

export const { width, height } = Dimensions.get("screen");

const pt = 0.00235 * width;

export default pt;
