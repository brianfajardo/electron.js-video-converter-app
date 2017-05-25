import { ipcRenderer } from 'electron'
import {
  ADD_VIDEO,
  ADD_VIDEOS,
  REMOVE_VIDEO,
  REMOVE_ALL_VIDEOS,
  VIDEO_PROGRESS,
  VIDEO_COMPLETE
} from './actionTypes'

// Communicate to MainWindow process that videos
// have been added and are pending conversion
export const addVideos = videos => dispatch => {
  ipcRenderer.send('videos:added', videos)
  ipcRenderer.on('videos:metadata', (e, videosArrayWithMetadata) => {
    dispatch({ type: ADD_VIDEOS, payload: videosArrayWithMetadata })
  })
}


// Communicate to MainWindow that the user wants
// to start converting videos.  Also listen for feedback
// from the MainWindow regarding the current state of
// conversion.
export const convertVideos = videos => dispatch => {
  ipcRenderer.send('conversion:start', videos)
}

// Open the folder that the
// newly created video exists in
export const showInFolder = outputPath => dispatch => {

}

export const addVideo = video => ({
  type: ADD_VIDEO,
  payload: { ...video }
})

export const setFormat = (video, format) => ({
  type: ADD_VIDEO,
  payload: { ...video, format, err: "" }
})

export const removeVideo = video => ({
  type: REMOVE_VIDEO,
  payload: video
})
export const removeAllVideos = () => ({
  type: REMOVE_ALL_VIDEOS
})