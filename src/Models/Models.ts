import { GAME_MODES } from "../Constants/Constants";

export type GameMode = typeof GAME_MODES.PVP | typeof GAME_MODES.CPU;
