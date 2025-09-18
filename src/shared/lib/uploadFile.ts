import { supabase } from '.';





export async function uploadFile(file: File) {
	const { data, error } = await supabase.storage
		.from('uploads')
		.upload(String(new Date().getDate()), file)

	if (error) {
		console.log(error)
		return { message: 'Произошла ошибка при публикации изображения' }
	}

	const { data: uploadedFile } = supabase.storage
		.from('uploads')
		.getPublicUrl(data.path)
console.log(uploadedFile)
	return uploadedFile
}