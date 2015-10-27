/*
Copyright 2015 by Grovo
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const getController = ({React, window, document, vjs, defaultVideoOptions,
  controllerFactories}) => {

  let reportingCallback;

  const setReportingCallback = ({callback}) => reportingCallback = callback;

  const receiveReport = ({eventName, eventData}) => {
    if (reportingCallback) {
      reportingCallback({eventName, eventData})
    }
  };

  const utilities = controllerFactories.getUtilities({React, document,
    defaultVideoOptions});

  const endlessModeController = controllerFactories.
    getEndlessModeController({utilities});

  const initializeController = controllerFactories.getInitializeController({
    reportingCallback:receiveReport,
    document,
    vjs,
    utilities,
    endlessModeController});

  const playerController = controllerFactories.getPlayerController();

  const resizingController = controllerFactories.getResizingController({window});

  const sourceController = controllerFactories.getSourceController();

  const makeInstanceCallback = utilities.makeInstanceCallback;

  const maybePlayNewSource = sourceController.maybePlayNewSource;

  const mountVideoPlayer = initializeController.mountVideoPlayer;

  const removeResizeEventListener = resizingController.removeResizeEventListener;

  const setEndlessModeListener = endlessModeController.setEndlessModeListener;

  const setResizeEventListener = resizingController.setResizeEventListener;

  const unmountVideoPlayer = initializeController.unmountVideoPlayer;

  const doCommand = playerController.doCommand;

  return {
    doCommand,
    makeInstanceCallback,
    maybePlayNewSource,
    mountVideoPlayer,
    removeResizeEventListener,
    setEndlessModeListener,
    setReportingCallback,
    setResizeEventListener,
    unmountVideoPlayer
  };
}

export default getController;
