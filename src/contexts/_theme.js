import {
  extendTheme,
  withDefaultColorScheme,
  theme as baseTheme,
} from '@chakra-ui/react'

import { switchAnatomy } from '@chakra-ui/anatomy'

import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { getCookieFromBrowser } from '@/services/cookies';


const { definePartsStyle, defineMultiStyleConfig } =
createMultiStyleConfigHelpers(switchAnatomy.keys)


const baseStyle = definePartsStyle({
  thumb: {
    bg: 'purple.500',
    _checked: {
      bg: 'purple.900',
    },
  },
  track: {
    bg: 'gray.100',

  },
})

const token = getCookieFromBrowser("token");
const switchTheme = defineMultiStyleConfig({ baseStyle })



const config = {
  initialColorMode: 'darkS',
  // useSystemColorMode: true
}

export const theme = extendTheme({
  config,
  components: { 
    Progress: {
      baseStyle: {
        filledTrack: {
          bg: 'green.400'
        },
        track: {
          border: '1px solid',
          borderColor: 'gray.300'
        }
      },
    },
    Checkbox: {
      baseStyle: {
        control:{
          borderColor: '#4b4b4f',
          _checked: {
            borderColor: '#4b4b4f',
          }
        }
      }
    },
    Input: {
      baseStyle: {
        field: {
          bg: '#fff',
          borderColor: '#4b4b4f',
          border: '1px solid',
          ':focus': {
            borderColor: '#4b4b4f',
          }
        }
      },
      variants: {},
      defaultProps: {
        variant: null // null here
      }
    },
    Switch: switchTheme,
  },
  styles: {

    
    
    global: () => ({
        body: {
          //bg: !!token? '#000': '#ffff',
          bg: '#ffff',
          color: '#000',
          fontSize: {base: '12px', md: '14px'}
        },

    })
  },

})

