
//CHANGE URL @ RELEASE
const BASEURL = "http://127.0.0.1:8000/api"

export const fetchFromApiJson = async(...params: string[]) => {
	const fetchURL = [BASEURL,...params].join("/")
	console.log(`fetching ${fetchURL}`)

	return fetch(fetchURL,{credentials: "include"})
	.then(async (res: Response) => {
		if(!res.ok)
			throw new Error(`HTTP err: ${res.status}`)

		return await res.json();
	});
}
