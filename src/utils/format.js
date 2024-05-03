export const determineFileType = (fileName) => {
  const extension = fileName.split('.').pop().toLowerCase();

  const videoExtensions = ['mp4', 'webm', 'ogg', 'mov', 'flv', 'avi', 'mkv'];
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'];

  if (videoExtensions.includes(extension)) {
    return 'video';
  } else if (imageExtensions.includes(extension)) {
    return 'image';
  } else {
    return 'none';
  }
}

export const convertNumberToTimestamp = (value) => {
  const date = new Date(value * 1000);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

export const convertNumberToTimestampWithMS = (value) => {
  const date = new Date(value * 1000);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  const miliseconds = date.getUTCMilliseconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}.${miliseconds}`;
}
