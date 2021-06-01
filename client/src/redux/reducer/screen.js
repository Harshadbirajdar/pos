import { SWITCH_SCREENMODE } from "../action/action.type";

const initalState = {
  isFullScreen: false,
};

const screen = (state = initalState, action) => {
  switch (action.type) {
    case SWITCH_SCREENMODE:
      if (!document.fullscreen) {
        document.body.requestFullscreen();
        return { isFullScreen: true };
      } else {
        document.exitFullscreen();

        return { isFullScreen: false };
      }

    default:
      return state;
  }
};

export default screen;
