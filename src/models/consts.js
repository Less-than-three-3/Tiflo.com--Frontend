import { api } from "../api/api"

export const host = "http://localhost"

export const assetPath = api.isDeploy ? "/assets" : "/src/assets";
export const iconPath = `${assetPath}/icons`;
