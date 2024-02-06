import axios from 'axios'

export async function instaSave(url: string | undefined) {
    try {
        const options = {
            method: 'GET',
            url: 'https://instagram-post-and-reels-downloader.p.rapidapi.com/insta/',
            params: {
                url,
            },
            headers: {
                'X-RapidAPI-Key':
                    '0ab5664dfcmsh247b262efe53fbfp1de9fajsnde808d414400',
                'X-RapidAPI-Host':
                    'instagram-post-and-reels-downloader.p.rapidapi.com',
            },
        }

        const response = await axios.request(options)

        return response.data.detail.data.items[0]
    } catch (error) {
        throw error
    }
}
