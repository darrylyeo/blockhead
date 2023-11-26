export const parseUrl = (url: string) => {
    try {
        return new URL(url)
    }catch(e) {
        return null
    }
}
