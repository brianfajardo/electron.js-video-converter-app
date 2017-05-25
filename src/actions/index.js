import { ipcRenderer } from 'electron'
import {
  ADD_VIDEO,
  ADD_VIDEOS,
  REMOVE_VIDEO,
  REMOVE_ALL_VIDEOS,
  VIDEO_PROGRESS,
  VIDEO_COMPLETE
} from './actionTypes'

export const addVideos = videos => dispatch => {
  ipcRenderer.send('videos:added', videos)
  ipcRenderer.on('videos:metadata', (e, videosArrayWithMetadata) => {
    dispatch({ type: ADD_VIDEOS, payload: videosArrayWithMetadata })
  })
}

export const convertVideos = videos => dispatch => {

  ipcRenderer.send('conversion:start', videos)

  ipcRenderer.on('conversion:progress', (e, { video, timemark }) => {
    dispatch({ type: VIDEO_PROGRESS, payload: { ...video, timemark } })
  })

  ipcRenderer.on('conversion:end', (e, { video, videoPath }) => {
    dispatch({ type: VIDEO_COMPLETE, payload: { ...video, videoPath } })
  })
}

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