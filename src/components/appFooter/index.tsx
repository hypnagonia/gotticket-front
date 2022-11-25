import React from 'react'
import { Box, Text } from "grommet"
import { Group, Medium, Twitter } from 'grommet-icons'
import styled, {CSSProperties} from 'styled-components';

import { TelegramIcon, DiscordIcon } from 'src/components/ui/icons'

const IconAhchor = styled.a`
  opacity: 0.9;
  transition: 0.17s ease all;

  &:hover {
    opacity: 1;
  }
`;

export function AppFooter(props: { style: CSSProperties }) {

  return (
    <Box background="background" justify="center" align="center" pad="medium" margin={{ top: 'medium' }} {...props}>
      <Box gap="xsmall">
        <Box direction="row" width="320px" justify="center" align="center" gap="medium">

        <Box direction="row" justify="center" align="center" gap="xsmall">
          <Text color="minorText" size="xsmall" margin={{ top: '3px' }}>©</Text>
          <Text color="minorText" size="xsmall">Gotticket {new Date().getFullYear()}</Text>
          <Text color="minorText" size="small" margin={{ bottom: '6px' }}>.</Text>

        </Box>
      </Box>
    </Box>
    </Box>
  )
}
