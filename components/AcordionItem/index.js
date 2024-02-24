
import{
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react';

export default function AccordionItemProps({title="", description=""}) {
return (

<AccordionItem
m={1.5}
borderRadius={'10px'}
border={'1px solid #f0f2f5'}>
  <h2>
    <AccordionButton>
      <Box as="text" fontWeight={'400'} p={2} flex='1' textAlign='left'>
      {title}
      </Box>
      <AccordionIcon />
    </AccordionButton>
  </h2>
  <AccordionPanel fontWeight={'500'} pb={4}>
  {description}
  </AccordionPanel>
</AccordionItem>

);
}
