import shell from 'shelljs';

export default async function saveOptimizedImg(fileName, path = 'products') {
  const w = shell.exec(`identify -format "%[fx:w]" ./static/uploads/${path}/${fileName}`);
  if (w.stdout >= 1920) {
    shell.exec(`convert ./static/uploads/${path}/${fileName} -resize 1920 ./static/uploads/${path}/${fileName}`);
  } else {
    shell.exec(`convert ./static/uploads/${path}/${fileName} -resize '${w.stdout}' ./static/uploads/${path}/${fileName}`);
  }
}
