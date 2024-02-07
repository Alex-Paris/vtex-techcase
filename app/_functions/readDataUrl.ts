import { IAttachmentProps } from '../_dtos/IAttachmentProps'

export async function readDataUrl(file: File) {
  const reader = new FileReader()
  reader.readAsArrayBuffer(file)
  await new Promise((resolve, reject) => {
    reader.onloadend = () => {
      resolve(true)
    }
    reader.onerror = (error) => {
      reject(error)
    }
  })
  if (!reader.result) {
    throw new Error('Not expected result')
  }
  const result = reader.result as ArrayBuffer
  return Buffer.from(result).toString('base64')
}

export async function readFileDataUrl(file: File) {
  const formattedFile: IAttachmentProps = {
    file_name: file.name,
    content_type: file.type,
    content_binary: await readDataUrl(file),
  }

  return formattedFile
}

export async function readFilesDataUrl(files: File[]) {
  const formattedDataUrl: IAttachmentProps[] = []

  for (let i = 0; i < files.length; i++) {
    formattedDataUrl.push(await readFileDataUrl(files[i]))
  }

  return formattedDataUrl
}
