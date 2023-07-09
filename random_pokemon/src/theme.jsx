import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    fonts: {
        heading: `'Noto Sans', sans-serif`,
        body: `'Raleway Variable', sans-serif`,
    },
    colors: {
        pokemon: {
            "red": "#ee1515",
        },
    },
})

export default theme