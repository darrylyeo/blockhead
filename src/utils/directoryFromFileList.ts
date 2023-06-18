export type Folder = {
	folderName: string
	subfolders: Record<string, Folder>
	files: File[]
}

export const directoryFromFileList = (files: FileList) => {
	const root: Folder = { folderName: '.', subfolders: {}, files: [] }

	if(files[0]?.webkitRelativePath)
		for (const file of files) {
			let folder = root
			for (const folderName of file.webkitRelativePath.split('/').slice(0, -1))
				folder = (folder.subfolders[folderName] ??= { folderName, subfolders: {}, files: [] }) as Folder

			folder.files.push(file)
		}

	return root
}
